import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Img from 'react-image'
import { Grid, Row, Col, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import InstagramEmbed from 'react-instagram-embed'
import FacebookProvider, { Page } from 'react-facebook'
import MediaQuery from 'react-responsive'
import { Consumer } from '../MyContext'
import CustomNavBar from './CustomNavBar'
import ScrollIndicator from './ScrollIndicator'
import Footer from './Footer'
import HeaderImg from '../images/header.jpg'
import AdminShortcut from '../components/AdminShortcut'

class Home extends Component {
  render () {
    return(
      <Consumer>
        {value => {
          const { instagramPost } = value;
          return (
            <div>
              <AdminShortcut />
              <CustomNavBar/>
              <MediaQuery query="(min-width: 1224px)">
                <ScrollIndicator/>
              </MediaQuery>
              <Grid fluid>
                <Row className='home-sec-1'>
                  <Col className='home-img-1-wrap' xs={12} md={6}>
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
                      <div className='artist-divider-left-image'></div>
                      <h2 className='noselect'>FRED BRISCOE</h2>
                      <div className='artist-divider-left-overlay'></div>
                    </Col>
                  </Link>
                  <Link to='/artists/michael-roser/gallery'>
                    <Col className='artist-divider-right' xs={12} md={6}>
                      <div className='artist-divider-right-image'></div>
                      <h2 className='noselect'>MICHAEL ROSER</h2>
                      <div className='artist-divider-right-overlay'></div>
                    </Col>
                  </Link>
                </Row>
                <MediaQuery query="(min-width: 1224px)">
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
                </MediaQuery>
                <Row className='social-sec-1'>
                  <Col xs={12} md={6}>
                    <h2 className='noselect'>See what we're up to.</h2>
                  </Col>
                  <Col className='social-widget-instagram' xs={12} md={6}>
                    { instagramPost !== '' &&
                      <InstagramEmbed
                        url={instagramPost}
                        maxWidth={400}
                        hideCaption={false}
                        containerTagName='div'
                        protocol=''
                        onLoading={() => {}}
                        onSuccess={() => {}}
                        onAfterRender={() => {}}
                        onFailure={() => {}}
                      />
                    }
                  </Col>
                </Row>
                <Row className='social-sec-2'>
                  <MediaQuery query="(max-width: 1224px)">
                    <Col xs={12} md={6}>
                      <h2 className='noselect'>Like us?  Show your love.</h2>
                    </Col>
                  </MediaQuery>
                  <Col className='social-widget-facebook' xs={12} md={6}>
                    <FacebookProvider appId="204707493667261">
                      <Page href="https://www.facebook.com/Eucalyptus-Hills-Gallery-185642548871091/" tabs="timeline" height='650' width='400'/>
                    </FacebookProvider>
                  </Col>
                  <MediaQuery query="(min-width: 1224px)">
                    <Col xs={12} md={6}>
                      <h2 className='noselect'>Like us?  Show your love.</h2>
                    </Col>
                  </MediaQuery>
                </Row>
              </Grid>
              <Footer/>
            </div>
          )
        }}
      </Consumer>
    );
  }
}

export default Home;
