import React from 'react';
import { LINK } from '@/constants/links';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthToken } from '@/store/authStore';

const ProtectedRoute = () => {
  const isAuth = useAuthToken();

  return isAuth ? <Outlet /> : <Navigate to={LINK.LOGIN} replace />;
};

export default ProtectedRoute;
