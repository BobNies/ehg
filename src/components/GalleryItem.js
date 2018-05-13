import React, { Component } from 'react'
import { Consumer } from '../MyContext'
import { firebaseApp } from '../firebase'
import { Grid, Row, Col } from 'react-bootstrap'
import CustomNavBar from './CustomNavBar'
import Footer from './Footer'
import AdminShortcut from './AdminShortcut'
import Img from 'react-image'

class GalleryItem extends Component {

  constructor(props) {
    super(props);

    this.state = {
      imageSrc: ''
    };
  }

  componentDidMount() {
    const storageRef = firebaseApp.storage().ref('');
    storageRef.child(this.props.imagePath).getDownloadURL().then((url) => {
      this.setState({ imageSrc: url });
    })
  }

  render () {
    return(
      <Consumer>
        {value => {
          const { user } = value;
          return (
            <Img className='gallery-item-img' src={this.state.imageSrc} />
          )
        }}
      </Consumer>
    );
  }
}

export default GalleryItem;
