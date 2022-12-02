import dayjs from "dayjs";

require("dayjs/locale/ru");

export const taskStatus = {
  IN_PROGRESS: "in progress",
  EXPIRED: "expired",
  COMPLETED: "completed",
};

export const getEmptyTask = () => {
  return {
    title: "",
    description: "",
    deadline: "",
    attachedFiles: [],
    status: taskStatus.IN_PROGRESS,
  };
};

export const TaskItem = ({
  task,
  id,
  onCompleteTask,
  onEditTask,
  onDeleteTask,
}) => {
  if (!task) {
    return null;
  }

  const completeHandler = () => {
    onCompleteTask(id);
  };

  const editHandler = () => {
    onEditTask(id);
  };

  const deleteHandler = () => {
    onDeleteTask(id);
  };

  return (
    <div>
      <div>
        <h2>{task.title}</h2>
      </div>
      <div>
        <p>{task.description}</p>
      </div>
      <div>
        <p>
          <span>Сделать до: </span>
          {dayjs(task.deadline).locale("ru").format("DD MMMM YYYY г.")}
          {task.status === taskStatus.EXPIRED && (
            <span style={{ color: "red" }}> Просрочена</span>
          )}
          {task.status === taskStatus.COMPLETED && (
            <span style={{ color: "green" }}> Выполнена</span>
          )}
        </p>
      </div>
      {task.attachedFiles.length ? (
        <div>
          <p>Прикреплённые файлы:</p>
          {task.attachedFiles.map((file, index) => (
            <div key={index}>
              <a href={file.url}>{file.name}</a>
            </div>
          ))}
        </div>
      ) : null}
      <div>
        <button
          onClick={completeHandler}
          disabled={
            task.status === taskStatus.COMPLETED ||
            task.status === taskStatus.EXPIRED
          }
        >
          Отметить как выполненную
        </button>
        <button
          onClick={editHandler}
          disabled={task.status === taskStatus.COMPLETED}
        >
          Редактировать
        </button>
        <button onClick={deleteHandler}>Удалить</button>
      </div>
      <hr />
    </div>
  );
};
