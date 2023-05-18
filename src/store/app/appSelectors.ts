import { createSelector } from '@reduxjs/toolkit';
import { ThemeNames } from '../../theme';
import { RootState } from '../rootState';

const appState = (state: RootState) => state.app.appState;
const appAppearance = (state: RootState) => state.app.appAppearance;
const theme = (state: RootState) => state.app.theme;

export const selectAppState = () => createSelector(appState, (_) => _);
export const selectAppAppearance = () =>
  createSelector(appAppearance, (_) => _);
export const selectThemeState = () =>
  createSelector(theme, (_: ThemeNames) => _);
