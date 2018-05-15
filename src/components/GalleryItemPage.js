import React, { Component } from 'react'
import { Consumer } from '../MyContext'
import { firebaseApp } from '../firebase'
import { Grid, Row, Col, Button, FormControl } from 'react-bootstrap'
import CustomNavBar from './CustomNavBar'
import Footer from './Footer'
import Img from 'react-image'
import PaypalExpressBtn from 'react-paypal-express-checkout'
import request from 'superagent'
import { RadioGroup, Radio } from 'react-radio-group'

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
      editedPrice: '',
      editedLength: '',
      editedWidth: '',
      editedHeight: '',
      editedWeight: '',
      checkoutMode: false,
      rates: null,
      selectedRate: '',
      zipcode: '',
      didPrepare: false
    };
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
          editedWeight: snapshot.val().weight
        });
      } else {
        this.props.history.push('/404');
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

  findShippingRates = () => {
    this.setState({ didPrepare: true });

    const { length, width, height, weight } = this.state.item;

    request
      .post('https://api.goshippo.com/shipments/')
      .set('Authorization', 'ShippoToken shippo_live_3c9fc3cee381c8f7b2ea08e279bdb98a411081e9')
      .set('Accept', 'application/json')
      .send({
        "address_to": {
            "name": "Mr Hippo",
            "street1": "965 Mission St #572",
            "city": "San Francisco",
            "state": "CA",
            "zip": "94103",
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
        console.log('Heres the parsed text result', JSON.parse(res.text));
        const parsedRes = JSON.parse(res.text).rates;
        this.setState({ rates: parsedRes });
        this.setState({ selectedRate: parsedRes[0].amount });
        this.setState({ total: parseFloat(this.state.item.price) + parseFloat(parsedRes[0].amount) });
      });
  }

  onPaypalSuccess = (payment, produceNotification) => {
    let originItem = this.state.item;
    firebaseApp.database().ref('gallery/' + this.state.artistName + '/' + this.state.itemKey).set({
       name: originItem.name,
       artist: originItem.artist,
       description: originItem.description,
       sold: true,
       imagePath: originItem.imagePath,
       timestamp: originItem.timestamp,
       price: originItem.price
     });

     let soldItem = originItem;
     soldItem.sold = true;
     this.setState({ item: soldItem, checkoutMode: false });
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
    this.setState({ total: parseFloat(this.state.item.price) + parseFloat(val) });
  }

  deleteItem = (produceNotification) => {
    firebaseApp.database().ref('gallery/' + this.state.artistName + '/' + this.state.itemKey).remove();

    produceNotification('Gallery Item Deleted', 'Successfully', 'success');
  }

  applyUpdate = (produceNotification) => {
    firebaseApp.database().ref('gallery/' + this.state.artistName + '/' + this.state.itemKey)
      .set({
        name: this.state.editedName,
        description: this.state.editedDescription,
        price: this.state.editedPrice,
        sold: this.state.item.sold,
        artist: this.state.item.artist,
        imagePath: this.state.item.imagePath,
        timestamp: this.state.item.timestamp,
        length: this.state.editedLength,
        width: this.state.editedWidth,
        height: this.state.editedHeight,
        weight: this.state.editedWeight
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
          let env = 'sandbox';
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
                                onClick={() => this.setState({ checkoutMode: true })}
                                >
                                PURCHASE
                              </Button>
                            </Col>
                          </Row>
                        }
                        { this.state.checkoutMode &&
                          <Row className='gallery-page-row-checkout-prepare'>
                            <Col xs={12} md={6}>
                              <FormControl
                                type='text'
                                placeholder='Zipcode'
                                onChange={event => this.setState({ zipcode: event.target.value })}
                                />
                            </Col>
                            <Col xs={12} md={6}>
                              <Button
                                bsStyle='default'
                                onClick={() => this.findShippingRates()}
                                >
                                NEXT
                              </Button>
                            </Col>
                          </Row>
                        }
                        { this.state.didPrepare && this.state.checkoutMode && this.state.selectedRate !== null &&
                          <Row className='gallery-page-row-checkout-final'>
                            <RadioGroup name='SHIPPING OPTIONS' selectedValue={this.state.selectedRate} onChange={(val) => this.updateSelectedRate(val)}>
                              { this.state.rates !== null ? (
                                this.state.rates.map((rate, index) => {
                                  if (rate.provider === 'FedEx') {
                                    return (
                                      <div key={index} className='shipping-rate-option'>
                                        <Radio value={rate.amount}/>
                                        <p className='noselect'>{rate.servicelevel.name} (${rate.amount} {rate.currency}) - {rate.provider}</p>
                                      </div>
                                    )
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
                              placeholder='Length'
                              onChange={event => this.setState({ editedLength: event.target.value })}
                              />
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
                        </Row>
                        <Row>
                          <Col xs={6} md={2} mdOffset={3}>
                            <h3>Weight</h3>
                          </Col>
                          <Col xs={6} md={4}>
                            <FormControl
                              type='text'
                              placeholder='Weight'
                              onChange={event => this.setState({ editedWeight: event.target.value })}
                              />
                          </Col>
                        </Row>
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
