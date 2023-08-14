import React, {
  createContext, useContext, useMemo
} from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { notifications } from '@mantine/notifications';
import { loginRequest, logoutRequest, userRequest } from '../utils/requests';
import { useLocalStorage } from './useLocalStorage';
import { useLoading } from './useLoading';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage('user', null);
  const [token, setToken] = useLocalStorage('token', null);
  const navigate = useNavigate();
  const { request } = useLoading();

  const login = async (data) => {
    try {
      const response = await request(() => loginRequest(data));
      if (response.status === 200) {
        setToken(response.data.token);
        const userResponse = await request(() => userRequest(response.data.token));
        if (userResponse.status === 200) {
          setUser(userResponse.data);
          notifications.show({
            title: 'Login successful'
          });
          navigate('/home');
        } else {
          notifications.show({
            color: 'red',
            title: 'User fetch failed',
            message: response.data && response.data.message
          });
        }
      } else {
        notifications.show({
          color: 'red',
          title: 'Login failed',
          message: response.data && response.data.message
        });
      }
    } catch (error) {
      notifications.show({
        color: 'red',
        title: 'Login failed',
        message: error.response && error.response.data
            && error.response.data.message ? error.response.data.message : error.message
      });
    }
  };

  const logout = async () => {
    try {
      const response = await request(logoutRequest);
      if (response.status === 200) {
        navigate('/auth');
        notifications.show({
          title: 'Logout successful'
        });
        setToken('');
        setUser(null);
      } else {
        notifications.show({
          color: 'red',
          title: 'Logout failed',
          message: response.data && response.data.message
        });
      }
    } catch (error) {
      notifications.show({
        color: 'red',
        title: 'Logout failed',
        message: error.response && error.response.data
        && error.response.data.message ? error.response.data.message : error.message
      });
    }
  };

  const value = useMemo(
    () => ({
      token,
      user,
      login,
      logout
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useAuth = () => useContext(AuthContext);
