import { Locale } from '@/interfaces/locale.interface';

export interface UserInfo {
  name: string;
  avatarUrl: string;
  roles: string[];
}

export interface UserState {
  /** menu collapsed status */
  collapsed: boolean;

  /** user's language */
  locale: Locale;
}