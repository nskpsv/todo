import { TaskForm } from "../../components/form/task-form/task-form";
import { useEffect, useState } from "react";
import { addTask, getTask, updateTask } from "../../services/task-api";
import { taskStatus } from "../../constants/task-status";
import { history } from "../../utils/history";

export const getEmptyTask = () => {
  return {
    title: "",
    description: "",
    deadline: "",
    attachedFiles: [],
    status: taskStatus.IN_PROGRESS,
  };
};

export const TaskEditor = () => {
  const [taskId, setTaskId] = useState(window.location.pathname.replace('/edit/', ''));
  const [task, setTask] = useState(getEmptyTask());
  const [fetching, setFetching] = useState(true);

  const saveTaskHandler = async (task) => {
    if (taskId) {
      updateTask(taskId, task).then(() => {
        history.pushState('/');
      });
    } else {
      addTask(task).then((id) => {
        history.pushState('/');
      });
    }
  };

  const cancelHandler = () => {
    history.pushState('/');
  };

  useEffect(() => {
    if (taskId) {
      getTask(taskId).then((task) => {
        setTask(task);
        setFetching(false);
      });
    } else {
      setFetching(false);
    }
  }, []);

  if (fetching) {
    return (
      <header>
        <h1>Загрузка ... </h1>
      </header>
    );
  }

  return (
    <>
      <header>
        <h1>{task.title ? "Редактирование задачи" : "Добавление задачи"}</h1>
      </header>
      <main>
        <TaskForm
          task={task}
          taskId={taskId}
          onSave={saveTaskHandler}
          onCancel={cancelHandler}
        />
      </main>
    </>
  );
};
