import { jwtDecode } from "jwt-decode";

export const backendFastApi = "http://192.168.43.174:8000/api";

export const ACCESS_TOKEN_NAME = "hadish_access_token";
export const ACCESS_TOKEN = localStorage.getItem(ACCESS_TOKEN_NAME);
export const AUTHORIZATION = `Bearer ${ACCESS_TOKEN}`;
export const DECODE_TOKEN: { exp: number; id: string } | undefined =
  ACCESS_TOKEN ? jwtDecode(ACCESS_TOKEN) : undefined;

export const toUserDashboard = "/";
export const toManageDashboard = "/manage-dashboard";
export const toAdminTableUser = "/manage-dashboard/admin/table-user";
export const toAdminTableHadith = "/manage-dashboard/admin/table-hadish";
export const toAdminTableRole = "/manage-dashboard/admin/table-role";
export const toAdminTableTypeHadith =
  "/manage-dashboard/admin/table-type-hadith";
export const toExpertTableHadithAssesment =
  "/manage-dashboard/expert/table-hadish-assesment";
