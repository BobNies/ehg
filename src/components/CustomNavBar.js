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
          <MenuItem eventKey='1'>Action 1</MenuItem>
          <MenuItem eventKey='2'>Action 2</MenuItem>
          <MenuItem eventKey='3'>Action 3</MenuItem>
        </CustomNavBarDropdown>
        <h1><Link to='/' className='ehg-navbar-title'>EUCALYPTUS HILLS GALLERY</Link></h1>
        <h2><Link to='/artists/michael-roser' className='ehg-navbar-link'>MICHAEL ROSER</Link></h2>
      </div>
    );
  }
}

export default CustomNavBar;
