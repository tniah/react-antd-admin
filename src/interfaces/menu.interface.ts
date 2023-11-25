import type { FC } from 'react';

interface MenuItem {
  code: string;
  icon: FC;
  label: string;
  path: string;
  children?: MenuItem[];
}

export type MenuChild = Omit<MenuItem, 'children'>;

export type MenuList = MenuItem[];