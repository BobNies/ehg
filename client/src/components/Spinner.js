import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BounceLoader } from 'react-spinners'

class Spinner extends Component {
  render () {
    return(
      <div className='custom-spinner'>
        <BounceLoader
          color={'#c7a891'}
          loading={true}
        />
      </div>
    )
  }
}

export default Spinner;
