import EnFlagSvg from '@/assets/images/flags/en.svg?react';
import VnFlagSvg from '@/assets/images/flags/vi.svg?react';
import { localeConstants } from '@/constants';
import { MenuList } from '@/interfaces/locale.interface';
import en_US from '@/locales/en-US';
import vi_VN from '@/locales/vi-VN';
import antd_en_US from 'antd/es/locale/en_US';
import antd_vi_VN from 'antd/es/locale/vi_VN';


const { VI_VN, EN_US } = localeConstants;

export const localeConfig = {
  vi_VN: vi_VN,
  en_US: en_US,
};

export const locales: MenuList = {
  vi_VN: {
    key: VI_VN,
    icon: VnFlagSvg,
    label: 'Tiếng Việt',
    antdLocale: antd_vi_VN,
  },
  en_US: {
    key: EN_US,
    icon: EnFlagSvg,
    label: 'English',
    antdLocale: antd_en_US,
  },
};
