import React, { Component } from 'react'
import { Consumer } from '../MyContext'
import { firebaseApp } from '../firebase'
import { Grid, Row, Col, Button, FormControl } from 'react-bootstrap'
import CustomNavBar from './CustomNavBar'
import Footer from './Footer'
import Img from 'react-image'

class GalleryItemPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemKey: this.props.match.params.itemKey,
      artistName: this.props.match.params.artistName,
      imageSrc: '',
      item: null,
      loading: true,
      editMode: false,
      editedName: '',
      editedDescription: '',
      editedPrice: ''
    };
  }

  componentDidMount() {
    firebaseApp.database().ref('gallery/' + this.state.artistName + '/' + this.state.itemKey).once('value', snapshot => {
      this.setState({ item: snapshot.val() });

      const storageRef = firebaseApp.storage().ref('');
      storageRef.child(this.state.item.imagePath).getDownloadURL().then((url) => {
        this.setState({ imageSrc: url });
      })

      this.setState({ loading: false });
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

  render () {
    return (
      <Consumer>
        {value => {
          const { user } = value;
          return (
            <div>
              <CustomNavBar />
              <Grid>
                { this.state.loading ? (
                  <div className='loading'>
                    <h1>LOADING, PLEASE WAIT...</h1>
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
                        <Col xs={12} md={6}>
                          <p className='gallery-page-price'>${this.state.item.price}</p>
                        </Col>
                        <Col xs={12} md={6}>
                          <Button bsStyle='default'>PURCHASE</Button>
                        </Col>
                        <p>{this.state.item.description}</p>
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
                          <Col xs={12} md={2} mdOffset={3}>
                            <h3>Name</h3>
                          </Col>
                          <Col xs={12} md={4}>
                            <FormControl
                              type='text'
                              placeholder='Name'
                              onChange={event => this.setState({ editedName: event.target.value })}
                              />
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={12} md={2} mdOffset={3}>
                            <h3>Description</h3>
                          </Col>
                          <Col xs={12} md={4}>
                            <FormControl
                              type='text'
                              placeholder='Description'
                              onChange={event => this.setState({ editedName: event.target.value })}
                              />
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={12} md={2} mdOffset={3}>
                            <h3>Price</h3>
                          </Col>
                          <Col xs={12} md={4}>
                            <FormControl
                              type='text'
                              placeholder='Price'
                              onChange={event => this.setState({ editedPrice: event.target.value })}
                              />
                          </Col>
                        </Row>
                        <Row className='gallery-page-edit-final'>
                          <Col xs={12} md={2} mdOffset={3}>
                            <Button
                              bsStyle='danger'
                              >
                              Delete
                            </Button>
                          </Col>
                          <Col xs={12} md={4}>
                            <Button
                              bsStyle='warning'
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
