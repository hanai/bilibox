import React, { useCallback, useState } from "react";
import styles from "./style.module.css";

const { ipcRenderer } = require("electron");

const DragLockToggle = () => {
  const [dragMode, setDragMode] = useState(true);
  const handleClick = useCallback(() => {
    setDragMode((mode) => !mode);
    const elements = document.querySelectorAll(".draggable, .undraggable");

    Array.prototype.forEach.call(elements, (ele: HTMLElement) => {
      if (ele.classList.contains("draggable")) {
        ele.classList.remove("draggable");
        ele.classList.add("undraggable");
      } else {
        ele.classList.add("draggable");
        ele.classList.remove("undraggable");
      }
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    ipcRenderer.invoke("disableClickThrough");
  }, []);

  const handleMouseLeave = useCallback(() => {
    ipcRenderer.invoke("enableClickThrough");
  }, []);

  return <div className={styles.toggle} onClick={handleClick}></div>;
};

export default DragLockToggle;
