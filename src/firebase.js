// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBTQqST51xFJ0xp-jBQGKFbsevLsa9b_oA",
  authDomain: "challenge-7a56c.firebaseapp.com",
  projectId: "challenge-7a56c",
  storageBucket: "challenge-7a56c.appspot.com",
  messagingSenderId: "118336993141",
  appId: "1:118336993141:web:2b31dbaa1a3cbd2697853c",
  measurementId: "G-S7E5SHE2RR",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
