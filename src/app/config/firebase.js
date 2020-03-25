import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCl9xbg47bhRGBu4J6D6GCVPpVbtf9zpVE",
  authDomain: "revents-ef74b.firebaseapp.com",
  databaseURL: "https://revents-ef74b.firebaseio.com",
  projectId: "revents-ef74b",
  storageBucket: "revents-ef74b.appspot.com",
  messagingSenderId: "1095157830543",
  appId: "1:1095157830543:web:952556f92974a8d6dc71fa"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

// this is different from getFirestore mathod

export default firebase;
