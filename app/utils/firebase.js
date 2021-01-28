import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "",
  authDomain: "tenedores-e9701.firebaseapp.com",
  projectId: "tenedores-e9701",
  storageBucket: "tenedores-e9701.appspot.com",
  messagingSenderId: "334055706559",
  appId: "",
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
