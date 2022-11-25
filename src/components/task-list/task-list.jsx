import { TaskItem } from "../task-item/task-item";

export const TaskList = ({ list = null, ...other }) => {
  if (!list) {
    return (
      <div>
        <p>Нечего делать ¯\_(ツ)_/¯</p>
      </div>
    );
  }

  return (
    <div>
      <div>
        <button onClick={other.onEdit}>Добавить задачу</button>
      </div>
      {Object.keys(list).map((key) => {
        return (
          <TaskItem task={list[key]} id={key} key={key} {...other} />
        );
      })}
    </div>
  );
};
