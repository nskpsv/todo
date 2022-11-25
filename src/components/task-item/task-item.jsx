import dayjs from "dayjs";

require("dayjs/locale/ru");

export const TaskItem = ({ task, id, onComplete, onEdit, onDelete }) => {
  if (!task) {
    return null;
  }

  const checkHandler = (handler) => {
    if (!handler) {
      throw new Error(`Не назначен обработчик!`);
    }
  };

  const completeHandler = (e) => {
    e.stopPropagation();
    checkHandler(onComplete);
    onComplete(id);
  };

  const editHandler = (e) => {
    e.stopPropagation();
    checkHandler(onEdit);
    onEdit(id);
  };

  const deleteHandler = (e) => {
    e.stopPropagation();
    checkHandler(onEdit);
    onDelete(id);
  }



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
        </p>
      </div>
      <div>
        <p>Прикреплённые файлы:</p>
        {task.attachedFiles}
      </div>
      <div>
        <button onClick={completeHandler}>Отметить как выполненную</button>
        <button onClick={editHandler}>Редактировать</button>
        <button onClick={deleteHandler}>Удалить</button>
      </div>
    </div>
  );
};
