// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBeWKVCgNp3tiOy7EplFPmWC_rhP_KIrfY",
  authDomain: "code-samurai-project-24.firebaseapp.com",
  projectId: "code-samurai-project-24",
  storageBucket: "code-samurai-project-24.appspot.com",
  messagingSenderId: "317185214173",
  appId: "1:317185214173:web:539e27d92b4ebdd902fd34"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;