import React, { Component } from 'react'
import { Consumer } from '../MyContext'
import { firebaseApp } from '../firebase'
import { Grid, Row, Col } from 'react-bootstrap'
import CustomNavBar from './CustomNavBar'
import Footer from './Footer'
import AdminShortcut from './AdminShortcut'
import GalleryItem from './GalleryItem'

class Gallery extends Component {

  constructor(props) {
    super(props);

    this.state = {
      artistName: this.props.match.params.artistName,
      isUploading: false,
      uploadProgress: 0,
      uploadError: null,
      galleryItems: [],
      galleryItemArray: []
    };
  }

  componentDidMount() {
    firebaseApp.database().ref('gallery').once('value').then((snapshot) => {
      this.setState({ galleryItems: snapshot.val() });

      const galleryItems = this.state.galleryItems[this.state.artistName];
      let newItems = [];

      Object.keys(galleryItems).map((item, index) => {
        const { name, artist, description, imagePath, sold } = galleryItems[item];
        newItems.push([name, artist, description, sold, imagePath]);
      })

      this.setState({ galleryItemArray: newItems });
    })
  }

  componentWillUpdate(nextProps, nextState) {
    // Update state to sync with router changes
    if (nextProps.match.params.artistName !== this.state.artistName) {
      this.setState({ artistName: nextProps.match.params.artistName });
    }
  }

  render () {
    return(
      <Consumer>
        {value => {
          const { user } = value;
          return (
            <div>
              <AdminShortcut />
              <CustomNavBar/>
              <h1>{this.state.artistName}</h1>
              <div className='gallery'>
                {
                  this.state.galleryItemArray.map((item, index) => {
                    return (
                      <GalleryItem
                        key={index}
                        name={item[0]}
                        artist={item[1]}
                        description={item[2]}
                        sold={item[3]}
                        imagePath={item[4]}
                        />
                    )
                  })
                }
              </div>
              <Footer />
            </div>
          )
        }}
      </Consumer>
    );
  }
}

export default Gallery;
