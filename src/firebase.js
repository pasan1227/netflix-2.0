import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCoxjuY9VVL8HQG4g_cD1VsNyCjjdl0Qh4",
    authDomain: "netflix-2-0.firebaseapp.com",
    projectId: "netflix-2-0",
    storageBucket: "netflix-2-0.appspot.com",
    messagingSenderId: "492873726816",
    appId: "1:492873726816:web:b62247cb563fb660953c05"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export { auth };
  export default db;
