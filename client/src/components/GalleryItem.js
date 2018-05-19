import React, { Component } from 'react'
import Img from 'react-image'
import { Link } from 'react-router-dom'
import { Consumer } from '../MyContext'
import { firebaseApp } from '../firebase'
import Spinner from './Spinner'

class GalleryItem extends Component {

  constructor(props) {
    super(props);

    this.state = {
      imageSrc: ''
    };
  }

  componentDidMount() {
    this.retrieveImage(this.props.imagePath);
  }

  componentWillUpdate(nextProps, nextState) {
    // Update image to sync with router changes
    if (nextProps.imagePath !== this.props.imagePath) {
      this.retrieveImage(nextProps.imagePath);
    }
  }

  retrieveImage = (imagePath) => {
    const storageRef = firebaseApp.storage().ref('');
    storageRef.child(imagePath).getDownloadURL().then((url) => {
      this.setState({ imageSrc: url });
    })
  }

  testReplace = () => {
    this.setState({ imageSrc: '' });
  }

  render () {
    return(
      <Consumer>
        {value => {
          return (
            <div className='gallery-item'>
              <Link to={'gallery/' + this.props.itemKey}>
                <Img src={this.state.imageSrc} loader={Spinner}/>
              </Link>
            </div>
          )
        }}
      </Consumer>
    );
  }
}

export default GalleryItem;
