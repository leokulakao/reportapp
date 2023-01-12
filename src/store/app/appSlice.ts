import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppStateStatus } from 'react-native';
import { ThemeNames } from '../../theme';

import { AppState } from './appState';

const initialState: AppState = {
  appState: 'unknown',
  theme: 'light',
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    changeAppState: (
      state: AppState,
      action: PayloadAction<AppStateStatus>
    ) => {
      const payload = action.payload;
      state.appState = payload;
    },
    changeTheme: (state: AppState, action: PayloadAction<ThemeNames>) => {
      const payload = action.payload;
      state.theme = payload;
    },
  },
});

export const { changeAppState, changeTheme } = appSlice.actions;

export default appSlice.reducer;
