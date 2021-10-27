import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { LocationUserProvider } from "./context/UserLocation";
import { AuthProvider } from "./context/auth";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <LocationUserProvider>
        <App />
      </LocationUserProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
