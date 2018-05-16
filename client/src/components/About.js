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
              <div className='about-image'>
                <Img src={MichaelRoserImg} />
              </div>
            </Col>
            <Col xs={12} md={6} className='about-desc'>
              <p>Lorem ipsum dolor amet pug fam synth woke. Kale chips VHS brooklyn
                man braid, before they sold out 90's woke tousled master cleanse
                organic ugh health goth keytar pork belly marfa. Meditation hammock
                pour-over, poke flexitarian roof party raclette live-edge deep v
                bitters chartreuse intelligentsia. Fingerstache hammock paleo craft
                beer taxidermy shaman keytar. Marfa actually wayfarers subway tile,
                try-hard fam slow-carb bespoke humblebrag YOLO pabst. Literally
                waistcoat hot chicken gentrify irony pour-over kitsch sartorial
                vegan photo booth bicycle rights wayfarers pabst. Actually subway
                tile tousled readymade locavore.</p>
            </Col>
          </div>
        </Grid>
        <Footer />
      </div>
    );
  }
}

export default About;
