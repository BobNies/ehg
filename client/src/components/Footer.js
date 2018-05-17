import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Grid, Row, Col } from 'react-bootstrap'
import { Consumer } from '../MyContext'

class Footer extends Component {
  render () {
    return(
      <Consumer>
        {value => {
          const { user } = value;
          return (
            <Grid fluid>
              <Row className='footer'>
                <Col xs={12} md={6}>
                  <h1 className='noselect'>EUCALYPTUS HILLS GALLERY</h1>
                  <p>11240 MANZANITA RD</p>
                  <p>LAKESIDE, CA 92040</p>
                  <p>ehg11240@gmail.com</p>
                  <p>858-245-6799</p>
                </Col>
                <Col xs={12} md={6}>
                  <Col xs={12} md={6}>
                    <h2 className='noselect'>ARTISTS</h2>
                    <h3>MICHAEL ROSER</h3>
                    <Link to='/artists/michael-roser/gallery'><h4>GALLERY</h4></Link>
                    <Link to='/artists/michael-roser/about'><h4>ABOUT</h4></Link>
                    <Link to='/artists/michael-roser/contact'><h4>CONTACT</h4></Link>
                    <h3>FRED BRISCOE</h3>
                    <Link to='/artists/fred-briscoe/gallery'><h4>GALLERY</h4></Link>
                    <Link to='/artists/fred-briscoe/about'><h4>ABOUT</h4></Link>
                    <Link to='/artists/fred-briscoe/contact'><h4>CONTACT</h4></Link>
                    <Link to='/shows'><h4 className='footer-link-shows'>SHOWS COLLECTION</h4></Link>
                  </Col>
                  <Col xs={12} md={6}>
                    {user ? (
                      <Link to='/signout'><h4 className='admin-link'>SIGN OUT</h4></Link>
                    ) : (
                      <Link to='/login'><h4 className='admin-link'>ADMIN</h4></Link>
                    )}
                  </Col>
                </Col>
              </Row>
            </Grid>
          )
        }}
      </Consumer>
    );
  }
}

export default Footer;
