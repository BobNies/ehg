import React, { Component } from 'react';
import Routes from './routes';
import { Provider } from './MyContext';
import HttpsRedirect from 'react-https-redirect';

/* Master component.  Holds initial state variables. */
class App extends Component {
  render() {
    return (
      <Provider>
        <HttpsRedirect>
          <Routes />
        </HttpsRedirect>
      </Provider>
    )
  }
}

export default App;
