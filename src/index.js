import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import WebFont from 'webfontloader';
import { firebaseApp } from './firebase';

/*
firebaseApp.auth().onAuthStateChanged(user => {
  if (user) {
    console.log('currently logged in');
  } else {
    console.log('signed out');
  }
})
*/

WebFont.load({
  google: {
    families: ['Roboto:300,400,500', 'sans-serif']
  }
});

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
