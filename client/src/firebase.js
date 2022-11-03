// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyD2c4h_iOt4jQFKJYp1ZpVr3xIzanz6B4g',
  authDomain: 'clone-8957d.firebaseapp.com',
  projectId: 'clone-8957d',
  storageBucket: 'clone-8957d.appspot.com',
  messagingSenderId: '252220715661',
  appId: '1:252220715661:web:f7e72d0306932d9b7e28c4',
  measurementId: 'G-B9K453TPZB',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export default app;
