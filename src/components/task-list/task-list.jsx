import { TaskItem } from "../task-item/task-item";

export const TaskList = ({ list = null, fetching, onAddTask, ...other }) => {
  const addHandler = (event) => {
    event.stopPropagation();
    onAddTask();
  };

  if (!list) {
    return (
      <div>
        {fetching && !list ? (
          <h1>Загрузка ...</h1>
        ) : (
          <p>Нечего делать ¯\_(ツ)_/¯</p>
        )}
      </div>
    );
  }

  return (
    <div>
      <div>
        <button onClick={addHandler}>Добавить задачу</button>
      </div>
      {Object.keys(list || {}).map((key) => {
        return <TaskItem task={list[key]} id={key} key={key} {...other} />;
      })}
    </div>
  );
};
