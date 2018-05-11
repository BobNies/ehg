import React, { Component } from 'react';
import { firebaseApp } from './firebase';

const MyContext = React.createContext();

export class Provider extends Component {
  state = {
    user: null,
    error: {
      message: ''
    }
  }

  logIn = (email, password) => {
    console.log('Provider: Attempting to log in.');
    firebaseApp.auth().signInWithEmailAndPassword(email, password)
      .catch(error => {
        this.setState({error});
      })
    this.setState({ user: email });
  }

  logOut = () => {
    console.log('Provider: User wants to log out.');
    firebaseApp.auth().signOut();
    this.setState({ user: null });
  }

  render() {
    return(
      <MyContext.Provider value={{
          user: this.state.user,
          logIn: this.logIn,
          logOut: this.logOut,
        }}>
        {this.props.children}
      </MyContext.Provider>
    )
  }
}

export const Consumer = MyContext.Consumer;
