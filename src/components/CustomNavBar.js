import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import CustomNavBarDropdown from './CustomNavBarDropdown'
import { MenuItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

class CustomNavBar extends Component {
  constructor(props) {
    super(props);

  }

  render () {
    return(
      <div className='ehg-navbar'>
        {/* <h2><Link to='/artists/fred-briscoe' className='ehg-navbar-link'>FRED BRISCOE</Link></h2> */}
        <CustomNavBarDropdown title='FRED BRISCOE' key={1} id='dropdown-1'>
          <LinkContainer to='/artists/fred-briscoe/gallery'><MenuItem eventKey='1'>GALLERY</MenuItem></LinkContainer>
          <LinkContainer to='/artists/fred-briscoe/about'><MenuItem eventKey='2'>ABOUT</MenuItem></LinkContainer>
          <LinkContainer to='/artists/fred-briscoe/contact'><MenuItem eventKey='3'>CONTACT</MenuItem></LinkContainer>
        </CustomNavBarDropdown>
        <h1><Link to='/' className='ehg-navbar-title'>EUCALYPTUS HILLS GALLERY</Link></h1>
        {/* <h2><Link to='/artists/michael-roser' className='ehg-navbar-link'>MICHAEL ROSER</Link></h2> */}
        <CustomNavBarDropdown title='MICHAEL ROSER' key={2} id='dropdown-2'>
          <LinkContainer to='/artists/michael-roser/gallery'><MenuItem eventKey='1'>GALLERY</MenuItem></LinkContainer>
          <LinkContainer to='/artists/michael-roser/about'><MenuItem eventKey='2'>ABOUT</MenuItem></LinkContainer>
          <LinkContainer to='/artists/michael-roser/contact'><MenuItem eventKey='3'>CONTACT</MenuItem></LinkContainer>
        </CustomNavBarDropdown>
      </div>
    );
  }
}

export default CustomNavBar;
