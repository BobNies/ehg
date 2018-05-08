import React, { Component } from 'react'

class Gallery extends Component {

  constructor(props) {
    super(props);

    this.state = {
      artistName: this.props.match.params.artistName
    };
  }

  render () {
    return(
      <p>Gallery of {this.state.artistName}</p>
    );
  }
}

export default Gallery;
