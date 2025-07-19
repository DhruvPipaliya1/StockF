// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAeAAwDYXdg-qz-19fY1cAXUiuym0IZUFM",
  authDomain: "stock-260d0.firebaseapp.com",
  projectId: "stock-260d0",
  storageBucket: "stock-260d0.firebasestorage.app",
  messagingSenderId: "1029749498550",
  appId: "1:1029749498550:web:7cc94f1a1735bf58f87c17",
  measurementId: "G-08YBCS2WV2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
