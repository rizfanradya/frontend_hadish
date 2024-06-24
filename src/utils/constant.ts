export const backendFastApi = "localhost:8000/api";

export const ACCESS_TOKEN_NAME = "hadish_access_token";
export const ACCESS_TOKEN = localStorage.getItem(ACCESS_TOKEN_NAME);
export const AUTHORIZATION = `Bearer ${ACCESS_TOKEN}`;

export const toUserDashboard = "/";
