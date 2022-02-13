import React from "react";
import "./App.css";
import DanmuList from "./components/DanmuList";
import DragLockToggle from "./components/DragLockToggle";

import useTheme from "./hooks/useTheme";

function App() {
  useTheme();

  return (
    <div className="App">
      <DanmuList />
      <DragLockToggle />
    </div>
  );
}

export default App;
