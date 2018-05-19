import React, { Component } from 'react'
import { Consumer } from '../MyContext'
import { firebaseApp } from '../firebase'
import CustomNavBar from './CustomNavBar'
import Footer from './Footer'
import AdminShortcut from './AdminShortcut'
import GalleryItem from './GalleryItem'

class Gallery extends Component {

  constructor(props) {
    super(props);

    this.state = {
      artistName: this.props.match.params.artistName,
      galleryItems: [],
      galleryItemArray: []
    };

    this.updateGallery.bind(this);
  }

  componentDidMount() {
    this.updateGallery();
    window.scrollTo(0, 0);
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
      if (snapshot.val() !== null) {
        this.setState({ galleryItems: snapshot.val() });

        const galleryItems = this.state.galleryItems[this.state.artistName];
        let newItems = [];

        if (galleryItems != null) {
          Object.keys(galleryItems).map((item, index) => {
            const { name, artist, description, sold, imagePath, timestamp, price } = galleryItems[item];
            newItems.push([name, artist, description, sold, imagePath, timestamp, item, price]);
          })
        }

        newItems.reverse();

        this.setState({ galleryItemArray: newItems });
      }
    })
  }

  render () {
    return(
      <Consumer>
        {value => {
          return (
            <div>
              <AdminShortcut />
              <CustomNavBar/>
              { this.state.artistName === 'michael-roser' ? (
                <h1 className='gallery-title'>MICHAEL ROSER</h1>
              ) : (
                <h1 className='gallery-title'>FRED BRISCOE</h1>
              )}
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
                        timestamp={item[5]}
                        itemKey={item[6]}
                        price={item[7]}
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
