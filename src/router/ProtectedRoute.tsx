import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '@/store/authStore';

const ProtectedRoute = () => {
  const isAuth = useAuthStore((state) => state.token);

  return isAuth ? <Outlet /> : <Navigate to='/login' replace />;
};

export default ProtectedRoute;
