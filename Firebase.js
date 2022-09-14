// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps} from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnZNepe05fZJkUJUemX6JIuYlqd-ppVrQ",
  authDomain: "instagram-clone-6986c.firebaseapp.com",
  projectId: "instagram-clone-6986c",
  storageBucket: "instagram-clone-6986c.appspot.com",
  messagingSenderId: "268309366600",
  appId: "1:268309366600:web:cf48be070cccc26b58157d"
};



// Initialize Firebase
const App = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export {App, db, storage}