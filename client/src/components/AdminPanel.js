import React, { Component } from 'react'
import { Consumer } from '../MyContext'
import { firebaseApp } from '../firebase'
import { Redirect } from 'react-router-dom'
import { Grid, Row, Col, Button, FormControl, DropdownButton, MenuItem, ProgressBar } from 'react-bootstrap'
import CustomNavBar from './CustomNavBar'
import Footer from './Footer'

class AdminPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputInstaPost: '',
      inputGalleryItem: {
        name: '',
        artist: 'Select Artist...',
        description: '',
        sold: false,
        price: '',
        length: '',
        width: '',
        height: '',
        weight: ''
      },
      igiImage: null,
      isUploading: false,
      uploadProgress: 0,
      uploadError: null
    }

    this.instagramPostControl = React.createRef();
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

  applySettings(produceNotification, setIntagramPost) {
    // Update instagram post
    if (this.state.inputInstaPost !== null && this.state.inputInstaPost !== '') {
      setIntagramPost(this.state.inputInstaPost);
    }

    // Produce notification
    produceNotification('Update Successful', 'Yay!', 'success');
  }

  addGalleryItem(produceNotification) {
    const { name, artist, description, sold, price, length, width, height, weight } = this.state.inputGalleryItem;

    // File image upload
    let file = this.state.igiImage;
    const imageRef = firebaseApp.storage().ref('gallery/' + artist + '/' + file.name);
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
        let d = new Date();
        let timestamp = d.getTime();

        firebaseApp.database().ref('gallery/' + artist).push({ name, artist, description, sold, imagePath, timestamp, price, length, width, height, weight });

        produceNotification('Gallery Item Added', 'Successfully', 'success');
      }
    );
  }

  render () {
    return (
      <Consumer>
        {value => {
          const { user, produceNotification, setIntagramPost } = value;
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
                      <h4>Price</h4>
                    </Col>
                    <Col xs={6} md={4}>
                      <FormControl
                        type='text'
                        placeholder='Price'
                        onChange={event => this.updateGalleryItemPrice(event.target.value)}
                        />
                    </Col>
                  </Row>
                  <Row className='admin-row'>
                    <Col xs={6} md={4} mdOffset={2}>
                      <h4>Size (in)</h4>
                    </Col>
                    <Col xs={2} md={1}>
                      <FormControl
                        type='text'
                        placeholder='Width'
                        onChange={event => this.updateGalleryItemWidth(event.target.value)}
                        />
                    </Col>
                    <Col xs={2} md={1}>
                      <FormControl
                        type='text'
                        placeholder='Height'
                        onChange={event => this.updateGalleryItemHeight(event.target.value)}
                        />
                    </Col>
                    <Col xs={2} md={1}>
                      <FormControl
                        type='text'
                        placeholder='Depth'
                        onChange={event => this.updateGalleryItemLength(event.target.value)}
                        />
                    </Col>
                  </Row>
                  <Row className='admin-row'>
                    <Col xs={6} md={4} mdOffset={2}>
                      <h4>Weight (lb)</h4>
                    </Col>
                    <Col xs={6} md={4}>
                      <FormControl
                        type='text'
                        placeholder='Weight'
                        onChange={event => this.updateGalleryItemWeight(event.target.value)}
                        />
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
                  { this.state.isUploading &&
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
                        Add
                      </Button>
                    </Col>
                  </Row>
                  <hr />
                  <Row className='admin-row-end'>
                    <Button
                      bsStyle='primary'
                      onClick={() => this.applySettings(produceNotification, setIntagramPost)}
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
