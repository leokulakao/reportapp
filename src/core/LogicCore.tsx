import React from 'react';
import { useEffect, useRef } from 'react';
import { Appearance, AppState, AppStateStatus } from 'react-native';
import { useDispatch } from 'react-redux';
import {
  doChangeAppState,
  doChangeAppAppearance,
} from '../store/app/appService';

const LogicCore = () => {
  const dispatch = useDispatch();
  const _appState = useRef(AppState.currentState);

  const _handleAppStateChange = (state: AppStateStatus) => {
    // if (_appState.current.match(/inactive|background/) && state === 'active') {
    //   doAppStateChange(dispatch, 'foreground');
    // }
    const appearanceTheme = Appearance.getColorScheme();
    _appState.current = state;
    doChangeAppAppearance(dispatch, appearanceTheme);
    doChangeAppState(dispatch, state);
  };

  // Main useEffect
  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      _handleAppStateChange
    );
    return () => {
      subscription.remove();
    };
  });

  return <></>;
};
export default LogicCore;
