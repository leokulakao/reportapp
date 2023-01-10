import { createSelector } from '@reduxjs/toolkit';
import { AppState } from './appState';

const appState = (state: AppState) => state.appState;

export const selectAppState = () => createSelector(appState, (_) => _);
