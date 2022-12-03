import dayjs from "dayjs";
import { db } from "../../store/store";
import {
  getDocs,
  deleteDoc,
  collection,
  doc,
  setDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { taskStatus } from "../../constants/task-status";
import { TaskList } from "../../components/task-list/task-list";
import { history } from "../../utils/history";

export const Index = () => {
  const [todoList, setTodoList] = useState(undefined);
  const [fetching, setFetching] = useState(false);

  const editHandler = (id) => {
    history.pushState(null, null, `/edit/${id}`);
  };

  const addHandler = () => {
    history.pushState(null, null, `/edit/new-task`);
  };

  const deleteHandler = async (id) => {
    const clone = { ...todoList };

    setFetching(true);

    try {
      await deleteDoc(doc(db, "todos", id));
      // кетч нужно добавить на все действия
    } catch (error) {
      setFetching(false);

      return;
    }

    delete clone[id];
    setTodoList(clone);
    setFetching(false);
  };

  const handleComplite = async (id) => {
    const clone = { ...todoList };

    setFetching(true);

    clone[id] = {
      ...clone[id],
      status: taskStatus.COMPLETED,
    };

    await setDoc(doc(db, "todos", id), clone[id]);

    setTodoList(clone);
    setFetching(false);
  };

  useEffect(() => {
    setFetching(true);

    getDocs(collection(db, "todos")).then((snapshot) => {
      const list = snapshot.docs.reduce((result, document) => {
        const id = document.id;
        result[id] = document.data();

        if (
          result[id].status === taskStatus.IN_PROGRESS &&
          dayjs(dayjs().format("YYYY-MM-DD")).isAfter(result[id].deadline)
        ) {
          result[id].status = taskStatus.EXPIRED;
        }

        return result;
      }, {});

      setTodoList(list);
      setFetching(false);
    });
  }, []);

  return (
    <>
      <header>
        <h1>Список задач</h1>
      </header>
      <main>
        <TaskList
          list={todoList}
          fetching={fetching}
          onAddTask={addHandler}
          onCompleteTask={handleComplite}
          onEditTask={editHandler}
          onDeleteTask={deleteHandler}
        />
      </main>
    </>
  );
};

/*
Загрузка файлов с привязкой к id задачи
отмена создания экземпляра задачи на сервере при уходе из редатора разными способами

*/
