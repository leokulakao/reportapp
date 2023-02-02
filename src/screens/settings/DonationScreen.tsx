import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View, Text } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { useTranslation } from 'react-i18next';

import { SettingsStackParamList } from './SettingsStack';
import Theme from '../../theme';
import ScreenSafeAreaContainer from '../../components/ScreenSafeAreaContainer';
import ScreenHeader from '../../components/ScreenHeader';
import MainButton from '../../components/buttons/MainButton';

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
      <>
        <ScreenHeader title="Donations" />

        <View style={styles(theme).buttonContainer}>
          <MainButton
            text="Donate"
            icon="heart"
            onPress={() => navigation?.navigate('PayPal')}
            style={styles(theme).button}
            iconColor="white"
            textColor="white"
          />
        </View>

        <View style={styles(theme).aboutUsContainer}>
          <Text style={styles(theme).aboutUsTitle}>Sobre Nosotros</Text>
          <Text style={styles(theme).aboutUsText}>
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor
            at Hampden-Sydney College in Virginia, looked up one of the more
            obscure Latin words, consectetur, from a Lorem Ipsum passage, and
            going through the cites of the word in classical literature,
            discovered the undoubtable source. Lorem Ipsum comes from sections
            1.10.32 and 1.10.33 of “de Finibus Bonorum et Malorum” (The Extremes
            of Good and Evil) by Cicero, written in 45 BC. This book is a
            treatise on the theory of ethics, very popu
          </Text>
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
    buttonContainer: {
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
      fontSize: 14,
      lineHeight: 18,
      color: theme.colors.textColor,
    },
  });

export default DonationScreen;
