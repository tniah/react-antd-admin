import { themeConstants, localStorageConstants } from '@/constants';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface State {
  theme: 'light' | 'dark';
  loading: boolean;
}

const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? themeConstants.DARK_THEME : themeConstants.LIGHT_THEME;
const userTheme = localStorage.getItem(localStorageConstants.THEME) as State['theme'];

const initialState: State = {
  theme: userTheme || systemTheme,
  loading: false,
}

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setGlobalState(state, action: PayloadAction<Partial<State>>) {
      if (action.payload.theme) {
        const body = document.body;

        if (action.payload.theme === themeConstants.DARK_THEME) {
          if (!body.hasAttribute('theme-node')) {
            body.setAttribute('theme-mode', themeConstants.DARK_THEME);
          }
        } else {
          if (body.hasAttribute('theme-mode')) {
            body.removeAttribute('theme-mode');
          }
        }
      }
      Object.assign(state, action.payload);
    },
  }
});

export const { setGlobalState } = globalSlice.actions;

export default globalSlice.reducer;