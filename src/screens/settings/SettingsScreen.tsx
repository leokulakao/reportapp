import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { NavigationProp } from '@react-navigation/core';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@shopify/restyle';

import ScreenSafeAreaContainer from '../../components/ScreenSafeAreaContainer';
import Theme from '../../theme';

type Props = {
  navigation?: NavigationProp<any, any>;
};

const SettingsScreen: React.FC<Props> = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const theme = useTheme<Theme>();

  return (
    <ScreenSafeAreaContainer style={styles(theme).screenContainer}>
      <Text style={styles(theme).title}>{t('Settings')}</Text>
    </ScreenSafeAreaContainer>
  );
};

const styles = (theme: any) =>
  StyleSheet.create({
    screenContainer: {
      backgroundColor: theme.colors.backgroundColor,
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
