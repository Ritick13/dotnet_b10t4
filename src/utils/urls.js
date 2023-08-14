import {
  BACKEND_URL
} from '../config';

// auth
export const LOGIN_URL = `${BACKEND_URL}/api/Login`;
export const REGISTER_URL = `${BACKEND_URL}/auth/register`;
export const LOGOUT_URL = `${BACKEND_URL}/auth/logout`;
export const USER_URL = `${BACKEND_URL}/auth/user`;
export const GET_ROLES_URL = `${BACKEND_URL}/auth/roles`;
