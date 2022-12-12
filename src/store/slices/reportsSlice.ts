import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppState } from '../models';

const initialState: AppState = {
  appState: 'unknown',
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    changeAppState: (state: AppState, action: PayloadAction<AppState>) => {
      const payload = action.payload;
      state.appState = payload.appState;
    },
  },
});

export const { changeAppState } = appSlice.actions;

export default appSlice.reducer;
