import React, { Component } from 'react';
import { firebaseApp, instagramPostRef } from './firebase';
import NotificationSystem from 'react-notification-system';

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

    this.notificationSystem = React.createRef();
  }

  componentDidMount() {
    // Auth listener
    this.authSubscription = firebaseApp.auth().onAuthStateChanged(user => {
      // If signed out
      if (user === null && this.state.user !== null) {
        this.produceNotification('Signed Out', 'Successfully', 'info');
        window.scrollTo(0, 0);
      }

      // If signed in
      if (user !== null && this.state.user === null) {
        this.produceNotification('Signed In', 'Successfully', 'success');
      }

      this.setState({ user });
    })

    // Instagram post listener
    instagramPostRef.on('value', snapshot => {
      this.setState({ instagramPost: snapshot.val() });
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

  produceNotification = (newTitle, newMessage, newLevel) => {
    this.notificationSystem.current.addNotification({
      title: newTitle,
      message: newMessage,
      level: newLevel
    });
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
          produceNotification: this.produceNotification,
          instagramPost: this.state.instagramPost,
          setIntagramPost: this.setIntagramPost,
        }}>
        <NotificationSystem ref={this.notificationSystem} />
        {this.props.children}
      </MyContext.Provider>
    )
  }
}

export const Consumer = MyContext.Consumer;
