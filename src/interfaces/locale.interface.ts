import { Locale as AntdLocale } from 'antd/es/locale';
import { FC } from 'react';

export type Locale = 'vi_VN' | 'en_US';

export interface MenuItem {
  key: string;
  icon: FC;
  label: string;
  antdLocale: AntdLocale;
}

export interface MenuList {
  [key: string]: MenuItem;
}
