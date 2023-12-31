import { localeConstants, localStorageConstants } from '@/constants';
import { Locale } from '@/interfaces/locale.interface';
import { UserState } from '@/interfaces/user.interface';
import { getGlobalState } from '@/utils/getGlobalState';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: UserState = {
  ...getGlobalState(),
  username: '',
  avatarUrl: '',
  locale: (localStorage.getItem(localStorageConstants.LOCALE) || localeConstants.VI_VN) as Locale,
  menuList: [],
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserState(state, action: PayloadAction<Partial<UserState>>) {
      Object.assign(state, action.payload);
    }
  },
});

export const { setUserState } = userSlice.actions;

export default userSlice.reducer;
