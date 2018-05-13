import React, { Component } from 'react'
import { Consumer } from '../MyContext'
import { firebaseApp } from '../firebase'
import { Redirect } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Grid, Row, Col, Button, FormControl, DropdownButton, MenuItem } from 'react-bootstrap'
import CustomNavBar from './CustomNavBar'
import Footer from './Footer'
import NotificationSystem from 'react-notification-system'

class AdminPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputInstaPost: '',
      inputGalleryItem: {
        name: '',
        artist: 'Select Artist...',
        imageLink: '',
        description: '',
        sold: false,
        image: null
      },
      isUploading: false,
      uploadProgress: 0,
      uploadError: null
    }

    this.instagramPostControl = React.createRef();
  }

  applySettings(produceNotification, setIntagramPost) {
    // Update instagram post
    if (this.state.inputInstaPost !== null && this.state.inputInstaPost !== '') {
      setIntagramPost(this.state.inputInstaPost);
    }

    // Produce notification
    produceNotification('Update Successful', 'Yay!', 'success');
  }

  addGalleryItem() {
    console.log('Adding gallery item with name of', this.state.inputGalleryItem.name);
  }

  updateGalleryItemName(newName) {
    let igi = this.state.inputGalleryItem;
    igi.name = newName;
    this.setState({ inputGalleryItem: igi });
  }

  artistSelect(eventKey) {
    if (eventKey === 1) {
      let igi = this.state.inputGalleryItem;
      igi.artist = 'Michael Roser';
      this.setState({ inputGalleryItem: igi });
    }
    if (eventKey === 2) {
      let igi = this.state.inputGalleryItem;
      igi.artist = 'Fred Briscoe';
      this.setState({ inputGalleryItem: igi });
    }

    console.log(eventKey);
  }

  render () {
    return (
      <Consumer>
        {value => {
          const { user, logOut, produceNotification, setIntagramPost } = value;
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
                        ref={this.instagramPostControl}
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
                        ref={this.instagramPostControl}
                        type='text'
                        placeholder='Description'
                        onChange={event => this.setState({ inputGalleryItem: {description: event.target.value} })}
                        />
                    </Col>
                  </Row>
                  <Row className='admin-row'>
                    <Col xs={6} md={4} mdOffset={2}>
                      <h4>Image</h4>
                    </Col>
                    <Col xs={6} md={4}>
                      <input type='file' onChange={event => this.setState({ inputGalleryItem: {image: event.target.files[0]} })} />
                    </Col>
                  </Row>
                  <Row className='admin-row'>
                    <Col xs={6} md={4} mdOffset={6}>
                      <Button
                        bsStyle='primary'
                        onClick={() => this.addGalleryItem()}
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
