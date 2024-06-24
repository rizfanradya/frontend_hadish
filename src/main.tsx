import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { toUserDashboard } from "./utils/constant";
import UserDashboard from "./pages/user/dashboard";

const router = createBrowserRouter([
  {
    path: toUserDashboard,
    element: <UserDashboard docTitle="Hadish" />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
