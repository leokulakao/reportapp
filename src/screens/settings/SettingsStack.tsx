import React from 'react';
import { NavigationProp } from '@react-navigation/core';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BackupScreen from './BackupScreen';

import SettingsScreen from './SettingsScreen';
import { HeaderBackButton } from '../../components/buttons/HeaderBackButton';

type Props = {
  navigation?: NavigationProp<any, any>;
};

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
