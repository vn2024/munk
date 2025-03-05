// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxqV9OHj7EXsmNvmrB_B4cXjo5CWAOE7A",
  authDomain: "munk-ee8a2.firebaseapp.com",
  projectId: "munk-ee8a2",
  storageBucket: "munk-ee8a2.firebasestorage.app",
  messagingSenderId: "743739191434",
  appId: "1:743739191434:web:0ddfa699fd029e96063d73"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Set persistence for Firebase Authentication (to preserve login state across reloads)
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Persistence set to local storage.");
  })
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });

export { auth, db };