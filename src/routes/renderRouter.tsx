import { LayoutPage } from '@/layout';
import DashboardPage from '@/pages/dashboard';
import OauthClientPage from '@/pages/oauthClient';
import TenantPage from '@/pages/tenant';
import React from 'react';
import type { RouteObject } from 'react-router-dom';
import { useRoutes } from 'react-router-dom';

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
        path: 'tenant/client',
        element: <OauthClientPage/>
      },
    ]
  },
];

const RenderRouter: React.FC = () => {
  return useRoutes(routeList);
};

export default RenderRouter;