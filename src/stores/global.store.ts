import { themeConstants, localStorageConstants } from '@/constants';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface State {
  theme: string;
  loading: boolean;
}

const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? themeConstants.DARK : themeConstants.LIGHT;
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

        if (action.payload.theme === themeConstants.DARK) {
          if (!body.hasAttribute('theme-node')) {
            body.setAttribute('theme-mode', themeConstants.DARK);
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