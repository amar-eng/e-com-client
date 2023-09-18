import { Outlet, Navigate } from 'react-router-dom';
import { useUserInfo } from '../hooks/useUserInfo';

export const AdminRoute = () => {
  const userInfo = useUserInfo();

  return userInfo && userInfo.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};
