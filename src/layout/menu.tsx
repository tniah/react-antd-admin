import { deviceConstants } from '@/constants';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { MenuList } from '@/interfaces/menu.interface';
import { setUserState } from '@/stores/user.store';
import { Menu } from 'antd';
import type { FC } from 'react';
import React, { createElement } from 'react';
import { useNavigate } from 'react-router';

export interface MenuProps {
  menuList: MenuList;
  openKey?: string;
  onChangeOpenKey: (key?: string) => void;
  selectedKey: string;
  onChangeSelectedKey: (key: string) => void;
}

const MenuComponent: FC<MenuProps> = props => {
  const { menuList, openKey, onChangeOpenKey, selectedKey, onChangeSelectedKey } = props;
  const { device } = useAppSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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

    if (device !== deviceConstants.DESKTOP) {
      dispatch(setUserState({ collapsed: true }));
    }
  };

  const onOpenChange = (keys: string[]) => {
    const key = keys.pop();
    onChangeOpenKey(key);
  };

  return (
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
    ></Menu>
  );
};

export default MenuComponent;