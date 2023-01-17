import { createSelector } from '@reduxjs/toolkit';
import { ThemeNames } from '../../theme';
import { RootState } from '../rootState';
// import { AppState } from './appState';

const appState = (state: RootState) => state.app.appState;
const theme = (state: RootState) => state.app.theme;

export const selectAppState = () => createSelector(appState, (_) => _);
export const selectThemeState = () =>
  createSelector(theme, (_: ThemeNames) => _);
