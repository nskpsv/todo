import { TaskForm } from "../form/task-form/task-form";

export const TaskEditor = (props) => {
  return (
    <div>
      <TaskForm {...props} />
    </div>
  );
};
