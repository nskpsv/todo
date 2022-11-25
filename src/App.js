import { TaskList } from "./components/task-list/task-list";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { TaskEditor } from "./components/task-editor/task-editor";

export const App = () => {
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
  const db = getFirestore(app);

  const [todoList, setTodoList] = useState(undefined);
  const [mode, setMode] = useState('list');
  const [currentTask, setCurrentTask] = useState(undefined);
  const [title, setTitle] = useState('');

  useEffect(() => {
    getDocs(collection(db, "todos")).then((snapshot) => {
      const list = snapshot.docs.reduce((result, doc) => {
        result[doc.id] = doc.data();
        return result;
      }, {});
      setTodoList(list);
    });
  }, [db]);

  useEffect(() => {
   switch (mode) {
    case 'edit' : {
      setTitle(currentTask ? 'Редактирование задачи' : 'Добавление задачи');
      break;
    }
    default : {
      setTitle('Список задач');
    }
   }
  }, [mode])

  const completeTask = (id) => {

  };

  const editTask = (id) => {
    setCurrentTask(todoList[id]);
    setMode('edit');
  };
  
  const deleteTask = (id) => {

  };

  const saveTask = (task) => {
    console.log(task);
  };

  const cancel = () => {
    setMode('list');
  }

  return (
    <>
      <header>
        <h1>{title}</h1>
      </header>
      <main>
        {
          mode === 'list' && <TaskList list={todoList} onComplete={completeTask} onEdit={editTask} onDelete={deleteTask}/>
        }
        {
          mode === 'edit' && <TaskEditor task={currentTask} onSave={saveTask} onCancel={cancel} />
        }
        
      </main>
    </>
  );
};
