import React from 'react';
import { NavigationProp } from '@react-navigation/core';
import ScreenSafeAreaContainer from '../../components/ScreenSafeAreaContainer';

type Props = {
  navigation?: NavigationProp<any, any>;
};

const SettingsScreen: React.FC<Props> = () => {
  return (
    <ScreenSafeAreaContainer>
      <></>
    </ScreenSafeAreaContainer>
  );
};

export default SettingsScreen;
