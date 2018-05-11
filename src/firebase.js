import * as firebase from 'firebase';

// Initialize Firebase
const config = {
  apiKey: "AIzaSyD1AUhGsFiuiejDq3ufsoH4AkojVagKT1g",
  authDomain: "eucalyptus-hills-gallery.firebaseapp.com",
  databaseURL: "https://eucalyptus-hills-gallery.firebaseio.com",
  projectId: "eucalyptus-hills-gallery",
  storageBucket: "eucalyptus-hills-gallery.appspot.com",
  messagingSenderId: "800221754296"
};

export const firebaseApp = firebase.initializeApp(config);
