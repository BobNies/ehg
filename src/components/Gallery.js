import React, { Component } from 'react'
import { Consumer } from '../MyContext'
import { firebaseApp } from '../firebase'
import { Grid, Row, Col } from 'react-bootstrap'
import Masonry from 'react-masonry-component'
import CustomNavBar from './CustomNavBar'
import Footer from './Footer'
import AdminShortcut from './AdminShortcut'
import GalleryItem from './GalleryItem'

const masonryOptions = {
  transitionDuration: 0
};

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

    this.updateGallery.bind(this);
  }

  componentDidMount() {
    this.updateGallery();
  }

  componentWillUpdate(nextProps, nextState) {
    // Update state to sync with router changes
    if (nextProps.match.params.artistName !== this.state.artistName) {
      this.setState({ artistName: nextProps.match.params.artistName });
      this.updateGallery();
    }
  }

  updateGallery() {
    firebaseApp.database().ref('gallery').once('value').then((snapshot) => {
      this.setState({ galleryItems: snapshot.val() });

      const galleryItems = this.state.galleryItems[this.state.artistName];
      let newItems = [];

      if (galleryItems != null) {
        Object.keys(galleryItems).map((item, index) => {
          const { name, artist, description, imagePath, sold } = galleryItems[item];
          newItems.push([name, artist, description, sold, imagePath]);
        })
      }

      this.setState({ galleryItemArray: newItems });
    })
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
              { this.state.artistName === 'michael-roser' ? (
                <h1>Michael Roser</h1>
              ) : (
                <h1>Fred Briscoe</h1>
              )}
              <Masonry
                className={'gallery'}
                options={masonryOptions}
                disableImagesLoaded={false}
                updateOnEachImageLoad={true}
                >
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
              </Masonry>
              <Footer />
            </div>
          )
        }}
      </Consumer>
    );
  }
}

export default Gallery;
