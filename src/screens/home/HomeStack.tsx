import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React from 'react';
import HeaderBackButton from '../../components/buttons/HeaderBackButton';
import { NavigationTabParamList } from '../../navigation/Navigation';
import HomeScreen from './HomeScreen';
import MonthReportScreen from './MonthReportScreen';

// import type { StackNavigationOptions } from '@react-navigation/stack';

export type Props = NativeStackScreenProps<
  NavigationTabParamList,
  'Home',
  'HomeStack'
>;

export type HomeStackParamList = {
  Home: undefined;
  MonthReport: {
    year: number;
    month: number;
  };
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStack: React.FC<Props> = () => {
  return (
    <Stack.Navigator>
      <Stack.Group
        screenOptions={({ navigation }) => ({
          headerShown: false,
          headerShadowVisible: false,
          headerLeft: () => <HeaderBackButton onPress={navigation.goBack} />,
        })}
      >
        <Stack.Screen name="Home" component={HomeScreen} />

        <Stack.Screen
          name="MonthReport"
          component={MonthReportScreen}
          options={{
            headerShown: true,
            title: '',
            // presentation: 'modal',
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default HomeStack;
