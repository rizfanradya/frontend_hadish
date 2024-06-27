export const backendFastApi = "http://192.168.43.174:8000/api";

export const ACCESS_TOKEN_NAME = "hadish_access_token";
export const ACCESS_TOKEN = localStorage.getItem(ACCESS_TOKEN_NAME);
export const AUTHORIZATION = `Bearer ${ACCESS_TOKEN}`;

export const toSignUp = "/signup";
export const toSignIn = "/signin";
export const toUserDashboard = "/";
export const toManageDashboard = "/manage-dashboard";
export const toAdminTableUser = "/manage-dashboard/admin/table-user";
