import { initializeApp } from 'firebase/app';
import {
     getAuth, 
     signInWithRedirect, 
     signInWithPopup, 
     GoogleAuthProvider } from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB3OZkeg0Dkqrpx4L3f_y8NVr77MMSIXIU",
    authDomain: "crwn-clothing-db-833ae.firebaseapp.com",
    projectId: "crwn-clothing-db-833ae",
    storageBucket: "crwn-clothing-db-833ae.appspot.com",
    messagingSenderId: "1055039658204",
    appId: "1:1055039658204:web:45b17706020b4d408bfc19"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

  export const db = getFirestore();
  export const createUserDocumentFromAuth = async(userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);

    // check if user data exists

    // if true then userDocRef
    // if false then create/set document with data from userAuth in my collection

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;
  }
