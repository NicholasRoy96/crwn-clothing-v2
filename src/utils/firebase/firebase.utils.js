import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDr-iVzw-3gIywKPzoDv1l9sER1iCLR6y4",
  authDomain: "crwn-clothing-db-23ab6.firebaseapp.com",
  projectId: "crwn-clothing-db-23ab6",
  storageBucket: "crwn-clothing-db-23ab6.appspot.com",
  messagingSenderId: "522161347058",
  appId: "1:522161347058:web:03e077e85c1bbbc34e336b"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  console.log(userAuth);
};

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore()

export const createUserDocumentFromAuth = async(userAuth, additionalInformation) => {
  if (!userAuth) return
  const userDocRef = doc(db, 'users', userAuth.uid)
  const userSnapshot = await getDoc(userDocRef)

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      })
    } catch (e) {
      console.error(e)
    }
  } 
  return userDocRef
}

export const createAuthUserWithEmailAndPassword = async(email, password) => {
  if (!email || ! password) return
  const response = await createUserWithEmailAndPassword(auth, email, password)
  return response
}