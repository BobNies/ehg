import React, { Component } from 'react'
import CustomNavBar from './CustomNavBar'

class Gallery extends Component {

  constructor(props) {
    super(props);

    this.state = {
      artistName: this.props.match.params.artistName
    };
  }

  render () {
    return(
      <div>
        <CustomNavBar/>
        <p>Gallery of {this.state.artistName}</p>
      </div>
    );
  }
}

export default Gallery;
