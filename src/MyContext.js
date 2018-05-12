import React, { Component } from 'react';
import { firebaseApp } from './firebase';

const MyContext = React.createContext();

export class Provider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      error: {
        message: ''
      }
    }
  }

  componentDidMount() {
    // Firebase auth listener
    this.authSubscription = firebaseApp.auth().onAuthStateChanged(user => {
      this.setState({ user });
    })
  }

  componentWillUnmount() {
    // Decactivate Firebase auth listener on unmount
    this.authSubscription();
  }

  logIn = (email, password) => {
    firebaseApp.auth().signInWithEmailAndPassword(email, password)
      .catch(error => {
        this.setState({error});
      })
    this.setState({ user: email });
  }

  logOut = () => {
    firebaseApp.auth().signOut();
    this.setState({ user: null });
  }

  render() {
    return(
      <MyContext.Provider value={{
          user: this.state.user,
          logIn: this.logIn,
          logOut: this.logOut,
          error: this.state.error,
        }}>
        {this.props.children}
      </MyContext.Provider>
    )
  }
}

export const Consumer = MyContext.Consumer;
