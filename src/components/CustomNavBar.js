import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class CustomNavBar extends Component {
  render () {
    return(
      <div className="navbar">
        <h2><Link to='/artists/fred-briscoe' className='navbar-link'>FRED BRISCOE</Link></h2>
        <h1><Link to='/' className='navbar-title'>EUCALYPTUS HILLS GALLERY</Link></h1>
        <h2><Link to='/artists/mike-roser' className='navbar-link'>MIKE ROSER</Link></h2>
      </div>
    );
  }
}

export default CustomNavBar;
