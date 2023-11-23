import { MenuList } from '@/interfaces/layout/menu.interface';
import { Layout, Menu, theme as antTheme } from 'antd';
import type { FC } from 'react';
import React, { createElement } from 'react';
import { useNavigate } from 'react-router';

const { Sider } = Layout;

interface MenuProps {
  collapsed: boolean;
  menuList: MenuList;
  openKey?: string;
  onChangeOpenKey: (key?: string) => void;
  selectedKey: string;
  onChangeSelectedKey: (key: string) => void;
}

const SiderComponent: FC<MenuProps> = props => {
  const { collapsed, menuList, openKey, onChangeOpenKey, selectedKey, onChangeSelectedKey } = props;
  console.log("selectedKey ", selectedKey);
  console.log("openKey ", openKey);
  const navigate = useNavigate();
  const token = antTheme.useToken();

  const getTitle = (menu: MenuList[0]) => {
    return (
      <span style={ { display: 'flex', alignItems: 'center' } }>
        <span className="anticon">{ createElement(menu.icon) }</span>
        <span>{ menu.label }</span>
      </span>
    );
  };

  const onMenuClick = (path: string) => {
    onChangeSelectedKey(path);
    navigate(path);
  };

  const onOpenChange = (keys: string[]) => {
    const key = keys.pop();
    onChangeOpenKey(key);
  };

  return (
    <Sider
      className="layout-page-sider"
      trigger={ null }
      collapsible
      style={ { backgroundColor: token.token.colorBgContainer } }
      collapsedWidth={ 80 }
      collapsed={ collapsed }
      width={ 250 }
      breakpoint="md"
    >
      <Menu
        mode="inline"
        selectedKeys={ [ selectedKey ] }
        openKeys={ openKey ? [ openKey ] : [] }
        onOpenChange={ onOpenChange }
        onSelect={ k => onMenuClick(k.key) }
        className="layout-page-sider-menu text-2"
        items={ menuList.map(menu => {
          return menu.children
            ? {
              key: menu.code,
              label: getTitle(menu),
              children: menu.children.map(child => ({
                key: child.path,
                label: child.label,
              })),
            }
            : {
              key: menu.path,
              label: getTitle(menu),
            }
        }) }
      >
      </Menu>
    </Sider>
  );
}

export default SiderComponent;