import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import Img from 'react-image'
import CustomNavBar from './CustomNavBar'
import Footer from './Footer'
import AdminShortcut from './AdminShortcut'
import Testimonial from './Testimonial'
import MichaelRoserImg from '../images/artist-portrait-michael-roser.JPG'
import FredBriscoeImg from '../images/artist-portrait-fred-briscoe.JPG'

class About extends Component {

  constructor(props) {
    super(props);

    this.state = {
      artistName: this.props.match.params.artistName
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
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
            <Row>
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
                    <h4>"Art is an expression of the mind."</h4>
                    <p>Michael Roser bio.</p>
                  </div>
                ) : (
                  <div>
                    <h4>"Sculpture is all about precision and quality."</h4>
                    <p>Fred Briscoe bio.</p>
                  </div>
                )}
              </Col>
            </Row>
            { this.state.artistName === 'michael-roser' ? (
              <Row className='testimonial-section'>
                <h2>TESTIMONIALS</h2>
                <Col xs={12} md={4} className='testimonial-col'>
                  <Testimonial
                    quote='Mike&apos;s work is bold and captivating with its many
                    textures and layers that engage the viewer.  He has a multifaceted
                    talent with visual appeal that works well on small as well as
                    large scale.'
                    author='Jane Wheeler'
                    authorDetails='Art Curator for The Bird Rock Art Cooperative'
                    />
                </Col>
                <Col xs={12} md={4} className='testimonial-col'>
                  <Testimonial
                    quote='Mike is a talented artist who produces a diverse variety
                    of evocative and visually appealing artwork...  I absolutely
                    fell in love with one of Mike&apos;s patriotic pieces, a painting
                    I bought as a surprise for my husband, who happens to be a collector
                    of Americana.'
                    author='Charlene Dangel'
                    authorDetails='La Jolla'
                    />
                </Col>
                <Col xs={12} md={4} className='testimonial-col'>

                </Col>
              </Row>
            ) : (
              <Row className='testimonial-section'>
                <h2>TESTIMONIALS</h2>
                <Col xs={12} md={4} className='testimonial-col'>
                  <Testimonial
                    quote='Fred did an amazing job at.... here is the rest of the
                    testimonial here.  It&apos;s pretty cool, here is some more text.'
                    author='Sal Hochum'
                    />
                </Col>
                <Col xs={12} md={4} className='testimonial-col'>
                  <Testimonial
                    quote='What a great job he did. here is the rest of the
                    testimonial here.  It&apos;s pretty cool, here is some more text.'
                    author='Will Cluff'
                    />
                </Col>
                <Col xs={12} md={4} className='testimonial-col'>
                  <Testimonial
                    quote='Here is a guy who knows how to make sculpture! here is the rest of the
                    testimonial here.  It&apos;s pretty cool, here is some more text.'
                    author='Sharman Sanders'
                    />
                </Col>
              </Row>
            )}
          </div>
        </Grid>
        <Footer />
      </div>
    );
  }
}

export default About;
