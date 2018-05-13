import React, { Component } from 'react'
import { Consumer } from '../MyContext'

class GalleryItemPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timestamp: this.props.match.params.timestamp
    };
  }

  componentWillUpdate(nextProps, nextState) {
    // Update state to sync with router changes
    if (nextProps.match.params.timestamp !== this.state.timestamp) {
      this.setState({ timestamp: nextProps.match.params.timestamp });
    }
  }

  render () {
    return (
      <Consumer>
        {value => {
          const { user } = value;
          return (
            <div>gallery item page.  timestamp is {this.state.timestamp}</div>
          )
        }}
      </Consumer>
    )
  }
}

export default GalleryItemPage;
