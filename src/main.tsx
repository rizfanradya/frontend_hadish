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
  toDashboard,
  toExpertTableHadithAssesment,
  toExpertTableListHadith,
  toLandingPage,
} from "./utils/constant";
import { ThemeProvider } from "@material-tailwind/react";
import createStore from "react-auth-kit/createStore";
import AuthProvider from "react-auth-kit/AuthProvider";
import AdminTableUser from "./pages/user";
import ManageDashboard from "./pages/dashboard";
import AdminTableRole from "./pages/role";
import AdminTableTypeHadith from "./pages/typeHadith";
import AdminTableHadith from "./pages/hadith";
import ExpertTableHadithAssesment from "./pages/hadithAssesment";
import LandingPage from "./pages/landingPage";
import ListHadith from "./pages/listHadith";

const documentTitle = "Fake Hadish -";
const router = createBrowserRouter([
  {
    path: toLandingPage,
    element: <LandingPage docTitle={`${documentTitle} Home`} />,
  },
  {
    path: toDashboard,
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
  {
    path: toExpertTableListHadith,
    element: (
      <ListHadith docTitle={`${documentTitle} Expert Table List Hadish`} />
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
