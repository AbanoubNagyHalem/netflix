import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCMgxVCseWWluiqBRnIASR8kT6Xv9XlRP4",
  authDomain: "netflix-295e9.firebaseapp.com",
  projectId: "netflix-295e9",
  storageBucket: "netflix-295e9.firebasestorage.app",
  messagingSenderId: "753964274606",
  appId: "1:753964274606:web:41810e73517788be9f2e3f",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

export { auth, db, login, signup, logout };
