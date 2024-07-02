import { jwtDecode } from "jwt-decode";

export const backendFastApi = "http://192.168.43.174:8000/api";

export const ACCESS_TOKEN_NAME = "hadish_access_token";
export const ACCESS_TOKEN = localStorage.getItem(ACCESS_TOKEN_NAME);
export const AUTHORIZATION = `Bearer ${ACCESS_TOKEN}`;
export const DECODE_TOKEN: { exp: number; id: string } | undefined =
  ACCESS_TOKEN ? jwtDecode(ACCESS_TOKEN) : undefined;

// role
export const roleSuperAdministrator = "SUPER ADMINISTRATOR";
export const roleAdmin = "ADMIN";
export const roleExpert = "EXPERT";
export const roleUser = "USER";

// path
export const toUserDashboard = "/";
export const toManageDashboard = "/manage-dashboard";
export const toAdminTableUser = "/manage-dashboard/admin/table-user";
export const toAdminTableHadith = "/manage-dashboard/admin/table-hadish";
export const toAdminTableRole = "/manage-dashboard/admin/table-role";
export const toAdminTableTypeHadith =
  "/manage-dashboard/admin/table-type-hadith";
export const toExpertTableHadith = "/manage-dashboard/expert/table-list-hadish";
export const toExpertTableHadithAssesment =
  "/manage-dashboard/expert/table-hadish-assesment";
