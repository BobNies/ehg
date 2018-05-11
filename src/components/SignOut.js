import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Consumer } from '../MyContext'
import { firebaseApp } from '../firebase'

class SignOut extends Component {
  componentDidMount() {
    // Sign out when going to this route
    firebaseApp.auth().signOut();
  }

  render () {
    return(
      <Consumer>
        {value => {
          const { user } = value;
          return user ? (
            <div>
              <Redirect to='/' />
            </div>
          ) : (
            <div>
              <Redirect to='/' />
            </div>
          )
        }}
      </Consumer>
    );
  }
}

export default SignOut;
