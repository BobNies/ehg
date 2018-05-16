import React, { Component } from 'react'
import { Grid, Row, Col, FormControl, Button } from 'react-bootstrap'
import Img from 'react-image'
import CustomNavBar from './CustomNavBar'
import Footer from './Footer'
import AdminShortcut from './AdminShortcut'
import MichaelRoserImg from '../images/artist-portrait-michael-roser.JPG'
import FredBriscoeImg from '../images/artist-portrait-fred-briscoe.JPG'

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
            <Col xs={12} md={6} className='about-image-col'>
              { this.state.artistName === 'michael-roser' ? (
                <div className='about-image-michaelroser'>
                  <Img src={MichaelRoserImg} />
                </div>
              ) : (
                <div className='about-image-fredbriscoe'>
                  <Img src={FredBriscoeImg} />
                </div>
              )}
            </Col>
            <Col xs={12} md={6} className='about-desc'>
              { this.state.artistName === 'michael-roser' ? (
                <div>
                  <h4>"Artwork should be great, not just good."</h4>
                  <p>Michael Roser bio.</p>
                </div>
              ) : (
                <div>
                  <h4>"Sculpture is all about precision and quality."</h4>
                  <p>Fred Briscoe bio.</p>
                </div>
              )}
            </Col>
          </div>
        </Grid>
        <Footer />
      </div>
    );
  }
}

export default About;
