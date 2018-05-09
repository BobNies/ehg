import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import CustomNavBar from './CustomNavBar'

class Home extends Component {
  render () {
    return(
      <div>
        <CustomNavBar/>
      </div>
    );
  }
}

export default Home;
