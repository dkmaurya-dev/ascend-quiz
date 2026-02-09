import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./styles.css"
const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// import React from "react";
// import { createRoot } from "react-dom/client";
// import App from "./App";
// import "./styles.css";
// createRoot(document.getElementById("root")!).render(<App />);
