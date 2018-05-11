import React, { Component } from 'react';
import Routes from './routes';
import { firebaseApp } from './firebase';
import { Provider } from './MyContext';

/* Master component.  Holds initial state variables. */
class App extends Component {
  render() {
    return (
      <Provider>
        <Routes />
      </Provider>
    )
  }
}

export default App;
