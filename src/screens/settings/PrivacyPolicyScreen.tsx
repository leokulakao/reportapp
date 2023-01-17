import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { useTranslation } from 'react-i18next';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import ScreenSafeAreaContainer from '../../components/ScreenSafeAreaContainer';
import Theme from '../../theme';
import { SettingsStackParamList } from './SettingsStack';
import ScreenHeader from '../../components/ScreenHeader';

type Props = NativeStackScreenProps<SettingsStackParamList, 'PrivacyPolicy'>;

const PrivacyPolicyScreen: React.FC<Props> = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const theme = useTheme<Theme>();

  return (
    <ScreenSafeAreaContainer
      style={styles(theme).screenContainer}
      disableSafeAreaEdges={['top']}
    >
      <>
        <ScreenHeader title={t('Privacy Policy')} />

        <View style={styles(theme).container}>
          <Text>...</Text>
        </View>
      </>
    </ScreenSafeAreaContainer>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    screenContainer: {
      backgroundColor: theme.colors.backgroundColor,
    },
    container: {
      paddingHorizontal: 25,
    },
  });

export default PrivacyPolicyScreen;
