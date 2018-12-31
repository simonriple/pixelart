import firebase from 'firebase';
require('firebase/firestore')


var config = {
    apiKey: "AIzaSyDlnpkGSX_DG_3OGVL7jVEu0zsnW_24uOk",
    authDomain: "pixels-1de67.firebaseapp.com",
    databaseURL: "https://pixels-1de67.firebaseio.com",
    projectId: "pixels-1de67",
    storageBucket: "pixels-1de67.appspot.com",
    messagingSenderId: "723390267144"
  };

const firebaseApp = firebase.initializeApp(config);
var db = firebase.firestore();

// Disable deprecated features
db.settings({
  timestampsInSnapshots: true
});

export default db;
