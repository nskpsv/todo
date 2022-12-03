import React from 'react';
import dayjs from "dayjs";
import { taskStatus } from '../../constants/task-status';

export const TaskItem = React.memo(({
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
              <a href={file.url} target="_blank">{file.name}</a>
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
});
