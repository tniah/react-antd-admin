import type { FC } from 'react';

interface MenuItem {
  code: string;
  icon: FC;
  label: string;
  path: string;
  children?: MenuItem[];
}

export type MenuList = MenuItem[];