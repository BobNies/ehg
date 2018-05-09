import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Img from 'react-image'
import { Grid, Row, Col } from 'react-bootstrap'
import CustomNavBar from './CustomNavBar'
import ScrollIndicator from './ScrollIndicator'

class Home extends Component {
  render () {
    return(
      <div>
        <CustomNavBar/>
        <ScrollIndicator/>
        <Grid>
          <Row className='home-sec-1'>
            <Col xs={12} md={6}>
              <Img className='home-img-1' src='example-photo-3.jpeg'/>
            </Col>
            <Col xs={12} md={6}>
              <h2 className='home-title-1 noselect'>A collective <span className='home-title-1-bold'>gallery</span> of mixed media art.</h2>
            </Col>
          </Row>
          <Row className='home-sec-2'>
            <h1>Our Artists</h1>
            <Col className='artist-divider-left' xs={12} md={6}>
              <h2 className='noselect'>FRED BRISCOE</h2>
              <div className='artist-divider-left-overlay'></div>
            </Col>
            <Col className='artist-divider-right' xs={12} md={6}>
              <h2 className='noselect'>MIKE ROSER</h2>
              <div className='artist-divider-right-overlay'></div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Home;
