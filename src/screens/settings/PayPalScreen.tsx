import React from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { useTranslation } from 'react-i18next';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { WebView } from 'react-native-webview';

import ScreenSafeAreaContainer from '../../components/ScreenSafeAreaContainer';
import Theme from '../../theme';
import { SettingsStackParamList } from './SettingsStack';

type Props = NativeStackScreenProps<SettingsStackParamList, 'PayPal'>;

const PayPalScreen: React.FC<Props> = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const theme = useTheme<Theme>();

  return (
    <ScreenSafeAreaContainer
      style={styles(theme).screenContainer}
      disableSafeAreaEdges={['top']}
    >
      <>
        <WebView
          source={{
            uri: 'https://www.paypal.com/donate/?hosted_button_id=2FEY4RET33XA4',
          }}
        />
      </>
    </ScreenSafeAreaContainer>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    screenContainer: {
      backgroundColor: theme.colors.backgroundColor,
    },
  });

export default PayPalScreen;
