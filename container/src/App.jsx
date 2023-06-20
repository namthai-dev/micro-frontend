import React from "react";
import ReactDOM from "react-dom";
import { Counter } from "counter/Counter";

import "./index.css";

const App = () => (
  <div className="container">
    <h1>Container App</h1>
    {/* Micro frontend app */}
    <Counter />
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
