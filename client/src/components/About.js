import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import Img from 'react-image'
import { firebaseApp } from '../firebase'
import CustomNavBar from './CustomNavBar'
import Footer from './Footer'
import AdminShortcut from './AdminShortcut'
import Testimonial from './Testimonial'
import MichaelRoserImg from '../images/artist-portrait-michael-roser.JPG'
import FredBriscoeImg from '../images/artist-portrait-fred-briscoe.JPG'
import { BeatLoader } from 'react-spinners'

class About extends Component {

  constructor(props) {
    super(props);

    this.state = {
      artistName: this.props.match.params.artistName,
      testimonials: [],
      testimonialsArray: []
    };
  }

  componentDidMount() {
    this.updateTestimonials();
    window.scrollTo(0, 0);
  }

  componentWillUpdate(nextProps, nextState) {
    // Update state to sync with router changes
    if (nextProps.match.params.artistName !== this.state.artistName) {
      this.setState({ artistName: nextProps.match.params.artistName });
      this.updateTestimonials();
    }
  }

  updateTestimonials = () => {
    firebaseApp.database().ref('testimonials').once('value').then((snapshot) => {
      if (snapshot.val() !== null) {
        this.setState({ testimonials: snapshot.val() });

        const testimonials = this.state.testimonials;
        let newTestimonials = [];

        if (testimonials != null) {
          Object.keys(testimonials).map((testimonial, index) => {
            const { artist, quote, author, authorDetails } = testimonials[testimonial];
            newTestimonials.push([artist, quote, author, authorDetails, testimonial]);
          })
        }

        this.setState({ testimonialsArray: newTestimonials });
      }
    })
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
                    <p>Michael Roser is an accomplished Fine Artist, Photographer
                      & Designer residing in Lakeside, CA.  He graduated from the
                      Art Institute of Pittsburgh specializing in Graphic Design
                      for Print & Publication.  He has won multiple first place
                      and best in show awards in art shows all over the country
                      for his fine art, photography and abstract paintings as well
                      as being chosen to be the principal artist for the independent
                      film Pitching Tents. You can see Michael, and more of his
                      work, at his studio by visiting Eucalyptus Hills Gallery.</p>
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
            <Row className='testimonial-section'>
              <h2>TESTIMONIALS</h2>
              <Col xs={12} md={4} className='testimonial-col'>
                {
                  this.state.testimonialsArray.map((testimonial, index) => {
                    if (testimonial[0] === this.state.artistName && index === 0) {
                      return (
                        <Testimonial
                          key={index}
                          artist={testimonial[0]}
                          quote={testimonial[1]}
                          author={testimonial[2]}
                          authorDetails={testimonial[3]}
                          testimonialKey={testimonial[4]}
                          />
                      )
                    } else {
                      return <div key={index}></div>;
                    }
                  })
                }
              </Col>
              <Col xs={12} md={4} className='testimonial-col'>
                {
                  this.state.testimonialsArray.map((testimonial, index) => {
                    if (testimonial[0] === this.state.artistName && index === 1) {
                      return (
                        <Testimonial
                          key={index}
                          artist={testimonial[0]}
                          quote={testimonial[1]}
                          author={testimonial[2]}
                          authorDetails={testimonial[3]}
                          testimonialKey={testimonial[4]}
                          />
                      )
                    } else {
                      return <div key={index}></div>;
                    }
                  })
                }
              </Col>
              <Col xs={12} md={4} className='testimonial-col'>
                {
                  this.state.testimonialsArray.map((testimonial, index) => {
                    if (testimonial[0] === this.state.artistName && index === 2) {
                      return (
                        <Testimonial
                          key={index}
                          artist={testimonial[0]}
                          quote={testimonial[1]}
                          author={testimonial[2]}
                          authorDetails={testimonial[3]}
                          testimonialKey={testimonial[4]}
                          />
                      )
                    } else {
                      return <div key={index}></div>;
                    }
                  })
                }
              </Col>
            </Row>
          </div>
        </Grid>
        <Footer />
      </div>
    );
  }
}

export default About;
