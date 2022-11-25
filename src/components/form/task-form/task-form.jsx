import { useState } from "react";
import { FormField } from "../form-field/form-field";

const emptyTask = {
  title: "",
  description: "",
  deadline: "",
  attachedFiles: [],
  status: "",
};

export const TaskForm = ({ task = emptyTask, onSave, onCancel }) => {
  const [state, setState] = useState(task);
  const fieldChangeHandler = ({ target: { name, value } }) => {
    setState(Object.assign({}, state, { [name]: value }));
  };

  const attachHandler = () => {};

  const submitHandler = (e) => {
    e.preventDefault();
    onSave(state);
  };

  const cancelHandler = (e) => {
    e.preventDefault();
    onCancel();
  };

  return (
    <form name="edit_todo" onSubmit={submitHandler}>
      <div>
        <FormField
          placeholder="Заголовок задачи"
          type="text"
          name="title"
          value={state.title}
          onChange={fieldChangeHandler}
        />
      </div>
      <div>
        <FormField
          tag="textarea"
          placeholder="Описание задачи"
          rows="10"
          cols="50"
          name="description"
          value={state.description}
          onChange={fieldChangeHandler}
        />
      </div>
      <div>
        <FormField
          type="datetime-local"
          name="deadline"
          value={state.deadline}
          onChange={fieldChangeHandler}
        />
      </div>
      <div>
        <FormField
          type="file"
          name="attach"
          onChange={attachHandler}
        />
      </div>
      <div>{state.attachedFiles}</div>
      <div>
        <button onClick={submitHandler} disabled={!state.title} type="submit">
          Сохранить
        </button>
        <button onClick={cancelHandler}>Отмена</button>
      </div>
    </form>
  );
};
