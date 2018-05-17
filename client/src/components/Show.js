import React, { Component } from 'react'
import { Consumer } from '../MyContext'
import { firebaseApp } from '../firebase'
import Img from 'react-image'
import { Link } from 'react-router-dom'

class Show extends Component {

  constructor(props) {
    super(props);

    this.state = {
      imageSrc: ''
    };
  }

  componentDidMount() {
    const storageRef = firebaseApp.storage().ref('');
    storageRef.child(this.props.imagePath).getDownloadURL().then((url) => {
      this.setState({ imageSrc: url });
    })
  }

  render () {
    return(
      <Consumer>
        {value => {
          return (
            <div className='show'>
              <Link to={'shows/' + this.props.showKey}>
                <Img src={this.state.imageSrc} />
              </Link>
            </div>
          )
        }}
      </Consumer>
    );
  }
}

export default Show;
