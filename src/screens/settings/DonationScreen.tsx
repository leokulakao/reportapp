import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View, Text, Platform } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { useTranslation } from 'react-i18next';

import { SettingsStackParamList } from './SettingsStack';
import Theme from '../../theme';
import ScreenSafeAreaContainer from '../../components/ScreenSafeAreaContainer';
import ScreenHeader from '../../components/ScreenHeader';
import MainButton from '../../components/buttons/MainButton';
import ComingSoon from '../../components/ComingSoon';

type Props = NativeStackScreenProps<SettingsStackParamList, 'Donation'>;

const DonationScreen: React.FC<Props> = ({ navigation }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const theme = useTheme<Theme>();

  return (
    <ScreenSafeAreaContainer
      style={styles(theme).screenContainer}
      disableSafeAreaEdges={['top']}
    >
      {Platform.OS === 'ios' ? (
        <ComingSoon />
      ) : (
        <>
          <ScreenHeader title={t('Donations')} />

          <View style={styles(theme).buttonContainer}>
            <MainButton
              text={t('Contribute')}
              icon="heart"
              onPress={() => navigation?.navigate('PayPal')}
              style={styles(theme).button}
              iconColor="white"
              textColor="white"
            />
          </View>

          <View style={styles(theme).aboutUsContainer}>
            <Text style={styles(theme).aboutUsTitle}>About us</Text>
            <Text style={styles(theme).aboutUsText}>
              We are a small app development team. Thank you very much for using
              our app. We made it with a lot of love and affection. We decided
              that the app is free so that you can use it without problems. Even
              so, we would appreciate it if you would help us with a donation to
              be able to continue updating and improving the app. Thank you!
              Arsen and Lev.
            </Text>
          </View>
        </>
      )}
    </ScreenSafeAreaContainer>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    screenContainer: {
      backgroundColor: theme.colors.backgroundColor,
    },
    buttonContainer: {
      marginTop: 15,
      paddingHorizontal: 25,
      marginBottom: 30,
    },
    button: {
      backgroundColor: theme.colors.pinkColor,
    },
    aboutUsContainer: {
      paddingHorizontal: 25,
      paddingVertical: 35,
      backgroundColor: theme.colors.secondaryBackgroundColor,
    },
    aboutUsTitle: {
      fontSize: 28,
      lineHeight: 34,
      color: theme.colors.textColor,
      marginBottom: 22,
    },
    aboutUsText: {
      fontSize: 12,
      lineHeight: 20,
      color: theme.colors.textColor,
    },
  });

export default DonationScreen;
