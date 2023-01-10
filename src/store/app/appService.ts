import { AppStateStatus } from 'react-native';
import { Dispatch } from 'redux';
import { changeAppState } from './appSlice';

export function doChangeAppState(dispatch: Dispatch, state: AppStateStatus) {
  try {
    dispatch(changeAppState({ appState: state }));
  } catch (e) {
    console.log(e);
  }
}
