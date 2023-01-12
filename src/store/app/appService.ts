import { AppStateStatus } from 'react-native';
import { Dispatch } from 'redux';
import { ThemeNames } from '../../theme';
import { changeAppState, changeTheme } from './appSlice';

export function doChangeAppState(dispatch: Dispatch, state: AppStateStatus) {
  try {
    dispatch(changeAppState(state));
  } catch (e) {
    console.log(e);
  }
}
export function doChangeThemeState(dispatch: Dispatch, theme: ThemeNames) {
  try {
    dispatch(changeTheme(theme));
  } catch (e) {
    console.log(e);
  }
}
