import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { toUserDashboard } from "./utils/constant";
import UserDashboard from "./pages/user/dashboard";
import { ThemeProvider } from "@material-tailwind/react";

const router = createBrowserRouter([
  {
    path: toUserDashboard,
    element: <UserDashboard docTitle="Hadish" />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
