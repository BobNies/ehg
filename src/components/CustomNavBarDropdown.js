import React, { Component } from 'react'
import { DropdownButton } from 'react-bootstrap'

class CustomNavBarDropdown extends Component {
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
