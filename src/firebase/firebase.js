// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_URI_API_KEY,
  authDomain: process.env.REACT_APP_URI_AUTH_DOMAIN,
  databaseURL: "https://fastmeal-ce4ef-default-rtdb.firebaseio.com",
  projectId: "fastmeal-ce4ef",
  storageBucket: process.env.REACT_APP_URI_STORAGE_BUCKET,
  messagingSenderId: "846433828276",
  appId: process.env.REACT_APP_URI_APP_ID,
  measurementId: "G-F2KSX7BL0W"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const analytics = getAnalytics(firebaseApp);