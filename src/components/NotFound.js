import React, { Component } from 'react'
import CustomNavBar from './CustomNavBar'
import Footer from './Footer'

class NotFound extends Component {
  render () {
    return(
      <div>
        <CustomNavBar />
        <div className='not-found'>
          <h1>404</h1>
          <h2>So, that just happened...</h2>
        </div>
        <Footer />
      </div>
    );
  }
}

export default NotFound;
