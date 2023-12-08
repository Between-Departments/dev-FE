import React from 'react';
import { RouteObject, useLocation, Outlet } from 'react-router-dom';
import routes from '@/router/router';
import styled from 'styled-components';
import { colors } from '../constants/colors';
import BottomNavBar from './BottomNavBar';
import FloatingNav from './FloatingNav';
import GlobalModal from '@/components/public/modal/GlobalModal';

interface ExtendedRouteObject extends Omit<RouteObject, 'children'> {
  meta?: {
    hideNavBar?: boolean;
    hideFloatNav?: boolean;
  };
  children?: ExtendedRouteObject[];
}

const findRouteByPath = (
  path: string,
  routes: ExtendedRouteObject[],
): ExtendedRouteObject | null => {
  for (const route of routes) {
    const routePathRegex = new RegExp('^' + route.path?.replace(/:\w+/g, '\\w+') + '$');
    if (routePathRegex.test(path)) {
      return route;
    }
    // 중첩된 라우트가 있는 경우
    if (route.children) {
      const nestedRoute = findRouteByPath(path, route.children);
      if (nestedRoute) {
        return nestedRoute;
      }
    }
  }
  return null;
};

const Layout = () => {
  const location = useLocation();
  const currentRoute = findRouteByPath(location.pathname, routes);
  const hideBottomNav = currentRoute?.meta?.hideNavBar || false;
  const hideFloatNav = currentRoute?.meta?.hideFloatNav || false;

  return (
    <PageLayout>
      <PageContentLayout $hideBottomNav={hideBottomNav}>
        <Outlet />
        {hideBottomNav === false && <BottomNavBar />}
        {hideFloatNav === false && <FloatingNav />}
      </PageContentLayout>
      <GlobalModal />
    </PageLayout>
  );
};

export default Layout;

const PageLayout = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background: ${colors.gray1};
`;

const PageContentLayout = styled.div<{ $hideBottomNav: boolean }>`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 39rem;
  background: ${colors.white};
  margin: 0 auto;
  padding-bottom: ${({ $hideBottomNav }) => ($hideBottomNav ? '0' : '6.5rem;')};
`;
