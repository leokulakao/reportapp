import { NavigationProp } from '@react-navigation/core';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import SettingsScreen from './SettingsScreen';

type Props = {
  navigation?: NavigationProp<any, any>;
};

const Stack = createNativeStackNavigator();

const SettingsStack: React.FC<Props> = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />

      {/* <Stack.Screen
        name="MonthReportScreen"
        // component={MonthReportScreen}
        options={{
          headerShown: true,
          title: '',
        }}
      /> */}
    </Stack.Navigator>
  );
};

export default SettingsStack;
