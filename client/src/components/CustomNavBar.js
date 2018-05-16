import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import CustomNavBarDropdown from './CustomNavBarDropdown'
import { MenuItem, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import MediaQuery from 'react-responsive';

class CustomNavBar extends Component {
  render () {
    return(
      <div>
        <MediaQuery query="(min-width: 1224px)">

          <div className='ehg-navbar'>
            <CustomNavBarDropdown title='FRED BRISCOE' dropKey={1} id='dropdown-1'>
              <LinkContainer to='/artists/fred-briscoe/gallery'><MenuItem eventKey='1'>GALLERY</MenuItem></LinkContainer>
              <LinkContainer to='/artists/fred-briscoe/about'><MenuItem eventKey='2'>ABOUT</MenuItem></LinkContainer>
              <LinkContainer to='/artists/fred-briscoe/contact'><MenuItem eventKey='3'>CONTACT</MenuItem></LinkContainer>
            </CustomNavBarDropdown>
            <h1><Link to='/' className='ehg-navbar-title'>EUCALYPTUS HILLS GALLERY</Link></h1>
            <CustomNavBarDropdown title='MICHAEL ROSER' dropKey={2} id='dropdown-2'>
              <LinkContainer to='/artists/michael-roser/gallery'><MenuItem eventKey='1'>GALLERY</MenuItem></LinkContainer>
              <LinkContainer to='/artists/michael-roser/about'><MenuItem eventKey='2'>ABOUT</MenuItem></LinkContainer>
              <LinkContainer to='/artists/michael-roser/contact'><MenuItem eventKey='3'>CONTACT</MenuItem></LinkContainer>
            </CustomNavBarDropdown>
          </div>

        </MediaQuery>
        <MediaQuery query="(max-width: 1224px)">

          <Navbar collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to='/'>EUCALYPTUS HILLS GALLERY</Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <NavDropdown eventKey={1} title="MICHAEL ROSER" id="basic-nav-dropdown">
                  <LinkContainer to='/artists/michael-roser/gallery'><MenuItem eventKey={1.1}>GALLERY</MenuItem></LinkContainer>
                  <LinkContainer to='/artists/michael-roser/about'><MenuItem eventKey={1.2}>ABOUT</MenuItem></LinkContainer>
                  <LinkContainer to='/artists/michael-roser/contact'><MenuItem eventKey={1.3}>CONTACT</MenuItem></LinkContainer>
                </NavDropdown>
                <NavDropdown eventKey={2} title="FRED BRISCOE" id="basic-nav-dropdown">
                  <LinkContainer to='/artists/fred-briscoe/gallery'><MenuItem eventKey={2.1}>GALLERY</MenuItem></LinkContainer>
                  <LinkContainer to='/artists/fred-briscoe/about'><MenuItem eventKey={2.2}>ABOUT</MenuItem></LinkContainer>
                  <LinkContainer to='/artists/fred-briscoe/contact'><MenuItem eventKey={2.3}>CONTACT</MenuItem></LinkContainer>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

        </MediaQuery>
      </div>
    );
  }
}

export default CustomNavBar;
