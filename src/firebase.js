// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDL7scoj5nn91M_fIKaNlOl8It-U-8fhYk',
  authDomain: 'realtor-clone-ad86d.firebaseapp.com',
  projectId: 'realtor-clone-ad86d',
  storageBucket: 'realtor-clone-ad86d.appspot.com',
  messagingSenderId: '1073329737336',
  appId: '1:1073329737336:web:9c63f7df72ab093505278d',
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
