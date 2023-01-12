import { createSelector } from '@reduxjs/toolkit';
import { AppState } from './appState';

const appState = (state: AppState) => state.app.appState;
const theme = (state: AppState) => state.app.theme;

export const selectAppState = () => createSelector(appState, (_) => _);
export const selectThemeState = () => createSelector(theme, (_) => _);
