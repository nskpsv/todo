import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { AttachedFilesController } from "../attached-files-controller/attached-files-controller";
import { FormField } from "../form-field/form-field";

export const TaskForm = ({ task, taskId, onSave, onCancel }) => {
  const [state, setState] = useState(task);
  const [saving, setSaving] = useState(false);

  const fieldChangeHandler = ({ target: { name, value } }) => {
    setState(Object.assign({}, state, { [name]: value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setSaving(true);
    if (!taskId) {
      onSave(state);
    }
  };

  const attachHandler = (urlList) => {
    if (urlList.length) {
      onSave(
        Object.assign({}, state, {
          attachedFiles: state.attachedFiles.concat(urlList),
        })
      );
    } else {
      onSave(state);
    }
  };

  useEffect(() => {
    if (task !== state) {
      setState(task);
    }
  }, [task]);

  return (
    <form onSubmit={submitHandler}>
      <div>
        <FormField
          label="Заголовок задачи"
          type="text"
          name="title"
          value={state.title}
          onChange={fieldChangeHandler}
          required
        />
      </div>
      <div>
        <FormField
          tag="textarea"
          label="Описание задачи"
          name="description"
          rows="10"
          cols="50"
          resize="none"
          value={state.description}
          onChange={fieldChangeHandler}
        />
      </div>
      <div>
        <FormField
          label="Сделать до: "
          type="date"
          name="deadline"
          value={state.deadline}
          onChange={fieldChangeHandler}
          min={dayjs().format("YYYY-MM-DD")}
          required
        />
      </div>
      <AttachedFilesController
        list={task?.attachedFiles}
        taskId={taskId}
        onSuccessfulAttach={attachHandler}
        startUpload={saving}
      />
      <div>
        <button type="submit" disabled={saving}>
          Сохранить
        </button>
        <button type="button" disabled={saving} onClick={onCancel}>
          Отмена
        </button>
      </div>
    </form>
  );
};
