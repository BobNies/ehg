import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Consumer } from '../MyContext'

class AdminShortcut extends Component {
  render() {
    return(
      <Consumer>
        {value => {
          const { user } = value;
          return user ? (
            <div className='admin-shortcut'>
              <Link to='/admin'><h1>ADMIN</h1></Link>
            </div>
          ) : (
            <div></div>
          )
        }}
      </Consumer>
    )
  }
}

export default AdminShortcut;
