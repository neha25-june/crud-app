import { FirebaseError, initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// import * as firebase from 'firebase/app';
import firebase from 'firebase/compat/app';
import "firebase/compat/database";

const firebaseConfig = {
    apiKey: "AIzaSyCdk6_BFlSsbkR9C2IrRvSXILycH97zphY",
    authDomain: "crud-app-3aed1.firebaseapp.com",
    projectId: "crud-app-3aed1",
    storageBucket: "crud-app-3aed1.appspot.com",
    messagingSenderId: "371374423034",
    appId: "1:371374423034:web:11324f2d82403796a70243"
  };

  const app = initializeApp(firebaseConfig);

  export const storage = getStorage(app)
  export const db = getFirestore(app);
//   export auth = getAuth(app);
export const auth = getAuth(app);
  export default firebase;
