import React, { Component } from 'react'
import CustomNavBar from './CustomNavBar'

class Contact extends Component {

  constructor(props) {
    super(props);

    this.state = {
      artistName: this.props.match.params.artistName
    };
  }

  componentWillUpdate(nextProps, nextState) {
    // Update state to sync with router changes
    if (nextProps.match.params.artistName !== this.state.artistName) {
      this.setState({ artistName: nextProps.match.params.artistName });
    }
  }

  render () {
    return(
      <div>
        <CustomNavBar/>
        <p>Contact page for {this.state.artistName}</p>
      </div>
    );
  }
}

export default Contact;
