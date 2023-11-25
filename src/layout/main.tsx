// import TagView from '@/containers/layout/tagView';
import { deviceConstants } from '@/constants';
import { useAppSelector, useAppDispatch } from '@/hooks';
import HeaderComponent from '@/layout/header';
import MenuComponent from '@/layout/menu';
import routes from '@/routes';
import { setUserState } from '@/stores/user.store';
import { getFirstPathCode } from '@/utils/getFirstPathCode';
import { getGlobalState } from '@/utils/getGlobalState';
import { Drawer, Layout, theme as antTheme } from 'antd';
import React, { Suspense, useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import './index.less';

const { Sider, Content } = Layout;
const WIDTH = 992;


const LayoutPage: React.FC = () => {
  const location = useLocation();
  const [ openKey, setOpenKey ] = useState<string>();
  const [ selectedKey, setSelectedKey ] = useState<string>(location.pathname);
  const { device, collapsed } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const token = antTheme.useToken();

  const isMobile = device === deviceConstants.MOBILE;

  const onClickSiderIcon = () => {
    dispatch(
      setUserState({
        collapsed: !collapsed,
      }),
    );
  };

  useEffect(() => {
    const code = getFirstPathCode(location.pathname);
    setOpenKey(code);
    setSelectedKey(location.pathname);
  }, [ location.pathname ]);

  useEffect(() => {
    window.onresize = () => {
      const { device } = getGlobalState();
      const rect = document.body.getBoundingClientRect();
      const needCollapse = rect.width < WIDTH;

      dispatch(
        setUserState({
          device,
          collapsed: needCollapse,
        }),
      );
    }
  }, [ dispatch ]);

  return (
    <Layout className="layout-page">
      <HeaderComponent collapsed={ collapsed } onClickSiderIcon={ onClickSiderIcon }/>
      <Layout>
        { !isMobile ? (
          <Sider
            className="layout-page-sider"
            trigger={ null }
            collapsible
            style={ { backgroundColor: token.token.colorBgContainer } }
            collapsedWidth={ isMobile ? 0 : 80 }
            collapsed={ collapsed }
            width={ 250 }
            breakpoint="md"
          >
            <MenuComponent
              menuList={ routes }
              openKey={ openKey }
              onChangeOpenKey={ k => setOpenKey(k) }
              selectedKey={ selectedKey }
              onChangeSelectedKey={ k => setSelectedKey(k) }
            />
          </Sider>
        ) : (
          <Drawer
            width="200"
            placement="left"
            styles={ { body: { padding: 0, height: '100%' } } }
            closable={ false }
            onClose={ onClickSiderIcon }
            open={ !collapsed }
          >
            <MenuComponent
              menuList={ routes }
              openKey={ openKey }
              onChangeOpenKey={ k => setOpenKey(k) }
              selectedKey={ selectedKey }
              onChangeSelectedKey={ k => setSelectedKey(k) }
            />
          </Drawer>
        )}
        <Content className="layout-page-content">
          {/*<TagView/>*/ }
          <Suspense fallback={ null }>
            <Outlet/>
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutPage;