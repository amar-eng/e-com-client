import { Outlet, Navigate } from 'react-router-dom';
import { useUserInfo } from '../hooks/useUserInfo';

export const PrivateRoute = () => {
  const userInfo = useUserInfo();

  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};
