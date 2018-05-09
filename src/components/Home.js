import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Img from 'react-image'
import { Grid, Row, Col, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import CustomNavBar from './CustomNavBar'
import ScrollIndicator from './ScrollIndicator'
import HeaderImg from '../images/example-photo-3.jpeg'
import Footer from './Footer'

class Home extends Component {
  render () {
    return(
      <div>
        <CustomNavBar/>
        <ScrollIndicator/>
        <Grid>
          <Row className='home-sec-1'>
            <Col xs={12} md={6}>
              <Img className='home-img-1 noselect' src={HeaderImg}/>
            </Col>
            <Col xs={12} md={6}>
              <h2 className='home-title-1 noselect'>A collective <span className='home-title-1-bold'>gallery</span> of mixed media art.</h2>
            </Col>
          </Row>
          <Row className='home-sec-2'>
            <h1 className='noselect'>Our Artists</h1>
            <Link to='/artists/fred-briscoe/gallery'>
              <Col className='artist-divider-left' xs={12} md={6}>
                <h2 className='noselect'>FRED BRISCOE</h2>
                <div className='artist-divider-left-overlay'></div>
              </Col>
            </Link>
            <Link to='/artists/michael-roser/gallery'>
              <Col className='artist-divider-right' xs={12} md={6}>
                <h2 className='noselect'>MICHAEL ROSER</h2>
                <div className='artist-divider-right-overlay'></div>
              </Col>
            </Link>
          </Row>
          <Row className='home-sec-2-addon'>
            <Col xs={12} md={6} className='artist-button-bar-left'>
              <Col xs={12} md={4}>
                <LinkContainer to='/artists/fred-briscoe/gallery'><Button>GALLERY</Button></LinkContainer>
              </Col>
              <Col xs={12} md={4}>
                <LinkContainer to='/artists/fred-briscoe/about'><Button>ABOUT</Button></LinkContainer>
              </Col>
              <Col xs={12} md={4}>
                <LinkContainer to='/artists/fred-briscoe/contact'><Button>CONTACT</Button></LinkContainer>
              </Col>
            </Col>
            <Col xs={12} md={6} className='artist-button-bar-right'>
              <Col xs={12} md={4}>
                <LinkContainer to='/artists/michael-roser/gallery'><Button>GALLERY</Button></LinkContainer>
              </Col>
              <Col xs={12} md={4}>
                <LinkContainer to='/artists/michael-roser/about'><Button>ABOUT</Button></LinkContainer>
              </Col>
              <Col xs={12} md={4}>
                <LinkContainer to='/artists/michael-roser/contact'><Button>CONTACT</Button></LinkContainer>
              </Col>
            </Col>
          </Row>
        </Grid>
        <Footer/>
      </div>
    );
  }
}

export default Home;
