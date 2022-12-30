import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { NavigationProp } from '@react-navigation/core';
import { useTranslation } from 'react-i18next';

import ScreenSafeAreaContainer from '../../components/ScreenSafeAreaContainer';

type Props = {
  navigation?: NavigationProp<any, any>;
};

const SettingsScreen: React.FC<Props> = () => {
  const { t } = useTranslation();

  return (
    <ScreenSafeAreaContainer style={styles.screenContainer}>
      <Text style={styles.title}>{t('Settings')}</Text>
    </ScreenSafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    // backgroundColor: THEME.BACKGROUND_COLOR,
    paddingHorizontal: 25,
    paddingTop: 30,
  },
  title: {
    marginBottom: 30,
    fontSize: 49,
    lineHeight: 58,
  },
});

export default SettingsScreen;
