import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

// Firebase Configuration (Directly in Code)
const firebaseConfig = {
  apiKey: "AIzaSyCMgxVCseWWluiqBRnIASR8kT6Xv9XlRP4",
  authDomain: "netflix-295e9.firebaseapp.com",
  projectId: "netflix-295e9",
  storageBucket: "netflix-295e9.firebasestorage.app",
  messagingSenderId: "753964274606",
  appId: "1:753964274606:web:41810e73517788be9f2e3f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Error Handling Function
const handleError = (error) => {
  toast.error(error.code.split("/")[1].split("-").join(" "));
};

// Signup Function
const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    // Save user data to Firestore
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    handleError(error);
  }
};

// Login Function
const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    handleError(error);
  }
};

// Logout Function
const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    handleError(error);
  }
};

// Export Firebase services
export { auth, db, login, signup, logout };
