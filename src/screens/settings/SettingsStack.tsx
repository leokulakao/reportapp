import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React from 'react';
import { RootStackParamList } from '../../navigation/Navigation';

import SettingsScreen from './SettingsScreen';
import { HeaderBackButton } from '../../components/buttons/HeaderBackButton';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'Settings',
  'SettingsStack'
>;

const Stack = createNativeStackNavigator();

const SettingsStack: React.FC<Props> = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />

      <Stack.Screen
        name="BackupScreen"
        component={BackupScreen}
        options={{
          headerShown: true,
          title: '',
          headerLeft: () => <HeaderBackButton onPress={() => navigation?.popToTop()} />
        }}
      />
    </Stack.Navigator>
  );
};

export default SettingsStack;
