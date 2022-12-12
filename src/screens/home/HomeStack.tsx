import { NavigationProp } from '@react-navigation/core';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from './HomeScreen';

type Props = {
  navigation?: NavigationProp<any, any>;
};

const Stack = createNativeStackNavigator();

const HomeStack: React.FC<Props> = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
        // headerLeft: () => <HeaderBackButton navigation={navigation} />,
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />

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

export default HomeStack;
