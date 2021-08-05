// For Firebase JS SDK v7.20.0 and later, measurementId is 

import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCW91_WzQZegE1cwfP-He_pe7AXHOQc7ro",
    authDomain: "clone-efe1a.firebaseapp.com",
    databaseURL: "https://clone-efe1a-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "clone-efe1a",
    storageBucket: "clone-efe1a.appspot.com",
    messagingSenderId: "340237787120",
    appId: "1:340237787120:web:611e7637ef5b397e09c735",
    measurementId: "G-Q15DKHSXYV"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const auth = firebase.auth();

  export {db , auth}
