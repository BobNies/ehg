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
                    <h4>"each new stone is a new adventure, unfettered and
                      unattached to known form"</h4>
                    <p>My earliest sculptures were 3D realizations of my fairly
                      detailed drawings.  This approach led to developing a personal
                      language and evolved into a more direct process where I
                      entered into a dialogue with the stone with no preconceived
                      direction, only to speak this language through this rock.
                      This method is most akin to play- free-spirited exploring
                      form, wherever it leads; like a child digging tunnels or
                      building castles in the sand.  Beauty matters - classical
                      elements are significant components of this language - line,
                      curve, edge, proportion, negative space, texture…  How they
                      some to be in a new unique combination, that is my fun, my
                      joy.  On a good day, that joy is shared.</p>
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
              <div></div>
            )}
          </div>
        </Grid>
        <Footer />
      </div>
    );
  }
}

export default About;
