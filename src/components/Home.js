import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import CustomNavBar from './CustomNavBar'
import Img from 'react-image'

class Home extends Component {
  render () {
    return(
      <div>
        <CustomNavBar/>
        <div className='home-img-1-crop'>
          <Img className='home-img-1' src='example-photo-3.jpeg'/>
        </div>
        <h2 className='home-title-1'>A collective gallery of mixed media art.</h2>
      </div>
    );
  }
}

export default Home;
