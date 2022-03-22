import React from "react"
import "./style.scss";
import { classes } from "../../lib";

const classNames = {
  root: "TaskList-wrapper",
};
const TaskList = () => {
  return (
    <div className={classes("container", classNames.root)}>
      <h3>Task List</h3>
    </div>
  );
};

export default TaskList;
