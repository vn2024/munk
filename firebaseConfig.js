import { initializeApp } from "firebase/app";
import { 
  initializeAuth, 
  getAuth, 
  setPersistence, 
  browserLocalPersistence,
  getReactNativePersistence 
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxqV9OHj7EXsmNvmrB_B4cXjo5CWAOE7A",
  authDomain: "munk-ee8a2.firebaseapp.com",
  projectId: "munk-ee8a2",
  storageBucket: "munk-ee8a2.firebasestorage.app",
  messagingSenderId: "743739191434",
  appId: "1:743739191434:web:0ddfa699fd029e96063d73"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Create auth instance with platform-specific persistence
const auth = Platform.OS === 'web' 
  ? getAuth(app)  // Use web persistence for web
  : initializeAuth(app, {  // Use AsyncStorage for mobile
    persistence: getReactNativePersistence(AsyncStorage)
  });

// Set persistence for web (this won't affect mobile)
if (Platform.OS === 'web') {
  setPersistence(auth, browserLocalPersistence)
    .then(() => {
      console.log("Web persistence set to local storage.");
    })
    .catch((error) => {
      console.error("Error setting web persistence:", error);
    });
}

// Initialize Firestore
const db = getFirestore(app);

export { app, auth, db };