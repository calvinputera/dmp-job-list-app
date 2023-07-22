// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyByxWKEmws8zCOHUuDJ86luDglnmqR-_l4",
  authDomain: "dmp-job-list.firebaseapp.com",
  projectId: "dmp-job-list",
  storageBucket: "dmp-job-list.appspot.com",
  messagingSenderId: 842839280824,
  appId: "842839280824:web:371ed62d52676342faf84d",
  measurementId: "G-ZJ9SWZNX7Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
