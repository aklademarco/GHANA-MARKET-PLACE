// src/main.jsx

import React from "react"; 
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router"; 
import App from "./App.jsx";
import "./index.css";
import LatestCollection from "./components/LatestCollection.jsx";
import ShopContextProvider from "./context/shopContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ShopContextProvider>
        <App />
      </ShopContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
