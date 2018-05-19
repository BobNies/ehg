import React, { Component } from 'react'
import { Consumer } from '../MyContext'
import { firebaseApp } from '../firebase'
import { Grid, Row, Col, Button, FormControl, Alert, Checkbox, ProgressBar } from 'react-bootstrap'
import Img from 'react-image'
import PaypalExpressBtn from 'react-paypal-express-checkout'
import request from 'superagent'
import { RadioGroup, Radio } from 'react-radio-group'
import CustomNavBar from './CustomNavBar'
import Footer from './Footer'

class GalleryItemPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemKey: this.props.match.params.itemKey,
      artistName: this.props.match.params.artistName,
      imageSrc: '',
      item: null,
      total: 0,
      loading: true,
      editMode: false,
      editedName: '',
      editedDescription: '',
      editedImagePath: '',
      originImagePath: '',
      editedPrice: '',
      editedLength: '',
      editedWidth: '',
      editedHeight: '',
      editedWeight: '',
      editedPrintLength: '',
      editedPrintWidth: '',
      editedPrintHeight: '',
      editedPrintWeight: '',
      editedHasPrints: false,
      galleryImage: null,
      checkoutMode: false,
      rates: null,
      selectedRate: '',
      didPrepare: false,
      shipDetName: '',
      shipDetStreet1: '',
      shipDetCity: '',
      shipDetState: '',
      shipDetZipcode: '',
      shipDetError: '',
      printPrice: '',
      buyingPrint: false
    };

    this.shipNameInput = React.createRef();
    this.shipStreet1Input = React.createRef();
    this.shipCityInput = React.createRef();
    this.shipStateInput = React.createRef();
    this.shipZipcodeInput = React.createRef();
  }

  componentDidMount() {
    firebaseApp.database().ref('gallery/' + this.state.artistName + '/' + this.state.itemKey).once('value', snapshot => {
      if (snapshot.val() !== null) {
        this.setState({ item: snapshot.val() });
        this.setState({ total: parseFloat(snapshot.val().price) });

        const storageRef = firebaseApp.storage().ref('');
        storageRef.child(this.state.item.imagePath).getDownloadURL().then((url) => {
          this.setState({ imageSrc: url });
        })

        this.setState({ loading: false });

        // Admin edit mode - starting values
        this.setState({
          editedName: snapshot.val().name,
          editedDescription: snapshot.val().description,
          editedPrice: snapshot.val().price,
          editedLength: snapshot.val().length,
          editedWidth: snapshot.val().width,
          editedHeight: snapshot.val().height,
          editedWeight: snapshot.val().weight,
          editedPrintWidth: snapshot.val().printWidth,
          editedPrintHeight: snapshot.val().printHeight,
          editedPrintLength: snapshot.val().printLength,
          editedPrintWeight: snapshot.val().printWeight,
          editedHasPrints: snapshot.val().hasPrints,
          editedImagePath: snapshot.val().imagePath,
          originImagePath: snapshot.val().imagePath
        });
      } else {
        this.props.history.push('/404');
      }
    })

    firebaseApp.database().ref('settings').once('value', snapshot => {
      if (snapshot.val() !== null) {
        this.setState({ printPrice: snapshot.val().printPrice });
      }
    })
  }

  componentWillUpdate(nextProps, nextState) {
    // Update state to sync with router changes
    if (nextProps.match.params.itemKey !== this.state.itemKey) {
      this.setState({ itemKey: nextProps.match.params.itemKey });
    }

    if (nextProps.match.params.artistName !== this.state.artistName) {
      this.setState({ artistName: nextProps.match.params.artistName });
    }
  }

  onPurchaseBtn = () => {
    this.setState({ checkoutMode: true, buyingPrint: false, rates: null, didPrepare: false });
  }

  onBuyPrintBtn = () => {
    this.setState({ checkoutMode: true, buyingPrint: true, rates: null, didPrepare: false });
  }

  findShippingRates = () => {
    this.setState({ rates: null });

    if (this.state.buyingPrint) {
      this.findShippingRatesForPrint();
      return;
    }

    const { length, width, height, weight } = this.state.item;
    const { shipDetName, shipDetStreet1, shipDetCity, shipDetState, shipDetZipcode } = this.state;

    if (shipDetName === '' || shipDetStreet1 === '' || shipDetCity === '' ||
        shipDetState === '' || shipDetZipcode === '') {
      this.setState({ error: 'Please fill in all fields.' });
      this.setState({ didPrepare: false });
      return;
    } else {
      this.setState({ error: '' });
      this.setState({ didPrepare: true });
    }

    request
      .post('https://api.goshippo.com/shipments/')
      .set('Authorization', 'ShippoToken shippo_live_3c9fc3cee381c8f7b2ea08e279bdb98a411081e9')
      .set('Accept', 'application/json')
      .send({
        "address_to": {
            "name": shipDetName,
            "street1": shipDetStreet1,
            "city": shipDetCity,
            "state": shipDetState,
            "zip": shipDetZipcode,
            "country": "US",
            "phone": "4151234567",
            "email": "mrhippo@goshippo.com"
        },
        "address_from": {
            "name": "Patrica Hom",
            "street1": "11240 Manzanita Rd",
            "city": "Lakeside",
            "state": "CA",
            "zip": "92040",
            "country": "US",
            "phone": "8582456799",
            "email": "ehg11240@gmail.com"
        },
        "parcels": [{
            "length": length,
            "width": width,
            "height": height,
            "distance_unit": "in",
            "weight": weight,
            "mass_unit": "lb"
        }],
        "async": false
      })
      .end((err, res) => {
        if (err !== null) {
          this.setState({ error: 'There was an error, please ensure your information is correct.', didPrepare: false });
        }
        if (res !== null) {
          const parsedRes = JSON.parse(res.text).rates;
          if (parsedRes !== undefined && parsedRes !== null) {
            if (parsedRes[0] !== undefined) {
              this.setState({ rates: parsedRes });
              this.setState({ selectedRate: parsedRes[0].amount });
              this.setState({ total: parseFloat(this.state.item.price) + parseFloat(parsedRes[0].amount) });
              this.setState({ error: '' })
            } else {
              this.setState({ error: 'There was an error, please ensure your information is correct.', didPrepare: false })
            }
          } else {
            this.setState({ error: 'There was an error, please ensure your information is correct.', didPrepare: false })
          }
        } else {
          this.setState({ error: 'There was an error, please ensure your information is correct.', didPrepare: false })
        }
      });
  }

  findShippingRatesForPrint = () => {
    const { printLength, printWidth, printHeight, printWeight } = this.state.item;
    const { shipDetName, shipDetStreet1, shipDetCity, shipDetState, shipDetZipcode } = this.state;

    if (shipDetName === '' || shipDetStreet1 === '' || shipDetCity === '' ||
        shipDetState === '' || shipDetZipcode === '') {
      this.setState({ error: 'Please fill in all fields.' });
      this.setState({ didPrepare: false });
      return;
    } else {
      this.setState({ error: '' });
      this.setState({ didPrepare: true });
    }

    request
      .post('https://api.goshippo.com/shipments/')
      .set('Authorization', 'ShippoToken shippo_live_3c9fc3cee381c8f7b2ea08e279bdb98a411081e9')
      .set('Accept', 'application/json')
      .send({
        "address_to": {
            "name": shipDetName,
            "street1": shipDetStreet1,
            "city": shipDetCity,
            "state": shipDetState,
            "zip": shipDetZipcode,
            "country": "US",
            "phone": "4151234567",
            "email": "mrhippo@goshippo.com"
        },
        "address_from": {
            "name": "Patrica Hom",
            "street1": "11240 Manzanita Rd",
            "city": "Lakeside",
            "state": "CA",
            "zip": "92040",
            "country": "US",
            "phone": "8582456799",
            "email": "ehg11240@gmail.com"
        },
        "parcels": [{
            "length": printLength,
            "width": printWidth,
            "height": printHeight,
            "distance_unit": "in",
            "weight": printWeight,
            "mass_unit": "lb"
        }],
        "async": false
      })
      .end((err, res) => {
        if (err !== null) {
          this.setState({ error: 'There was an error, please ensure your information is correct.', didPrepare: false });
        }
        if (res !== null) {
          const parsedRes = JSON.parse(res.text).rates;
          if (parsedRes !== undefined && parsedRes !== null) {
            if (parsedRes[0] !== undefined) {
              this.setState({ rates: parsedRes });
              this.setState({ selectedRate: parsedRes[0].amount });
              this.setState({ total: parseFloat(this.state.printPrice) + parseFloat(parsedRes[0].amount) });
              this.setState({ error: '' })
            } else {
              this.setState({ error: 'There was an error, please ensure your information is correct.', didPrepare: false })
            }
          } else {
            this.setState({ error: 'There was an error, please ensure your information is correct.', didPrepare: false })
          }
        } else {
          this.setState({ error: 'There was an error, please ensure your information is correct.', didPrepare: false })
        }
      });
  }

  onPaypalSuccess = (payment, produceNotification) => {
    if (!this.state.buyingPrint) {
      let originItem = this.state.item;
      firebaseApp.database().ref('gallery/' + this.state.artistName + '/' + this.state.itemKey).set({
         name: originItem.name,
         artist: originItem.artist,
         description: originItem.description,
         sold: true,
         imagePath: originItem.imagePath,
         timestamp: originItem.timestamp,
         price: originItem.price,
         length: originItem.length,
         width: originItem.width,
         height: originItem.height,
         weight: originItem.weight
       });

       let soldItem = originItem;
       soldItem.sold = true;
       this.setState({ item: soldItem });

       request
         .post('/api/sendContactMail')
         .set('Accept', 'application/json')
         .query({ to: 'ehg11240@gmail.com' })
         .query({ from: 'ehg11240@gmail.com' })
         .query({ subject: 'You Sold a Painting!' })
         .query({ text: this.state.shipDetName + ' bought your ' + this.state.item.name + ' painting for $' + this.state.item.price + '!  Ship to: ' + this.state.shipDetName + ', ' + this.state.shipDetStreet1 + ', ' + this.state.shipDetCity + ', ' + this.state.shipDetState + ' ' + this.state.shipDetZipcode })
         .query({ html: '<h3>' + this.state.shipDetName + ' bought your ' + this.state.item.name + ' painting for $' + this.state.item.price + '!</h3> <hr/> <h4>Ship to:</h4> <hr/> <p>' + this.state.shipDetName + ', ' + this.state.shipDetStreet1 + ', ' + this.state.shipDetCity + ', ' + this.state.shipDetState + ' ' + this.state.shipDetZipcode + '</p>' })
         .send({
           "message": "The message"
         })
         .end((err, res) => {

         });
    } else {
      request
        .post('/api/sendContactMail')
        .set('Accept', 'application/json')
        .query({ to: 'ehg11240@gmail.com' })
        .query({ from: 'ehg11240@gmail.com' })
        .query({ subject: 'You Sold a Print!' })
        .query({ text: this.state.shipDetName + ' bought your ' + this.state.item.name + ' print for $' + this.state.item.price + '!  Ship to: ' + this.state.shipDetName + ', ' + this.state.shipDetStreet1 + ', ' + this.state.shipDetCity + ', ' + this.state.shipDetState + ' ' + this.state.shipDetZipcode })
        .query({ html: '<h3>' + this.state.shipDetName + ' bought your ' + this.state.item.name + ' print for $' + this.state.item.price + '!</h3> <hr/> <h4>Ship to:</h4> <hr/> <p>' + this.state.shipDetName + ', ' + this.state.shipDetStreet1 + ', ' + this.state.shipDetCity + ', ' + this.state.shipDetState + ' ' + this.state.shipDetZipcode + '</p>' })
        .send({
          "message": "The message"
        })
        .end((err, res) => {

        });
    }

    this.setState({ checkoutMode: false });
    produceNotification('Payment Completed', 'Thank you!', 'success');
  }

  onPaypalCancel = (data, produceNotification) => {
    produceNotification('Payment cancelled', '', 'info');
    console.log("The payment was cancelled.");
  }

  onPaypalError = (err, produceNotification) => {
    produceNotification('Payment Failed', err, 'error');
    console.log("Error with Paypal:", err);
  }

  updateSelectedRate = (val) => {
    this.setState({ selectedRate: val })
    if (this.state.buyingPrint) {
      this.setState({ total: parseFloat(this.state.printPrice) + parseFloat(val) });
    } else {
      this.setState({ total: parseFloat(this.state.item.price) + parseFloat(val) });
    }
  }

  updateGalleryImage(newImage) {
    this.setState({ galleryImage: newImage });
  }

  deleteItem = (produceNotification) => {
    firebaseApp.database().ref('gallery/' + this.state.artistName + '/' + this.state.itemKey).remove();

    produceNotification('Gallery Item Deleted', 'Successfully', 'success');
  }

  applyUpdate = (produceNotification) => {
    // Upload Image (if edited)
    if (this.state.galleryImage !== null && this.state.galleryImage !== '') {
      let file = this.state.galleryImage;
      const imageRef = firebaseApp.storage().ref('gallery/' + this.state.artistName + '/' + file.name);
      let task = imageRef.put(file);
      let imagePath = imageRef.fullPath;
      this.setState({ isUploading: true });
      task.on('state_changed',
        (snapshot) => {
          let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.setState({ uploadProgress: percentage });
        },

        (err) => {
          this.setState({ uploadError: err });
        },

        () => {
          this.setState({ isUploading: false });

          firebaseApp.storage().ref(this.state.originImagePath).delete();

          // Finish actual update
          this.finishUpdate(produceNotification, imagePath);
        }
      );
    } else {
      this.finishUpdate(produceNotification, this.state.originImagePath);
    }
  }

  finishUpdate = (produceNotification, imagePath) => {
    firebaseApp.database().ref('gallery/' + this.state.artistName + '/' + this.state.itemKey)
      .set({
        name: this.state.editedName,
        description: this.state.editedDescription,
        price: this.state.editedPrice,
        sold: this.state.item.sold,
        artist: this.state.item.artist,
        imagePath: imagePath,
        timestamp: this.state.item.timestamp,
        length: this.state.editedLength,
        width: this.state.editedWidth,
        height: this.state.editedHeight,
        weight: this.state.editedWeight,
        hasPrints: this.state.editedHasPrints,
        printWidth: this.state.editedPrintWidth,
        printHeight: this.state.editedPrintHeight,
        printLength: this.state.editedPrintLength,
        printWeight: this.state.editedPrintWeight
      });

      produceNotification('Update Applied', 'Successfully', 'success');
  }

  render () {
    return (
      <Consumer>
        {value => {
          const { user, produceNotification } = value;
          const client = {
            sandbox:    'AQkVkiEnuwFClFBi8aP3jhM5UFnn89rimY1KGQ8RznojBLQJVN61CGz2YV8PVt07wZCV73x1z8_EZxCS',
            production: 'Aa7lK2DxyUeSaMlHQYEci59n-FXoodfMLGlyOlxOUQDinqmbAUv9hNP75Flj4iTacT3semOHS9FT5N3P',
          };
          let env = 'production';
          let currency = 'USD';
          return (
            <div>
              <CustomNavBar />
              <Grid>
                { this.state.loading ? (
                  <div className='loading'>
                    <h1 className='noselect'>LOADING, PLEASE WAIT...</h1>
                  </div>
                ) : (
                  <div>
                    <Row className='gallery-page-main'>
                      <Col xs={12} md={8}>
                        <Img src={this.state.imageSrc} />
                      </Col>
                      <Col xs={12} md={4}>
                        <h3>{this.state.item.name}</h3>
                        { this.state.artistName === 'michael-roser' ? (
                          <h4>by Michael Roser</h4>
                        ) : (
                          <h4>by Fred Briscoe</h4>
                        )}
                        { this.state.item.sold === false &&
                          <Row className='gallery-page-row-1'>
                            <Col xs={12} md={6}>
                              <h1 className='gallery-page-price noselect'>${this.state.item.price}</h1>
                            </Col>
                            <Col xs={12} md={6}>
                              <Button
                                bsStyle='default'
                                onClick={() => this.onPurchaseBtn()}
                                >
                                PURCHASE
                              </Button>
                            </Col>
                          </Row>
                        }
                        { this.state.item.hasPrints && this.state.printPrice !== '' &&
                          <Row className='gallery-page-row-1'>
                            <Col xs={12} md={6}>
                              <h1 className='gallery-page-price-print noselect'>${this.state.printPrice}</h1>
                            </Col>
                            <Col xs={12} md={6}>
                              <Button
                                bsStyle='default'
                                onClick={() => this.onBuyPrintBtn()}
                                >
                                BUY PRINT
                              </Button>
                            </Col>
                          </Row>
                        }
                        { this.state.checkoutMode &&
                          <Row className='gallery-page-row-checkout-prepare'>
                            { this.state.error && this.state.error !== '' &&
                              <Alert bsStyle='danger'>
                                <p>{this.state.error}</p>
                              </Alert>
                            }
                            <Row>
                              <Col xs={12} md={4}>
                                <h3>Name</h3>
                              </Col>
                              <Col xs={12} md={8}>
                                <FormControl
                                  ref={this.shipNameInput}
                                  type='text'
                                  placeholder='Name'
                                  onChange={event => this.setState({ shipDetName: event.target.value })}
                                  />
                              </Col>
                            </Row>
                            <Row>
                              <Col xs={12} md={4}>
                                <h3>Address</h3>
                              </Col>
                              <Col xs={12} md={8}>
                                <FormControl
                                  ref={this.shipStreet1Input}
                                  type='text'
                                  placeholder='Address'
                                  onChange={event => this.setState({ shipDetStreet1: event.target.value })}
                                  />
                              </Col>
                            </Row>
                            <Row>
                              <Col xs={12} md={4}>
                                <h3>City</h3>
                              </Col>
                              <Col xs={12} md={8}>
                                <FormControl
                                  ref={this.shipCityInput}
                                  type='text'
                                  placeholder='City'
                                  onChange={event => this.setState({ shipDetCity: event.target.value })}
                                  />
                              </Col>
                            </Row>
                            <Row>
                              <Col xs={12} md={4}>
                                <h3>State</h3>
                              </Col>
                              <Col xs={12} md={3}>
                                <FormControl
                                  ref={this.shipStateInput}
                                  type='text'
                                  placeholder='State'
                                  onChange={event => this.setState({ shipDetState: event.target.value })}
                                  />
                              </Col>
                            </Row>
                            <Row>
                              <Col xs={12} md={4}>
                                <h3>Zipcode</h3>
                              </Col>
                              <Col xs={12} md={8}>
                                <FormControl
                                  ref={this.shipZipcodeInput}
                                  type='text'
                                  placeholder='Zipcode'
                                  onChange={event => this.setState({ shipDetZipcode: event.target.value })}
                                  />
                              </Col>
                            </Row>
                            <Row>
                              <Col xs={12} md={12}>
                                <Button
                                  bsStyle='default'
                                  onClick={() => this.findShippingRates()}
                                  >
                                  CONTINUE
                                </Button>
                              </Col>
                            </Row>
                          </Row>
                        }
                        { !this.state.buyingPrint && this.state.didPrepare && this.state.checkoutMode && this.state.selectedRate !== null &&
                          <Row className='gallery-page-row-checkout-final'>
                            <RadioGroup name='SHIPPING OPTIONS' selectedValue={this.state.selectedRate} onChange={(val) => this.updateSelectedRate(val)}>
                              { this.state.rates !== null && this.state.rates !== '' ? (
                                this.state.rates.map((rate, index) => {
                                  if (this.state.buyingPrint) {
                                    return (
                                      <div key={index} className='shipping-rate-option'>
                                        <Radio value={rate.amount}/>
                                        <p className='noselect'>{rate.servicelevel.name} (${rate.amount} {rate.currency}) - {rate.provider}</p>
                                      </div>
                                    )
                                  } else {
                                    if (rate.provider === 'FedEx') {
                                      return (
                                        <div key={index} className='shipping-rate-option'>
                                          <Radio value={rate.amount}/>
                                          <p className='noselect'>{rate.servicelevel.name} (${rate.amount} {rate.currency}) - {rate.provider}</p>
                                        </div>
                                      )
                                    } else {
                                      return <div key={index}></div>;
                                    }
                                  }
                                })
                              ) : (
                                <p>LOADING SHIPPING RATES...</p>
                              )}
                            </RadioGroup>
                            <div>
                              <hr />
                              <div className='paypal-btn'>
                                <PaypalExpressBtn
                                  env={env}
                                  client={client}
                                  currency={currency}
                                  total={this.state.total}
                                  onError={(err) => this.onPaypalError(err, produceNotification)}
                                  onSuccess={(payment) => this.onPaypalSuccess(payment, produceNotification)}
                                  onCancel={(data) => this.onPaypalCancel(data, produceNotification)}
                                  />
                              </div>
                            </div>
                          </Row>
                        }
                        { this.state.buyingPrint && this.state.didPrepare && this.state.checkoutMode && this.state.selectedRate !== null &&
                          <Row className='gallery-page-row-checkout-final'>
                            <RadioGroup name='SHIPPING OPTIONS' selectedValue={this.state.selectedRate} onChange={(val) => this.updateSelectedRate(val)}>
                              { this.state.rates !== null && this.state.rates !== '' ? (
                                this.state.rates.map((rate, index) => {
                                  if (rate.provider === 'FedEx') {
                                    return (
                                      <div key={index} className='shipping-rate-option'>
                                        <Radio value={rate.amount}/>
                                        <p className='noselect'>{rate.servicelevel.name} (${rate.amount} {rate.currency}) - {rate.provider}</p>
                                      </div>
                                    )
                                  } else {
                                    return <div key={index}></div>;
                                  }
                                })
                              ) : (
                                <p>LOADING SHIPPING RATES...</p>
                              )}
                            </RadioGroup>
                            <div>
                              <hr />
                              <div className='paypal-btn'>
                                <PaypalExpressBtn
                                  env={env}
                                  client={client}
                                  currency={currency}
                                  total={this.state.total}
                                  onError={(err) => this.onPaypalError(err, produceNotification)}
                                  onSuccess={(payment) => this.onPaypalSuccess(payment, produceNotification)}
                                  onCancel={(data) => this.onPaypalCancel(data, produceNotification)}
                                  />
                              </div>
                            </div>
                          </Row>
                        }
                        <Row className='gallery-page-row-3'>
                          <p>{this.state.item.description}</p>
                          { this.state.item.width !== null && this.state.item.width !== '' &&
                            <p className='gallery-item-dim'>Artwork dimensions: {this.state.item.width} x {this.state.item.height} in</p>
                          }
                          { this.state.item.hasPrints && this.state.item.printWidth !== null && this.state.item.printWidth !== '' &&
                            <p className='gallery-item-dim'>Print dimensions: {this.state.item.printWidth} x {this.state.item.printHeight} in</p>
                          }
                        </Row>
                      </Col>
                    </Row>
                    { user !== null &&
                      <div className='gallery-page-edit'>
                        <Row>
                          <Col xs={6} md={6} mdOffset={3}>
                            <h1>ADMIN EDIT</h1>
                            <h2>(Leave fields empty to skip them)</h2>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={6} md={2} mdOffset={3}>
                            <h3>Name</h3>
                          </Col>
                          <Col xs={6} md={4}>
                            <FormControl
                              type='text'
                              placeholder='Name'
                              onChange={event => this.setState({ editedName: event.target.value })}
                              />
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={6} md={2} mdOffset={3}>
                            <h3>Description</h3>
                          </Col>
                          <Col xs={6} md={4}>
                            <FormControl
                              type='text'
                              placeholder='Description'
                              onChange={event => this.setState({ editedDescription: event.target.value })}
                              />
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={6} md={2} mdOffset={3}>
                            <h3>Price</h3>
                          </Col>
                          <Col xs={6} md={4}>
                            <FormControl
                              type='text'
                              placeholder='Price'
                              onChange={event => this.setState({ editedPrice: event.target.value })}
                              />
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={6} md={2} mdOffset={3}>
                            <h3>Size (in)</h3>
                          </Col>
                          <Col xs={2} md={1}>
                            <FormControl
                              type='text'
                              placeholder='Width'
                              onChange={event => this.setState({ editedWidth: event.target.value })}
                              />
                          </Col>
                          <Col xs={2} md={1}>
                            <FormControl
                              type='text'
                              placeholder='Height'
                              onChange={event => this.setState({ editedHeight: event.target.value })}
                              />
                          </Col>
                          <Col xs={2} md={1}>
                            <FormControl
                              type='text'
                              placeholder='Depth'
                              onChange={event => this.setState({ editedLength: event.target.value })}
                              />
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={6} md={2} mdOffset={3}>
                            <h3>Weight (lb)</h3>
                          </Col>
                          <Col xs={6} md={4}>
                            <FormControl
                              type='text'
                              placeholder='Weight'
                              onChange={event => this.setState({ editedWeight: event.target.value })}
                              />
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={6} md={2} mdOffset={3}>
                            <h3>Image</h3>
                          </Col>
                          <Col xs={6} md={4}>
                            <input type='file' onChange={event => this.updateGalleryImage(event.target.files[0])} />
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={6} md={2} mdOffset={3}>
                            <h3>Has Prints</h3>
                          </Col>
                          <Col xs={2} md={1}>
                            <Checkbox checked={this.state.editedHasPrints} onChange={() => this.setState({ editedHasPrints: !this.state.editedHasPrints })}/>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={6} md={2} mdOffset={3}>
                            <h3>Print Size (in)</h3>
                          </Col>
                          <Col xs={2} md={1}>
                            <FormControl
                              type='text'
                              placeholder='Width'
                              onChange={event => this.setState({ editedPrintWidth: event.target.value })}
                              />
                          </Col>
                          <Col xs={2} md={1}>
                            <FormControl
                              type='text'
                              placeholder='Height'
                              onChange={event => this.setState({ editedPrintHeight: event.target.value })}
                              />
                          </Col>
                          <Col xs={2} md={1}>
                            <FormControl
                              type='text'
                              placeholder='Depth'
                              onChange={event => this.setState({ editedPrintLength: event.target.value })}
                              />
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={6} md={2} mdOffset={3}>
                            <h3>Print Weight (lb)</h3>
                          </Col>
                          <Col xs={6} md={4}>
                            <FormControl
                              type='text'
                              placeholder='Weight'
                              onChange={event => this.setState({ editedPrintWeight: event.target.value })}
                              />
                          </Col>
                        </Row>
                        { this.state.isUploading &&
                          <Row>
                            <Col xs={6} md={4} mdOffset={3}>
                              <ProgressBar active now={this.state.uploadProgress} />
                            </Col>
                          </Row>
                        }
                        <Row className='gallery-page-edit-final'>
                          <Col xs={4} md={2} mdOffset={3}>
                            <Button
                              bsStyle='danger'
                              onClick={() => this.deleteItem(produceNotification)}
                              >
                              Delete
                            </Button>
                          </Col>
                          <Col xs={8} md={4}>
                            <Button
                              bsStyle='warning'
                              onClick={() => this.applyUpdate(produceNotification)}
                              >
                              Apply Update
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    }
                  </div>
                )}
              </Grid>
              <Footer />
            </div>
          )
        }}
      </Consumer>
    )
  }
}

export default GalleryItemPage;
