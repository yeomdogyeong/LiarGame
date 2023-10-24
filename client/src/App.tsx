import React from "react";
import "./App.css";
import "./page/Main";
import { RouterProvider } from "react-router-dom";
import { routers } from "./router";

function App() {
  return <RouterProvider router={routers} />;
}

export default App;
