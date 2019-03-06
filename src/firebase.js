import * as firebase from "firebase";
import firestore from "firebase/firestore";
// Initialize Firebase
var config = {
  apiKey: "AIzaSyDv7SpYLcgskQqiH3wYJU7OCEnmIeVNLto",
  authDomain: "dashboard-codefast.firebaseapp.com",
  databaseURL: "https://dashboard-codefast.firebaseio.com",
  projectId: "dashboard-codefast",
  storageBucket: "dashboard-codefast.appspot.com",
  messagingSenderId: "38082868935"
};
var app = firebase.initializeApp(config);
export default firebase;
