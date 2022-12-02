import { useEffect, useState, useRef } from "react";
import { storage } from "../../../store/store";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { FormField } from "../form-field/form-field";

export const AttachedFilesController = ({
  list,
  taskId,
  onReady,
  savingStarted,
}) => {
  const [uploadFilesList, setUploadFilesList] = useState([]);
  const [deleteSuccessfull, setDeleteSuccessfull] = useState(false);
  const [uploadSuccessful, setUploadSuccessful] = useState(false);
  const deleteFilesList = useRef([]);
  const successfulDeletedFiles = useRef([]);
  const successfulUploadedFiles = useRef([]);

  const cancelUpload = (index) => {
    const clone = Array.from(uploadFilesList);

    clone.splice(index, 1);
    setUploadFilesList(clone);
  };

  const deleteToggleHandler = (event) => {
    const data = event.target;
    if (data.checked) {
      deleteFilesList.current.push(data.value);
      console.log(data.value);
    } else {
      deleteFilesList.current.splice(
        deleteFilesList.current.findIndex((url) => url === data.value),
        1
      );
    }
    console.log(deleteFilesList.current);
  };

  const deleteCheckedFileSuccess = (file) => {
    successfulDeletedFiles.current.push(file);
    console.log("deleted files");
    console.log(successfulDeletedFiles.current);
    if (
      successfulDeletedFiles.current.length === deleteFilesList.current.length
    ) {
      setDeleteSuccessfull(true);
    }
  };

  const deleteCheckedFiles = () => {
    console.log("delete");
    console.log(deleteFilesList.current);
    if (deleteFilesList.current.length) {
    deleteFilesList.current.forEach((url) => {
      console.log("deleting" + url);
      deleteObject(ref(storage, url))
        .then((e) => {
          console.log("delete result");
          console.log(e);
          deleteCheckedFileSuccess(url);
        })
        .catch((error) => alert("Ошибка: " + error));
    })
  } else {
    setDeleteSuccessfull(true);
  }
  };

  const onSelectNewFiles = (event) => {
    setUploadFilesList(
      Array.from(event.target.files)
        .map((file) => {
          return { file: file, progress: 0 };
        })
        .concat(uploadFilesList)
    );
  };

  const uploadNewFileSuccess = (file) => {
    successfulUploadedFiles.current.push(file);
    console.log("uploadSuccess");
    console.log(successfulUploadedFiles.current);
    if (successfulUploadedFiles.current.length === uploadFilesList.length) {
      setUploadSuccessful(true);
    }
  };

  const uploadNewFiles = () => {
    console.log("upload");
    if (uploadFilesList.length) {
      console.log("upload if");
      uploadFilesList.forEach((item, index) => {
        const meta = { contentType: item.file.type };
        const uploadTask = uploadBytesResumable(
          ref(storage, `${taskId}/${item.file.name}`),
          item.file,
          meta
        );

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const clone = [...uploadFilesList];
            clone[index].progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setUploadFilesList(clone);
          },
          (error) => {
            console.log(error.code);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              uploadNewFileSuccess({
                name: item.file.name,
                url: url,
              });
            });
          }
        );
      });
    } else {
      console.log("upload else");
      setUploadSuccessful(true);
    }
  };

  useEffect(() => {
    console.log("effect");
    if (savingStarted && taskId) {
      console.log("effect if");
      uploadNewFiles();
      deleteCheckedFiles();
    }
  }, [savingStarted, taskId]);

  useEffect(() => {
    console.log("uploadSuccessful " + uploadSuccessful);
    console.log("deleteSuccessful " + deleteSuccessfull);
    if (uploadSuccessful && deleteSuccessfull) {
      const finalAttachedFilesList = Array.from(list);

      console.log("after clone");
      console.log(finalAttachedFilesList);

      successfulDeletedFiles.current.forEach((url) =>
        finalAttachedFilesList.splice(
          finalAttachedFilesList.findIndex((file) => file.url === url),
          1
        )
      );
      console.log("after splice");
      console.log(finalAttachedFilesList);
      finalAttachedFilesList.splice(0, 0, ...successfulUploadedFiles.current);

      console.log("final list");
      console.log(finalAttachedFilesList);
      onReady(finalAttachedFilesList)
    }
  }, [uploadSuccessful, deleteSuccessfull]);

  return (
    <div>
      <div>
        <FormField
          label="Прикрепить файлы: "
          type="file"
          multiple
          onChange={onSelectNewFiles}
        />
      </div>
      {!!list.length && (
        <div>
          <hr />
          <p>Прикреплённые файлы:</p>
          {list.map((file, index) => {
            return (
              <div key={index}>
                <p>
                  <a href={file.url} download>
                    {` ${file.name} `}
                  </a>
                  <input
                    type="checkbox"
                    value={file.url}
                    onChange={deleteToggleHandler}
                  />{" "}
                  удалить
                </p>
              </div>
            );
          })}
        </div>
      )}
      <hr />
      {uploadFilesList[0] && (
        <div>
          <p>Добавленные файлы:</p>
          {uploadFilesList.map((item, index) => {
            return (
              <div key={index}>
                <p>
                  {` ${item.file.name} `}
                  <span>
                    {item.progress > 0
                      ? ` >>> загрузка ${item.progress} % `
                      : ""}
                  </span>
                  <button
                    type="button"
                    onClick={() => cancelUpload(index)}
                    disabled={savingStarted}
                  >
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
