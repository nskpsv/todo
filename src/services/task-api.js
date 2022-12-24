import { db } from "../store/store";
import {
  doc,
  getDoc,
  setDoc,
  addDoc,
  deleteDoc,
  collection,
} from "firebase/firestore";

export const getTask = async (taskId) => {
  const taskRef = await getDoc(doc(db, "todos", taskId));

  return taskRef.data();
};

export const addTask = async (task) => {
  const taskRef = await addDoc(collection(db, "todos"), task);
  return taskRef.id;
};

export const updateTask = async (taskId, task) => {
  return await setDoc(doc(db, "todos", taskId), task);
};

export const deleteTask = async (taskId) => {
  await deleteDoc(doc(db, "todos", taskId));
  return true;
};
