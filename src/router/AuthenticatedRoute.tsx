import React from 'react';
import { LINK } from '@/constants/links';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthToken } from '@/store/authStore';

const AuthenticatedRoute = () => {
  const isAuth = useAuthToken();

  return isAuth ? <Navigate to={LINK.MAIN} replace /> : <Outlet />;
};

export default AuthenticatedRoute;
