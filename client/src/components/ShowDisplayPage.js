import React, { Component } from 'react'
import { Consumer } from '../MyContext'
import { firebaseApp } from '../firebase'
import { Grid, Row, Col, FormControl, Button, ProgressBar } from 'react-bootstrap'
import Img from 'react-image'
import CustomNavBar from './CustomNavBar'
import Footer from './Footer'

class ShowDisplayPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showKey: this.props.match.params.showKey,
      imageSrc: '',
      show: null,
      loading: true,
      editMode: false,
      editedDescription: '',
      editedName: '',
      editedImagePath: '',
      originImagePath: '',
      showImage: null,
      isUploading: false,
      uploadProgress: 0,
      uploadError: null
    };
  }

  componentDidMount() {
    firebaseApp.database().ref('shows/' + this.state.showKey).once('value', snapshot => {
      if (snapshot.val() !== null) {
        this.setState({ show: snapshot.val() });

        const storageRef = firebaseApp.storage().ref('');
        storageRef.child(this.state.show.imagePath).getDownloadURL().then((url) => {
          this.setState({ imageSrc: url });
        })

        this.setState({ loading: false });

        // Admin edit mode - starting values
        this.setState({
          editedDescription: snapshot.val().description,
          editedName: snapshot.val().name,
          editedImagePath: snapshot.val().imagePath,
          originImagePath: snapshot.val().imagePath
        });
      } else {
        this.props.history.push('/404');
      }
    })
  }

  componentWillUpdate(nextProps, nextState) {
    // Update state to sync with router changes
    if (nextProps.match.params.showKey !== this.state.showKey) {
      this.setState({ showKey: nextProps.match.params.showKey });
    }
  }

  updateShowImage(newImage) {
    this.setState({ showImage: newImage });
  }

  deleteShow = (produceNotification) => {
    firebaseApp.database().ref('shows/' + this.state.showKey).remove();

    produceNotification('Show Deleted', 'Successfully', 'success');
  }

  applyUpdate = (produceNotification) => {
    // Upload Image (if edited)
    if (this.state.showImage !== null && this.state.showImage !== '') {
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
    firebaseApp.database().ref('shows/' + this.state.showKey)
      .set({
        imagePath: imagePath,
        description: this.state.editedDescription,
        name: this.state.editedName
      });

      produceNotification('Update Applied', 'Successfully', 'success');
  }

  render () {
    return (
      <Consumer>
        {value => {
          const { user, produceNotification } = value;
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
                    <Row className='show-page-main'>
                      <Col xs={12} md={8}>
                        <Img src={this.state.imageSrc} />
                      </Col>
                      <Col xs={12} md={4}>
                        <h3>{this.state.show.name}</h3>
                        <Row className='gallery-page-row-3'>
                          <p>{this.state.show.description}</p>
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
                            <h3>Image</h3>
                          </Col>
                          <Col xs={6} md={4}>
                            <input type='file' onChange={event => this.updateShowImage(event.target.files[0])} />
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
                              onClick={() => this.deleteShow(produceNotification)}
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

export default ShowDisplayPage;
