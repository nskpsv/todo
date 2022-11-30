import { TaskForm } from "../../components/form/task-form/task-form";
import { useEffect, useState } from "react";
import { addTask, getTask, updateTask } from "../../services/task-api";
import { getEmptyTask } from "../../components/task-item/task-item";

export const TaskEditor = () => {
  const history = window.history;
  const [taskId, setTaskId] = useState(history.state?.taskId);
  const [task, setTask] = useState(getEmptyTask());
  const [fetching, setFetching] = useState("true");

  const saveTaskHandler = async (task) => {
    console.log("save task");
    if (taskId) {
      console.log("save task if");
      updateTask(taskId, task).then(() => {
        history.back();
      });
    } else {
      console.log("save task else");
      addTask(task).then((id) => {
        setTaskId(id);
      });
    }
  };

  const cancelHandler = () => {
    history.back();
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
