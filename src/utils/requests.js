import axios from 'axios';
import {
  LOGIN_URL,
  REGISTER_URL,
  LOGOUT_URL,
  USER_URL,
  GET_ROLES_URL
} from './urls';

const getToken = () => {
  const token = localStorage.getItem('token'); if (token) {
    return token.replaceAll('"', '');
  }
  return '';
};

// withCredentials()
const withCredentials = () => ({
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`
  }
});

// auth requests
export const loginRequest = ({ employeeId, password }) => axios.post(
  LOGIN_URL,
  {
    employeeId,
    password
  },
  withCredentials()
);

export const registerRequest = ({
  email, name, password
}) => axios.post(
  REGISTER_URL,
  {
    eMail: email,
    passwordhashed: password,
    employeeName: name
  },
  withCredentials()
);

export const logoutRequest = () => axios.get(LOGOUT_URL, withCredentials());

export const userRequest = (token) => axios.get(USER_URL, {
  headers: {
    Authorization: `Bearer ${token}`
  }
});

// roles
export const getRolesRequest = () => axios.get(`${GET_ROLES_URL}`, withCredentials());
