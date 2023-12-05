import React from 'react';
import useUser from '@/hooks/useUser';
import { Navigate, Outlet } from 'react-router-dom';
import { LINK } from '@/constants/links';

const AdminRoute = () => {
  const { user } = useUser();
  const isAdmin = user?.roles.includes('ROLE_ADMIN');

  return isAdmin === false ? <Navigate to={LINK.MAIN} replace /> : <Outlet />;
};

export default AdminRoute;
