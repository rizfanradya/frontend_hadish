import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { toSignIn, toSignUp, toUserDashboard } from "./utils/constant";
import UserDashboard from "./pages/user/dashboard";
import { ThemeProvider } from "@material-tailwind/react";
import SignUp from "./pages/auth/signup";
import SignIn from "./pages/auth/signin";

const router = createBrowserRouter([
  {
    path: toUserDashboard,
    element: <UserDashboard docTitle="Hadish - Home" />,
  },
  {
    path: toSignUp,
    element: <SignUp docTitle="Hadish - Sign Up" />,
  },
  {
    path: toSignIn,
    element: <SignIn docTitle="Hadish - Sign In" />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
