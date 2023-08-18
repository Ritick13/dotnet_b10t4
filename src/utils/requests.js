import axios from 'axios';
import {
  LOGIN_URL,
  REGISTER_URL,
  LOGOUT_URL,
  USER_URL,
  LOANCARDMASTERS,
  ITEMCARDMASTERS,
  EMPMASTERS
} from './urls';

const getToken = () => {
  const token = sessionStorage.getItem('token'); if (token) {
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

// ItemCardMasters
export const postItemCardMasters = (query) => axios.post(ITEMCARDMASTERS, query, withCredentials());
export const getItemCardMasters = () => axios.get(ITEMCARDMASTERS, withCredentials());
export const getSingleItemCardMasters = (id) => axios.get(`${ITEMCARDMASTERS}/${id}`, withCredentials());
export const deleteItemCardMasters = (id) => axios.delete(`${ITEMCARDMASTERS}/${id}`, withCredentials());
export const putItemCardMasters = (id, query) => axios.put(`${ITEMCARDMASTERS}/${id}`, query, withCredentials());

// LoanCardMasters
export const postLoanCardMasters = (query) => axios.post(LOANCARDMASTERS, query, withCredentials());
export const getLoanCardMasters = () => axios.get(LOANCARDMASTERS, withCredentials());
export const getSingleLoanCardMasters = (id) => axios.get(`${LOANCARDMASTERS}/${id}`, withCredentials());
export const deleteLoanCardMasters = (id) => axios.delete(`${LOANCARDMASTERS}/${id}`, withCredentials());
export const putLoanCardMasters = (id, query) => axios.put(`${LOANCARDMASTERS}/${id}`, query, withCredentials());

// EmpMasters
export const postEmpMasters = (query) => axios.post(EMPMASTERS, query, withCredentials());
export const getEmpMasters = () => axios.get(EMPMASTERS, withCredentials());
export const getSingleEmpMasters = (id) => axios.get(`${EMPMASTERS}/${id}`, withCredentials());
export const deleteEmpMasters = (id) => axios.delete(`${EMPMASTERS}/${id}`, withCredentials());
export const putEmpMasters = (id, query) => axios.put(`${EMPMASTERS}/${id}`, query, withCredentials());
