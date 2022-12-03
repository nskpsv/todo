import { useEffect, useState } from "react";
import { Index } from "./pages/index/index";
import { TaskEditor } from "./pages/task-editor/task-editor";
import { onChangeHistory } from "./utils/history";

import "dayjs/locale/ru";

export const App = () => {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    onChangeHistory(() => { setPath(window.location.pathname); });

    window.onpopstate = () => {
      setPath(window.location.pathname);
    };
  }, []);

  return (
    <>
      {path === '/' && <Index />}
      {path.includes('/edit/') && <TaskEditor />}
    </>
  );
};
