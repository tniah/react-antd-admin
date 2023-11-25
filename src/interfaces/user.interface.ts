import { Locale } from '@/interfaces/locale.interface';
import { MenuChild } from '@/interfaces/menu.interface';


export interface UserState {
  /** username of the user **/
  username: string;

  /** avatar URL of the user **/
  avatarUrl?: string;

  /** menu collapsed status */
  collapsed: boolean;

  /** user's language */
  locale: Locale;

  /** menu list for init tagsView */
  menuList: MenuChild[];
}