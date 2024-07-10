import { jwtDecode } from "jwt-decode";

export const backendFastApi = "http://89.116.20.146:8000/api";
// export const backendFastApi = "http://192.168.43.174:8000/api";

export const ACCESS_TOKEN_NAME = "hadish_access_token";
export const REFRESH_TOKEN_NAME = "hadish_refresh_token";
export const ACCESS_TOKEN = localStorage.getItem(ACCESS_TOKEN_NAME);
export const REFRESH_TOKEN = localStorage.getItem(REFRESH_TOKEN_NAME);
export const AUTHORIZATION = `Bearer ${ACCESS_TOKEN}`;
export const DECODE_TOKEN: { exp: number; id: string } | undefined =
  ACCESS_TOKEN ? jwtDecode(ACCESS_TOKEN) : undefined;

// role
export const roleSuperAdministrator = "SUPER ADMIN";
export const roleAdmin = "ADMIN";
export const roleExpert = "EXPERT";
export const roleUser = "USER";

// path
export const toLandingPage = "/";
export const toDashboard = "/dashboard";
export const toAdminTableUser = "/dashboard/admin/user";
export const toAdminTableHadith = "/dashboard/admin/hadish";
export const toAdminTableRole = "/dashboard/admin/role";
export const toAdminTableTypeHadith = "/dashboard/admin/type-hadith";
export const toExpertTableHadith = "/dashboard/expert/list-hadish";
export const toExpertTableHadithAssesment =
  "/dashboard/expert/hadish-assesment";
