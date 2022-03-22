import "./style.scss";

import React from "react"
import Router from "router";
import {Link} from "react-router-dom"

export const App = () => {
  return (
    <>
      <header className="container">
        <h3>Lost Ark Manager</h3>
      </header>
      <main>
        <Router></Router>
      </main>
      <footer></footer>
    </>
  );
};

export default App;
