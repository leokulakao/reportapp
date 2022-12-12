import React from 'react';
import { useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { useDispatch } from 'react-redux';
import { changeAppState } from '../store/slices/reportsSlice';

const LogicCore = () => {
  const dispatch = useDispatch();
  const _appState = useRef(AppState.currentState);

  const _handleAppStateChange = (state: AppStateStatus) => {
    // if (_appState.current.match(/inactive|background/) && state === 'active') {
    //   doAppStateChange(dispatch, 'foreground');
    // }
    _appState.current = state;
    dispatch(changeAppState({ appState: state }));
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
