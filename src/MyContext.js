import React, { Component } from 'react';
import { firebaseApp, instagramPostRef } from './firebase';

const MyContext = React.createContext();

export class Provider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      error: {
        message: ''
      },
      instagramPost: ''
    }
  }

  componentDidMount() {
    // Auth listener
    this.authSubscription = firebaseApp.auth().onAuthStateChanged(user => {
      this.setState({ user });
    })

    // Instagram post listener
    instagramPostRef.on('value', snapshot => {
      this.setState({ instagramPost: snapshot.val() });
      console.log('updated instagramPost to ', this.state.instagramPost);
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

  setIntagramPost = (newInstaPost) => {
    firebaseApp.database().ref('settings').set({ instagramPost: newInstaPost });
  }

  render() {
    return(
      <MyContext.Provider value={{
          user: this.state.user,
          logIn: this.logIn,
          logOut: this.logOut,
          error: this.state.error,
          instagramPost: this.state.instagramPost,
          setIntagramPost: this.setIntagramPost,
        }}>
        {this.props.children}
      </MyContext.Provider>
    )
  }
}

export const Consumer = MyContext.Consumer;
