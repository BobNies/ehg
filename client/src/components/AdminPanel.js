import React, { Component } from 'react'
import { Consumer } from '../MyContext'
import { firebaseApp } from '../firebase'
import { Redirect } from 'react-router-dom'
import { Grid, Row, Col, Button, FormControl, DropdownButton, MenuItem, ProgressBar, InputGroup, Checkbox } from 'react-bootstrap'
import CustomNavBar from './CustomNavBar'
import Footer from './Footer'

class AdminPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputInstaPost: '',
      inputPrintPrice: '',
      inputGalleryItem: {
        name: '',
        artist: 'Select Artist...',
        description: '',
        sold: false,
        price: '',
        length: '',
        width: '',
        height: '',
        weight: '',
        hasPrints: false,
        printWidth: '',
        printHeight: '',
        printLength: '',
        printWeight: ''
      },
      inputShow: {
        imagePath: '',
        description: '',
        name: ''
      },
      inputTestimonial: {
        artist: 'Select Artist...',
        quote: '',
        author: '',
        authorDetails: ''
      },
      igiImage: null,
      showImage: null,
      isUploadingGalleryItem: false,
      isUploadingShow: false,
      uploadProgress: 0,
      uploadError: null
    }

    this.instagramPostControl = React.createRef();
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  updateGalleryItemName(newName) {
    let igi = this.state.inputGalleryItem;
    igi.name = newName;
    this.setState({ inputGalleryItem: igi });
  }

  updateGalleryItemDescription(newDesc) {
    let igi = this.state.inputGalleryItem;
    igi.description = newDesc;
    this.setState({ inputGalleryItem: igi });
  }

  updateGalleryItemSold(newSold) {
    let igi = this.state.inputGalleryItem;
    igi.sold = newSold;
    this.setState({ inputGalleryItem: igi });
  }

  updateGalleryItemPrice(newPrice) {
    let igi = this.state.inputGalleryItem;
    igi.price = newPrice;
    this.setState({ inputGalleryItem: igi });
  }

  updateGalleryItemLength(newSize) {
    let igi = this.state.inputGalleryItem;
    igi.length = newSize;
    this.setState({ inputGalleryItem: igi });
  }

  updateGalleryItemWidth(newSize) {
    let igi = this.state.inputGalleryItem;
    igi.width = newSize;
    this.setState({ inputGalleryItem: igi });
  }

  updateGalleryItemHeight(newSize) {
    let igi = this.state.inputGalleryItem;
    igi.height = newSize;
    this.setState({ inputGalleryItem: igi });
  }

  updateGalleryItemWeight(newWeight) {
    let igi = this.state.inputGalleryItem;
    igi.weight = newWeight;
    this.setState({ inputGalleryItem: igi });
  }

  updateGalleryItemImage(newImage) {
    this.setState({ igiImage: newImage });
  }

  updateGalleryItemHasPrints(newHasPrints) {
    let igi = this.state.inputGalleryItem;
    igi.hasPrints = newHasPrints;
    this.setState({ inputGalleryItem: igi });
  }

  updateGalleryItemPrintWidth(newPrintSize) {
    let igi = this.state.inputGalleryItem;
    igi.printWidth = newPrintSize;
    this.setState({ inputGalleryItem: igi });
  }

  updateGalleryItemPrintHeight(newPrintSize) {
    let igi = this.state.inputGalleryItem;
    igi.printHeight = newPrintSize;
    this.setState({ inputGalleryItem: igi });
  }

  updateGalleryItemPrintLength(newPrintSize) {
    let igi = this.state.inputGalleryItem;
    igi.printLength = newPrintSize;
    this.setState({ inputGalleryItem: igi });
  }

  updateGalleryItemPrintWeight(newPrintWeight) {
    let igi = this.state.inputGalleryItem;
    igi.printWeight = newPrintWeight;
    this.setState({ inputGalleryItem: igi });
  }

  updateShowImage(newImage) {
    this.setState({ showImage: newImage });
  }

  updateShowName(newName) {
    let show = this.state.inputShow;
    show.name = newName;
    this.setState({ inputShow: show });
  }

  updateShowDescription(newDesc) {
    let show = this.state.inputShow;
    show.description = newDesc;
    this.setState({ inputShow: show });
  }

  updateTestimonialQuote(newQuote) {
    let testimonial = this.state.inputTestimonial;
    testimonial.quote = newQuote;
    this.setState({ inputTestimonial: testimonial });
  }

  updateTestimonialAuthor(newAuthor) {
    let testimonial = this.state.inputTestimonial;
    testimonial.author = newAuthor;
    this.setState({ inputTestimonial: testimonial });
  }

  artistSelect(eventKey) {
    if (eventKey === 1) {
      let igi = this.state.inputGalleryItem;
      igi.artist = 'michael-roser';
      this.setState({ inputGalleryItem: igi });
    }
    if (eventKey === 2) {
      let igi = this.state.inputGalleryItem;
      igi.artist = 'fred-briscoe';
      this.setState({ inputGalleryItem: igi });
    }
  }

  updateTestimonialAuthorDetails(newAuthorDet) {
    let testimonial = this.state.inputTestimonial;
    testimonial.authorDetails = newAuthorDet;
    this.setState({ inputTestimonial: testimonial });
  }

  artistTestimonialSelect(eventKey) {
    if (eventKey === 1) {
      let testimonial = this.state.inputTestimonial;
      testimonial.artist = 'michael-roser';
      this.setState({ inputTestimonial: testimonial });
    }
    if (eventKey === 2) {
      let testimonial = this.state.inputTestimonial;
      testimonial.artist = 'fred-briscoe';
      this.setState({ inputTestimonial: testimonial });
    }
  }

  applySettings(produceNotification, setIntagramPost, setPrintPrice) {
    // Update instagram post
    if (this.state.inputInstaPost !== null && this.state.inputInstaPost !== '') {
      setIntagramPost(this.state.inputInstaPost);
    }

    // Update print Price
    if (this.state.inputPrintPrice !== null && this.state.inputPrintPrice !== '') {
      setPrintPrice(this.state.inputPrintPrice);
    }

    // Produce notification
    produceNotification('Update Successful', 'Yay!', 'success');
  }

  addGalleryItem(produceNotification) {
    const {
      name,
      artist,
      description,
      sold,
      price,
      length,
      width,
      height,
      weight,
      hasPrints,
      printWidth,
      printHeight,
      printLength,
      printWeight
    } = this.state.inputGalleryItem;

    // File image upload
    let file = this.state.igiImage;
    const imageRef = firebaseApp.storage().ref('gallery/' + artist + '/' + file.name);
    let task = imageRef.put(file);
    let imagePath = imageRef.fullPath;
    this.setState({ isUploadingGalleryItem: true });
    task.on('state_changed',
      (snapshot) => {
        let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        this.setState({ uploadProgress: percentage });
      },

      (err) => {
        this.setState({ uploadError: err });
      },

      () => {
        this.setState({ isUploadingGalleryItem: false });
        let d = new Date();
        let timestamp = d.getTime();

        firebaseApp.database().ref('gallery/' + artist).push({
          name,
          artist,
          description,
          sold,
          imagePath,
          timestamp,
          price,
          length,
          width,
          height,
          weight,
          hasPrints,
          printWidth,
          printHeight,
          printLength,
          printWeight
        });

        produceNotification('Gallery Item Added', 'Successfully', 'success');
      }
    );
  }

  addShow(produceNotification) {
    const {
      description,
      name
    } = this.state.inputShow;

    // File image upload
    let file = this.state.showImage;
    const imageRef = firebaseApp.storage().ref('shows/' + file.name);
    let task = imageRef.put(file);
    let imagePath = imageRef.fullPath;
    this.setState({ isUploadingShow: true });
    task.on('state_changed',
      (snapshot) => {
        let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        this.setState({ uploadProgress: percentage });
      },

      (err) => {
        this.setState({ uploadError: err });
      },

      () => {
        this.setState({ isUploadingShow: false });

        firebaseApp.database().ref('shows/').push({
          imagePath,
          description,
          name
        });

        produceNotification('New Show Added', 'Successfully', 'success');
      }
    );
  }

  addTestimonial(produceNotification) {
    const {
      artist,
      quote,
      author,
      authorDetails
    } = this.state.inputTestimonial;

    firebaseApp.database().ref('testimonials/').push({
      artist,
      quote,
      author,
      authorDetails
    });

    produceNotification('New Testimonial Added', 'Successfully', 'success');
  }

  render () {
    return (
      <Consumer>
        {value => {
          const { user, produceNotification, setIntagramPost, setPrintPrice } = value;
          return user ? (
            <div>
              <CustomNavBar />
              <div className='admin'>
                <h1>ADMIN PANEL</h1>
                <Grid className='admin-grid'>
                  <Row className='admin-row admin-row-header admin-row-first'>
                    <Col xs={6} md={4} mdOffset={2}>
                      <h2>Instagram</h2>
                    </Col>
                  </Row>
                  <Row className='admin-row'>
                    <Col xs={6} md={4} mdOffset={2}>
                      <h4>Promoted Instagram Post</h4>
                    </Col>
                    <Col xs={6} md={4}>
                      <FormControl
                        ref={this.instagramPostControl}
                        type='text'
                        placeholder='URL (link)'
                        onChange={event => this.setState({ inputInstaPost: event.target.value })}
                        />
                    </Col>
                  </Row>
                  <hr />
                  <Row className='admin-row admin-row-header'>
                    <Col xs={6} md={4} mdOffset={2}>
                      <h2>New Gallery Item</h2>
                    </Col>
                  </Row>
                  <Row className='admin-row'>
                    <Col xs={6} md={4} mdOffset={2}>
                      <h4>Name</h4>
                    </Col>
                    <Col xs={6} md={4}>
                      <FormControl
                        type='text'
                        placeholder='Name'
                        onChange={event => this.updateGalleryItemName(event.target.value)}
                        />
                    </Col>
                  </Row>
                  <Row className='admin-row'>
                    <Col xs={6} md={4} mdOffset={2}>
                      <h4>Artist</h4>
                    </Col>
                    <Col xs={6} md={4}>
                      <DropdownButton
                        bsStyle='default'
                        title={this.state.inputGalleryItem.artist}
                        key={1}
                        id='dropdown-artist'
                        onSelect={eventKey => this.artistSelect(eventKey)}
                      >
                        <MenuItem eventKey={1}>Michael Roser</MenuItem>
                        <MenuItem eventKey={2}>Fred Briscoe</MenuItem>
                      </DropdownButton>
                    </Col>
                  </Row>
                  <Row className='admin-row'>
                    <Col xs={6} md={4} mdOffset={2}>
                      <h4>Description</h4>
                    </Col>
                    <Col xs={6} md={4}>
                      <FormControl
                        type='text'
                        placeholder='Description'
                        onChange={event => this.updateGalleryItemDescription(event.target.value)}
                        />
                    </Col>
                  </Row>
                  <Row className='admin-row'>
                    <Col xs={6} md={4} mdOffset={2}>
                      <h4>Available to Sell?</h4>
                    </Col>
                    <Col xs={6} md={4}>
                      <Checkbox checked={!this.state.inputGalleryItem.sold} onChange={() => this.updateGalleryItemSold(!this.state.inputGalleryItem.sold)}/>
                    </Col>
                  </Row>
                  <Row className='admin-row'>
                    <Col xs={6} md={4} mdOffset={2}>
                      <h4>Price</h4>
                    </Col>
                    <Col xs={6} md={4}>
                      <InputGroup>
                        <InputGroup.Addon>$</InputGroup.Addon>
                        <FormControl
                          type='text'
                          placeholder='Price'
                          onChange={event => this.updateGalleryItemPrice(event.target.value)}
                          />
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row className='admin-row'>
                    <Col xs={6} md={4} mdOffset={2}>
                      <h4>Size (in)</h4>
                    </Col>
                    <Col xs={6} md={4}>
                      <Col xs={4} md={4} className='admin-col-triple'>
                        <InputGroup>
                          <FormControl
                            type='text'
                            placeholder='Width'
                            onChange={event => this.updateGalleryItemWidth(event.target.value)}
                            />
                          <InputGroup.Addon>in</InputGroup.Addon>
                        </InputGroup>
                      </Col>
                      <Col xs={4} md={4} className='admin-col-triple'>
                        <InputGroup>
                          <FormControl
                            type='text'
                            placeholder='Height'
                            onChange={event => this.updateGalleryItemHeight(event.target.value)}
                            />
                          <InputGroup.Addon>in</InputGroup.Addon>
                        </InputGroup>
                      </Col>
                      <Col xs={4} md={4} className='admin-col-triple'>
                        <InputGroup>
                          <FormControl
                            type='text'
                            placeholder='Depth'
                            onChange={event => this.updateGalleryItemLength(event.target.value)}
                            />
                          <InputGroup.Addon>in</InputGroup.Addon>
                        </InputGroup>
                      </Col>
                    </Col>
                  </Row>
                  <Row className='admin-row'>
                    <Col xs={6} md={4} mdOffset={2}>
                      <h4>Weight (lb)</h4>
                    </Col>
                    <Col xs={6} md={4}>
                      <InputGroup>
                        <FormControl
                          type='text'
                          placeholder='Weight'
                          onChange={event => this.updateGalleryItemWeight(event.target.value)}
                          />
                        <InputGroup.Addon>lb</InputGroup.Addon>
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row className='admin-row'>
                    <Col xs={6} md={4} mdOffset={2}>
                      <h4>Image</h4>
                    </Col>
                    <Col xs={6} md={4}>
                      <input type='file' onChange={event => this.updateGalleryItemImage(event.target.files[0])} />
                    </Col>
                  </Row>
                  <Row className='admin-row'>
                    <Col xs={6} md={4} mdOffset={2}>
                      <h4>Has Prints?</h4>
                    </Col>
                    <Col xs={6} md={4}>
                      <Checkbox checked={this.state.inputGalleryItem.hasPrints} onChange={() => this.updateGalleryItemHasPrints(!this.state.inputGalleryItem.hasPrints)}/>
                    </Col>
                  </Row>
                  <Row className='admin-row'>
                    <Col xs={6} md={4} mdOffset={2}>
                      <h4>Print Size (in)</h4>
                    </Col>
                    <Col xs={6} md={4}>
                      <Col xs={4} md={4} className='admin-col-triple'>
                        <InputGroup>
                          <FormControl
                            type='text'
                            placeholder='Width'
                            onChange={event => this.updateGalleryItemPrintWidth(event.target.value)}
                            />
                          <InputGroup.Addon>in</InputGroup.Addon>
                        </InputGroup>
                      </Col>
                      <Col xs={4} md={4} className='admin-col-triple'>
                        <InputGroup>
                          <FormControl
                            type='text'
                            placeholder='Height'
                            onChange={event => this.updateGalleryItemPrintHeight(event.target.value)}
                            />
                          <InputGroup.Addon>in</InputGroup.Addon>
                        </InputGroup>
                      </Col>
                      <Col xs={4} md={4} className='admin-col-triple'>
                        <InputGroup>
                          <FormControl
                            type='text'
                            placeholder='Depth'
                            onChange={event => this.updateGalleryItemPrintLength(event.target.value)}
                            />
                          <InputGroup.Addon>in</InputGroup.Addon>
                        </InputGroup>
                      </Col>
                    </Col>
                  </Row>
                  <Row className='admin-row'>
                    <Col xs={6} md={4} mdOffset={2}>
                      <h4>Print Weight (lb)</h4>
                    </Col>
                    <Col xs={6} md={4}>
                      <InputGroup>
                        <FormControl
                          type='text'
                          placeholder='Weight'
                          onChange={event => this.updateGalleryItemPrintWeight(event.target.value)}
                          />
                        <InputGroup.Addon>lb</InputGroup.Addon>
                      </InputGroup>
                    </Col>
                  </Row>
                  { this.state.isUploadingGalleryItem &&
                    <Row className='admin-row'>
                      <Col xs={6} md={4} mdOffset={6}>
                        <ProgressBar active now={this.state.uploadProgress} />
                      </Col>
                    </Row>
                  }
                  <Row className='admin-row'>
                    <Col xs={6} md={4} mdOffset={6}>
                      <Button
                        bsStyle='primary'
                        onClick={() => this.addGalleryItem(produceNotification)}
                        >
                        Add Gallery Item
                      </Button>
                    </Col>
                  </Row>
                  <hr />
                  <Row className='admin-row admin-row-header'>
                    <Col xs={6} md={4} mdOffset={2}>
                      <h2>Prints</h2>
                    </Col>
                  </Row>
                  <Row className='admin-row'>
                    <Col xs={6} md={4} mdOffset={2}>
                      <h4>Print Price</h4>
                    </Col>
                    <Col xs={6} md={4}>
                      <InputGroup>
                        <InputGroup.Addon>$</InputGroup.Addon>
                        <FormControl
                          ref={this.instagramPostControl}
                          type='text'
                          placeholder='Price'
                          onChange={event => this.setState({ inputPrintPrice: event.target.value })}
                          />
                      </InputGroup>
                    </Col>
                  </Row>
                  <hr />
                  <Row className='admin-row admin-row-header'>
                    <Col xs={6} md={4} mdOffset={2}>
                      <h2>New Show</h2>
                    </Col>
                  </Row>
                  <Row className='admin-row'>
                    <Col xs={6} md={4} mdOffset={2}>
                      <h4>Name (Place)</h4>
                    </Col>
                    <Col xs={6} md={4}>
                      <FormControl
                        type='text'
                        placeholder='Name (Place)'
                        onChange={event => this.updateShowName(event.target.value)}
                        />
                    </Col>
                  </Row>
                  <Row className='admin-row'>
                    <Col xs={6} md={4} mdOffset={2}>
                      <h4>Description</h4>
                    </Col>
                    <Col xs={6} md={4}>
                      <FormControl
                        type='text'
                        placeholder='Description'
                        onChange={event => this.updateShowDescription(event.target.value)}
                        />
                    </Col>
                  </Row>
                  <Row className='admin-row'>
                    <Col xs={6} md={4} mdOffset={2}>
                      <h4>Image</h4>
                    </Col>
                    <Col xs={6} md={4}>
                      <input type='file' onChange={event => this.updateShowImage(event.target.files[0])} />
                    </Col>
                  </Row>
                  { this.state.isUploadingShow &&
                    <Row className='admin-row'>
                      <Col xs={6} md={4} mdOffset={6}>
                        <ProgressBar active now={this.state.uploadProgress} />
                      </Col>
                    </Row>
                  }
                  <Row className='admin-row'>
                    <Col xs={6} md={4} mdOffset={6}>
                      <Button
                        bsStyle='primary'
                        onClick={() => this.addShow(produceNotification)}
                        >
                        Add Show
                      </Button>
                    </Col>
                  </Row>
                  <hr />
                  <Row className='admin-row admin-row-header'>
                    <Col xs={6} md={4} mdOffset={2}>
                      <h2>New Testimonial</h2>
                    </Col>
                  </Row>
                  <Row className='admin-row'>
                    <Col xs={6} md={4} mdOffset={2}>
                      <h4>Artist</h4>
                    </Col>
                    <Col xs={6} md={4}>
                      <DropdownButton
                        bsStyle='default'
                        title={this.state.inputTestimonial.artist}
                        key={2}
                        id='dropdown-artist-testimonial'
                        onSelect={eventKey => this.artistTestimonialSelect(eventKey)}
                      >
                        <MenuItem eventKey={1}>Michael Roser</MenuItem>
                        <MenuItem eventKey={2}>Fred Briscoe</MenuItem>
                      </DropdownButton>
                    </Col>
                  </Row>
                  <Row className='admin-row'>
                    <Col xs={6} md={4} mdOffset={2}>
                      <h4>Quote</h4>
                    </Col>
                    <Col xs={6} md={4}>
                      <FormControl
                        type='text'
                        placeholder='Quote'
                        onChange={event => this.updateTestimonialQuote(event.target.value)}
                        />
                    </Col>
                  </Row>
                  <Row className='admin-row'>
                    <Col xs={6} md={4} mdOffset={2}>
                      <h4>Author</h4>
                    </Col>
                    <Col xs={6} md={4}>
                      <FormControl
                        type='text'
                        placeholder='Author'
                        onChange={event => this.updateTestimonialAuthor(event.target.value)}
                        />
                    </Col>
                  </Row>
                  <Row className='admin-row'>
                    <Col xs={6} md={4} mdOffset={2}>
                      <h4>Author Details (i.e. location, career title, etc)</h4>
                    </Col>
                    <Col xs={6} md={4}>
                      <FormControl
                        type='text'
                        placeholder='Author Details'
                        onChange={event => this.updateTestimonialAuthorDetails(event.target.value)}
                        />
                    </Col>
                  </Row>
                  <Row className='admin-row'>
                    <Col xs={6} md={4} mdOffset={6}>
                      <Button
                        bsStyle='primary'
                        onClick={() => this.addTestimonial(produceNotification)}
                        >
                        Add Testimonial
                      </Button>
                    </Col>
                  </Row>
                  <hr />
                  <Row className='admin-row-end'>
                    <Button
                      bsStyle='primary'
                      onClick={() => this.applySettings(produceNotification, setIntagramPost, setPrintPrice)}
                      >
                      Update
                    </Button>
                  </Row>
                </Grid>
              </div>
              <Footer />
            </div>
          ) : (
            <Redirect to='/' />
          )
        }}
      </Consumer>
    )
  }
}

export default AdminPanel;
