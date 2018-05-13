import React, { Component } from 'react'
import { Consumer } from '../MyContext'
import { firebaseApp } from '../firebase'
import CustomNavBar from './CustomNavBar'
import Footer from './Footer'
import AdminShortcut from './AdminShortcut'

class Gallery extends Component {

  constructor(props) {
    super(props);

    this.state = {
      artistName: this.props.match.params.artistName,
      isUploading: false,
      uploadProgress: 0,
      uploadError: null
    };

    this.uploadProgressBar = React.createRef();
  }

  componentWillUpdate(nextProps, nextState) {
    // Update state to sync with router changes
    if (nextProps.match.params.artistName !== this.state.artistName) {
      this.setState({ artistName: nextProps.match.params.artistName });
    }
  }

  imageChange = (e) => {
    let file = e.target.files[0];
    let storageRef = firebaseApp.storage().ref('gallery/' + file.name);
    let task = storageRef.put(file);
    this.setState({ isUploading: true });
    task.on('state_changed',
      (snapshot) => {
        let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        this.uploadProgressBar.current.value = percentage;
        this.setState({ uploadProgress: percentage });
      },

      (err) => {
        this.setState({ uploadError: err });
      },

      () => {
        this.setState({ isUploading: false });
      }
    );
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
              {user &&
                <div>
                  <input type='file' onChange={e => this.imageChange(e)} />
                  <progress ref={this.uploadProgressBar} value='0' max='100'>{this.state.uploadProgress}</progress>
                  {this.state.isUploading &&
                    <h4>Uploading, please wait...</h4>
                  }
                </div>
              }
              <Footer />
            </div>
          )
        }}
      </Consumer>
    );
  }
}

export default Gallery;
