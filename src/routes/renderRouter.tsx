import LayoutPage from '@/containers/layout';
import DashboardPage from '@/pages/dashboard';
import UserPage from '@/pages/user';
import React from 'react';
import type { RouteObject } from 'react-router-dom';
import { useRoutes } from 'react-router-dom';
import TenantPage from '@/pages/tenant';

const routeList: RouteObject[] = [
  {
    path: '/',
    element: <LayoutPage/>,
    children: [
      {
        path: 'dashboard',
        element: <DashboardPage/>
      },
      {
        path: 'tenant',
        element: <TenantPage/>,
      },
      {
        path: 'tenant/user',
        element: <UserPage/>
      },
    ]
  },
];

const RenderRouter: React.FC = () => {
  return useRoutes(routeList);
};

export default RenderRouter;