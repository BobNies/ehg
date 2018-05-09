import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import CustomNavBar from './CustomNavBar'
import Img from 'react-image'
import { Grid, Row, Col } from 'react-bootstrap'

class Home extends Component {
  render () {
    return(
      <div>
        <CustomNavBar/>
        <Grid>
          <Row className='home-sec-1'>
            <Col xs={12} md={6}>
              <Img className='home-img-1' src='example-photo-3.jpeg'/>
            </Col>
            <Col xs={12} md={6}>
              <h2 className='home-title-1'>A collective <span className='home-title-1-bold'>gallery</span> of mixed media art.</h2>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Home;
