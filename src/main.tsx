import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  ACCESS_TOKEN_NAME,
  toAdminTableUser,
  toManageDashboard,
  toSignIn,
  toSignUp,
  toUserDashboard,
} from "./utils/constant";
import UserDashboard from "./pages/user/dashboard";
import { ThemeProvider } from "@material-tailwind/react";
import SignUp from "./pages/auth/signup";
import SignIn from "./pages/auth/signin";
import createStore from "react-auth-kit/createStore";
import AuthProvider from "react-auth-kit/AuthProvider";
import AdminTableUser from "./pages/admin/user";
import ManageDashboard from "./pages/manageDashboard";

const documentTitle = "Fake Hadish -";
const router = createBrowserRouter([
  {
    path: toUserDashboard,
    element: <UserDashboard docTitle={`${documentTitle} Home`} />,
  },
  {
    path: toSignUp,
    element: <SignUp docTitle={`${documentTitle} Sign Up`} />,
  },
  {
    path: toSignIn,
    element: <SignIn docTitle={`${documentTitle} Sign In`} />,
  },
  {
    path: toManageDashboard,
    element: <ManageDashboard docTitle={`${documentTitle} Manage Dashboard`} />,
  },
  {
    path: toAdminTableUser,
    element: <AdminTableUser docTitle={`${documentTitle} Admin Table User`} />,
  },
]);

const store = createStore({
  authName: ACCESS_TOKEN_NAME,
  authType: "localstorage",
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === "https:",
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider store={store}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);
