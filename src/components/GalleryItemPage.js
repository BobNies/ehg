import React, { Component } from 'react'
import { Consumer } from '../MyContext'
import { firebaseApp } from '../firebase'
import { Grid, Row, Col, Button } from 'react-bootstrap'
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
      loading: true
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
                      <Button bsStyle='default'>PURCHASE</Button>
                      <p>{this.state.item.description}</p>
                    </Col>
                  </Row>
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
