import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  ACCESS_TOKEN_NAME,
  toAdminTableHadith,
  toAdminTableRole,
  toAdminTableTypeHadith,
  toAdminTableUser,
  toExpertTableHadithAssesment,
  toManageDashboard,
  toUserDashboard,
} from "./utils/constant";
import UserDashboard from "./pages/user/dashboard";
import { ThemeProvider } from "@material-tailwind/react";
import createStore from "react-auth-kit/createStore";
import AuthProvider from "react-auth-kit/AuthProvider";
import AdminTableUser from "./pages/admin/user";
import ManageDashboard from "./pages/manageDashboard";
import AdminTableRole from "./pages/admin/role";
import AdminTableTypeHadith from "./pages/admin/typeHadith";
import AdminTableHadith from "./pages/admin/hadith";
import ExpertTableHadithAssesment from "./pages/expert/hadithAssesment";

const documentTitle = "Fake Hadish -";
const router = createBrowserRouter([
  {
    path: toUserDashboard,
    element: <UserDashboard docTitle={`${documentTitle} Home`} />,
  },
  {
    path: toManageDashboard,
    element: <ManageDashboard docTitle={`${documentTitle} Manage Dashboard`} />,
  },
  {
    path: toAdminTableUser,
    element: <AdminTableUser docTitle={`${documentTitle} Admin Table User`} />,
  },
  {
    path: toAdminTableHadith,
    element: (
      <AdminTableHadith docTitle={`${documentTitle} Admin Table Hadish`} />
    ),
  },
  {
    path: toAdminTableTypeHadith,
    element: (
      <AdminTableTypeHadith
        docTitle={`${documentTitle} Admin Table Type Hadish`}
      />
    ),
  },
  {
    path: toAdminTableRole,
    element: <AdminTableRole docTitle={`${documentTitle} Admin Table Role`} />,
  },
  {
    path: toExpertTableHadithAssesment,
    element: (
      <ExpertTableHadithAssesment
        docTitle={`${documentTitle} Expert Table Hadish Assesment`}
      />
    ),
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
