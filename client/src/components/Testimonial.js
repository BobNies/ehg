import React, { Component } from 'react'

class Testimonial extends Component {
  render () {
    return (
      <div className='testimonial'>
        <p>&quot;{this.props.quote}&quot;</p>
        <h3>- {this.props.author}</h3>
      </div>
    )
  }
}

export default Testimonial;
