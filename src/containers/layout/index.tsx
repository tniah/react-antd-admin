import HeaderComponent from '@/containers/layout/header';
import SiderComponent from '@/containers/layout/sider';
import { useAppSelector, useAppDispatch } from '@/hooks';
import routes from '@/routes';
import { setUserState } from '@/stores/user.store';
import { getFirstPathCode } from '@/utils/getFirstPathCode';

import { Layout } from 'antd';
import React, { Suspense, useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import './index.less';

const { Content } = Layout;


const LayoutPage: React.FC = () => {
  const location = useLocation();
  const [ openKey, setOpenKey ] = useState<string>();
  const [ selectedKey, setSelectedKey ] = useState<string>(location.pathname);
  const { collapsed } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const code = getFirstPathCode(location.pathname);
    setOpenKey(code);
    setSelectedKey(location.pathname);
  }, [ location.pathname ]);

  const onClickSiderIcon = () => {
    dispatch(
      setUserState({
        collapsed: !collapsed,
      }),
    );
  };

  return (
    <Layout className="layout-page">
      <HeaderComponent collapsed={ collapsed } onClickSiderIcon={ onClickSiderIcon }/>
      <Layout>
        <SiderComponent
          collapsed={ collapsed }
          menuList={ routes }
          openKey={ openKey }
          onChangeOpenKey={ k => setOpenKey(k) }
          selectedKey={ selectedKey }
          onChangeSelectedKey={ k => setSelectedKey(k) }
        />
        <Content className="layout-page-content">
          <Suspense fallback={ null }>
            <Outlet/>
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutPage;