import { enUS_component } from '@/locales/en-US/component';
import { enUS_globalTips } from '@/locales/en-US/global/tips';
import { enUS_oauthClientPage } from '@/locales/en-US/page/oauthClient';
import { enUS_avatarDropdownMenu } from '@/locales/en-US/user/avatarDropdownMenu';

const en_US = {
  ...enUS_globalTips,
  ...enUS_avatarDropdownMenu,
  ...enUS_component,
  ...enUS_oauthClientPage,
};

export default en_US;