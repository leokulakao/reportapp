import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React from 'react';
import { useTheme } from '@shopify/restyle';

import { NavigationTabParamList } from '../../navigation/Navigation';
import HeaderBackButton from '../../components/buttons/HeaderBackButton';
import SettingsScreen from './SettingsScreen';
import BackupScreen from './BackupScreen';
import DonationScreen from './DonationScreen';
import PrivacyPolicyScreen from './PrivacyPolicyScreen';
import Theme from '../../theme';
import PayPalScreen from './PayPalScreen';

type Props = NativeStackScreenProps<
  NavigationTabParamList,
  'Settings',
  'SettingsStack'
>;

export type SettingsStackParamList = {
  SettingsScreen: undefined;
  Backup: undefined;
  Donation: undefined;
  PrivacyPolicy: undefined;
  PayPal: undefined;
};

const Stack = createNativeStackNavigator<SettingsStackParamList>();

const SettingsStack: React.FC<Props> = () => {
  const theme = useTheme<Theme>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: theme.colors.backgroundColor,
        },
      }}
    >
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />

      <Stack.Screen
        name="Backup"
        component={BackupScreen}
        options={({ navigation }) => ({
          headerShown: true,
          title: '',
          headerLeft: () => <HeaderBackButton onPress={navigation.goBack} />,
        })}
      />

      <Stack.Screen
        name="Donation"
        component={DonationScreen}
        options={({ navigation }) => ({
          headerShown: true,
          title: '',
          headerLeft: () => <HeaderBackButton onPress={navigation.goBack} />,
        })}
      />

      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicyScreen}
        options={({ navigation }) => ({
          headerShown: true,
          title: '',
          headerLeft: () => <HeaderBackButton onPress={navigation.goBack} />,
          presentation: 'modal',
        })}
      />
      <Stack.Screen
        name="PayPal"
        component={PayPalScreen}
        options={({ navigation }) => ({
          headerShown: true,
          title: '',
          headerLeft: () => <HeaderBackButton onPress={navigation.goBack} />,
          presentation: 'modal',
        })}
      />
    </Stack.Navigator>
  );
};

export default SettingsStack;
