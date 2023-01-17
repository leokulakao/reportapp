import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React from 'react';
import { NavigationTabParamList } from '../../navigation/Navigation';

import HeaderBackButton from '../../components/buttons/HeaderBackButton';
import SettingsScreen from './SettingsScreen';
import BackupScreen from './BackupScreen';

type Props = NativeStackScreenProps<
  NavigationTabParamList,
  'Settings',
  'SettingsStack'
>;

export type SettingsStackParamList = {
  Settings: undefined;
  Backup: undefined;
  PrivacyPolicy: undefined;
};

const Stack = createNativeStackNavigator<SettingsStackParamList>();

const SettingsStack: React.FC<Props> = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="Settings" component={SettingsScreen} />

      <Stack.Screen
        name="Backup"
        component={BackupScreen}
        options={({ navigation }) => ({
          headerShown: true,
          title: '',
          headerLeft: () => <HeaderBackButton onPress={navigation.goBack} />,
        })}
      />
    </Stack.Navigator>
  );
};

export default SettingsStack;
