import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app';
import { initializeApp } from "firebase/app";

const root = ReactDOM.createRoot(document.getElementById('root'));

const firebaseConfig = {
  apiKey: "AIzaSyAHwWSlQr0PDox3CmaAet6HunaRf7GM_DM",
  authDomain: "todo-womanup-ddcca.firebaseapp.com",
  projectId: "todo-womanup-ddcca",
  storageBucket: "todo-womanup-ddcca.appspot.com",
  messagingSenderId: "471435611055",
  appId: "1:471435611055:web:a461df605360ff94753d5a",
  measurementId: "G-3B9E8Z7V24"
};

initializeApp(firebaseConfig);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
