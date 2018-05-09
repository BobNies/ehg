import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { DropdownButton } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

class CustomNavBarDropdown extends Component {
  constructor(props) {
    super(props);

  }

  render () {
    return(
      <div>
        <DropdownButton
          bsStyle='link'
          title={this.props.title}
          key={this.props.dropKey}
          id={this.props.id}
        >
          {this.props.children}
        </DropdownButton>
      </div>
    );
  }
}

export default CustomNavBarDropdown;
