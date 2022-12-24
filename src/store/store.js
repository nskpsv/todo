import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAHwWSlQr0PDox3CmaAet6HunaRf7GM_DM",
  authDomain: "todo-womanup-ddcca.firebaseapp.com",
  projectId: "todo-womanup-ddcca",
  storageBucket: "todo-womanup-ddcca.appspot.com",
  messagingSenderId: "471435611055",
  appId: "1:471435611055:web:a461df605360ff94753d5a",
  measurementId: "G-3B9E8Z7V24",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);