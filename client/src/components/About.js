import React, { Component } from 'react'
import CustomNavBar from './CustomNavBar'
import Footer from './Footer'
import AdminShortcut from './AdminShortcut'
import { Grid, Row, Col, FormControl, Button } from 'react-bootstrap'

class About extends Component {

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
        <Grid className='about'>
          <div className='about-header'>
            <h1>WHO IS {this.state.artistName.toUpperCase().replace('-', ' ')}?</h1>
          </div>
          <div className='about-content'>
          </div>
        </Grid>
        <Footer />
      </div>
    );
  }
}

export default About;
