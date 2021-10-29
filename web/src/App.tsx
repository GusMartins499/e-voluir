import React from "react";
import "./global.css";
import "leaflet/dist/leaflet.css";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter } from "react-router-dom";

import Routes from "./routes";

import { ToastContainer } from "react-toastify";


function App() {
  return (
    <BrowserRouter>
      <Routes />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </BrowserRouter>
  );
}

export default App;
