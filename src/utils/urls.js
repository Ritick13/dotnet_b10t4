import {
  BACKEND_URL
} from '../config';

// auth
export const LOGIN_URL = `${BACKEND_URL}/api/Auth/login`;
export const REGISTER_URL = `${BACKEND_URL}/auth/register`;
export const LOGOUT_URL = `${BACKEND_URL}/api/Auth/logout`;
export const USER_URL = `${BACKEND_URL}/api/Auth/user`;

export const EMPMASTERS = `${BACKEND_URL}/api/EmpMasters`;

export const ITEMCARDMASTERS = `${BACKEND_URL}/api/ItemMasters`;

export const LOANCARDMASTERS = `${BACKEND_URL}/api/LoanCardMasters`;
