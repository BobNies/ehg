import React, { Component } from 'react'
import { Consumer } from '../MyContext'
import { firebaseApp } from '../firebase'
import { Redirect } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Grid, Row, Col, Button, FormControl } from 'react-bootstrap'
import CustomNavBar from './CustomNavBar'
import Footer from './Footer'

class AdminPanel extends Component {
  render () {
    return (
      <Consumer>
        {value => {
          const { user, logOut } = value;
          return user ? (
            <div>
              <CustomNavBar />
              <h1>ADMIN PANEL</h1>
              <Footer />
            </div>
          ) : (
            <Redirect to='/' />
          )
        }}
      </Consumer>
    )
  }
}

export default AdminPanel;
