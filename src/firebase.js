import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCFDfHME_6JAatjn05OXfOyUuyuvMvapMU",
    authDomain: "robinhood-clone-8fecb.firebaseapp.com",
    projectId: "robinhood-clone-8fecb",
    storageBucket: "robinhood-clone-8fecb.appspot.com",
    messagingSenderId: "574289979845",
    appId: "1:574289979845:web:2fa4d04620f3a354a3c3ac"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();

  export default db