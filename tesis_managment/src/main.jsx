import React from "react";
import ReactDOM from "react-dom/client";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "@popperjs/core";

import "@fortawesome/fontawesome-free/css/all.css";
import Rutas from "./routes/Rutas";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Rutas />
  </React.StrictMode>
);
