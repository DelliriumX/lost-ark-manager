import React from "react"
import "./style.scss";
import { classes } from "../../lib";

const classNames = {
  root: "AlertManager-wrapper",
};

const AlertManager = () => {
  return (
    <div className={classes("container", classNames.root)}>
      <h3>Alert Manager</h3>
    </div>
  );
};

export default AlertManager;
