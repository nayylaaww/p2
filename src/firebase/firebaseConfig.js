import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { doc, getFirestore, updateDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyATZ_Oj-0WBImrDoI4w2y_ok-J0VF5DUKE",
  authDomain: "algorithmics-universe.firebaseapp.com",
  projectId: "algorithmics-universe",
  storageBucket: "algorithmics-universe.appspot.com", // ← ✅ ini yang benar
  messagingSenderId: "982328538573",
  appId: "1:982328538573:web:d9c4f892a82540d1ef0084"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app); 
export default app;

window.auth = auth;
window.db = db;
window.doc = doc;
window.updateDoc = updateDoc;