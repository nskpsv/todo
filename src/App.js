import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Index } from "./pages/index/index";
import { TaskEditor } from "./pages/task-editor/task-editor";

const isSameOrAfter = require("dayjs/plugin/isSameOrAfter");
dayjs.extend(isSameOrAfter);

export const App = () => {
  
  const [path, setPath] = useState("");

  useEffect(() => {
 setPath(window.location.pathname);
  }, [window.location.pathname])

  window.onpopstate = () => {
    setPath(window.location.pathname);
  };

  return (
    <>
      {path === '/' && <Index />}
      {path.includes('/edit/') && <TaskEditor />}
    </>
  );
};
