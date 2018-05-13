import React, { Component } from 'react'
import CustomNavBar from './CustomNavBar'
import Footer from './Footer'
import AdminShortcut from './AdminShortcut'

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
        <AdminShortcut />
        <CustomNavBar/>
        <p>Contact page for {this.state.artistName}</p>
        <Footer />
      </div>
    );
  }
}

export default Contact;
