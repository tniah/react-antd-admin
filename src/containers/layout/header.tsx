import SSILogoSvg from '@/assets/images/logo.svg';
import MoonSvg from '@/assets/images/moon.svg?react';
import SunSvg from '@/assets/images/sun.svg?react';
import { themeConstants, localStorageConstants } from '@/constants';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { useLocale, LocaleFormatter } from '@/locales';
import { locales } from '@/locales/localeConfig';
import { setGlobalState } from '@/stores/global.store';
import { setUserState } from '@/stores/user.store';
import { MenuUnfoldOutlined, MenuFoldOutlined, LogoutOutlined } from '@ant-design/icons';
import { Dropdown, Layout, theme as antTheme, Tooltip, Avatar, Space } from 'antd';
import React, { createElement } from 'react';

const { Header } = Layout;

interface HeaderProps {
  collapsed: boolean,
  onClickSiderIcon: () => void,
}

const HeaderComponent: React.FC<HeaderProps> =
  ({
     collapsed,
     onClickSiderIcon,
   }) => {
    const { locale } = useAppSelector(state => state.user);
    const { theme } = useAppSelector(state => state.global);
    const token = antTheme.useToken();
    const dispatch = useAppDispatch();
    const { formatMessage } = useLocale();

    const selectLocale = ({ key }: { key: any }) => {
      dispatch(setUserState({ locale: key }));
      localStorage.setItem(localStorageConstants.LOCALE, key);
    };

    const onChangeTheme = () => {
      const newTheme = theme === themeConstants.DARK ? themeConstants.LIGHT : themeConstants.DARK;
      dispatch(
        setGlobalState({
          theme: newTheme,
        }),
      );
      localStorage.setItem(localStorageConstants.THEME, newTheme);
    };

    return (
      <Header className="layout-page-header bg-2" style={ { backgroundColor: token.token.colorBgContainer } }>
        <div className="logo" style={ { width: collapsed ? 80 : 250 } }>
          <img src={ SSILogoSvg } alt="" style={ { marginRight: collapsed ? '2px' : '20px', width: '100%' } }/>
        </div>
        <div className="layout-page-header-main">
          <div onClick={ onClickSiderIcon }>
            <span id="sidebar-trigger">{ collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/> }</span>
          </div>
          <div className="actions">
            <Tooltip
              title={ formatMessage({
                id: theme === themeConstants.DARK ? 'global.tips.theme.lightTooltip' : 'global.tips.theme.darkTooltip',
              }) }
            >
              <span>
                { createElement(theme === themeConstants.DARK ? SunSvg : MoonSvg, {
                  onClick: onChangeTheme,
                }) }
              </span>
            </Tooltip>
            <Dropdown
              menu={ {
                onClick: info => selectLocale(info),
                items: Object.values(locales).map(menu => {
                  return {
                    key: menu.key,
                    icon: createElement(menu.icon),
                    disabled: locale === menu.key,
                    label: menu.label
                  };
                })
              } }
            >
            <span>
              { createElement(locales[locale].icon) }
            </span>
            </Dropdown>
            <Dropdown
              menu={ {
                items: [
                  {
                    key: '1',
                    icon: <LogoutOutlined/>,
                    label: (
                      // <span onClick={ () => onActionClick('logout') }>
                      <span>
                        <LocaleFormatter id="header.avatar.logout"/>
                      </span>
                    ),
                  },
                ],
              } }
            >
              <span className="user-action">
                <Space size="middle">
                  <span className="label">Nguyen Trong Hai</span>
                  <Avatar size="large" src="https://avatars.githubusercontent.com/u/17630614?v=4"/>
                </Space>
              </span>
            </Dropdown>
          </div>
        </div>
      </Header>
    );
  };

export default HeaderComponent;