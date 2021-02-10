import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyC98D-CCLYi9y9zqFRdYmtvwHbGkfmKDTk",
    authDomain: "netflix-stripe-6c131.firebaseapp.com",
    projectId: "netflix-stripe-6c131",
    storageBucket: "netflix-stripe-6c131.appspot.com",
    messagingSenderId: "153634318083",
    appId: "1:153634318083:web:ad02065f543495f046eb36",
    measurementId: "G-1LNSZHH35S"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export { auth };
  export default db;