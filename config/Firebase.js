import firebase from 'firebase'
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA7ZN2oqTV7Ir92lh5Uj8Y2kJnrAMj4Kb4",
    authDomain: "contactappreactnative-7a988.firebaseapp.com",
    projectId: "contactappreactnative-7a988",
    storageBucket: "contactappreactnative-7a988.appspot.com",
    messagingSenderId: "37160485119",
    appId: "1:37160485119:web:e9b636ba2568e8dcbdccca",
    measurementId: "G-T8CH6J5FWB"
  };

export const firebaseApp = firebase.initializeApp(firebaseConfig);
//  export const fireStore = firebaseApp.fireStore()
//  export const authentication = firebaseApp.auth()
