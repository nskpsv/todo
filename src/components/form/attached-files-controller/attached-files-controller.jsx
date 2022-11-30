import { useEffect, useState } from "react";
import { storage } from "../../../store/store";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { FormField } from "../form-field/form-field";

export const AttachedFilesController = ({
  list,
  taskId,
  onSuccessfulAttach,
  startUpload,
}) => {
  const [selectedFilesList, setSelectedFilesList] = useState([]);
  const uploadedFiles = [];

  const cancelUpload = () => {};

  const deleteHandler = () => {};

  const onSelect = (e) => {
    setSelectedFilesList(
      Array.from(e.target.files)
        .map((file) => {
          return { file: file, progress: 0 };
        })
        .concat(selectedFilesList)
    );
  };

  const uploadSuccess = (url) => {
    console.log("upload success");
    uploadedFiles.push(url);
    if (uploadedFiles.length === selectedFilesList.length) {
      console.log("successful attach");
      onSuccessfulAttach(uploadedFiles);
    }
  };

  const uploadFiles = () => {
    selectedFilesList.forEach((item, index) => {
      const meta = { contentType: item.file.type };
      const uploadTask = uploadBytesResumable(
        ref(storage, `${taskId}/${item.file.name}`),
        item.file,
        meta
      );

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const clone = [...selectedFilesList];
          clone[index].progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setSelectedFilesList(clone);
        },
        (error) => {
          console.log(error.code);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            uploadSuccess(url);
          });
        }
      );
    });
  };

  useEffect(() => {
    if (startUpload && selectedFilesList.length && taskId) {
      uploadFiles();
    } else if (startUpload && taskId) {
      onSuccessfulAttach([]);
    }
  }, [startUpload, taskId]);

  return (
    <div>
      <div>
        <FormField
          label="Прикрепить файлы: "
          type="file"
          multiple
          onChange={onSelect}
        />
      </div>
      {list[0] && (
        <div>
          <hr />
          <p>Прикреплённые файлы:</p>
          {list.map((file, index) => {
            return (
              <div key={index}>
                <p>
                  {file}
                  <button type="button" onClick={deleteHandler}>
                    Удалить
                  </button>
                </p>
              </div>
            );
          })}
        </div>
      )}
      <hr />
      {selectedFilesList[0] && (
        <div>
          <p>Добавленные файлы:</p>
          {selectedFilesList.map((item, index) => {
            return (
              <div key={index}>
                <p>
                  {` ${item.file.name} `}
                  <span>
                    {item.progress > 0
                      ? ` >>> загрузка ${item.progress} % `
                      : ""}
                  </span>
                  <button type="button" onClick={cancelUpload}>
                    Удалить
                  </button>
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
