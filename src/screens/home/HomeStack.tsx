import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React from 'react';
import HeaderBackButton from '../../components/buttons/HeaderBackButton';
import { NavigationTabParamList } from '../../navigation/Navigation';
import HomeScreen from './HomeScreen';
import MonthReportScreen from './MonthReportScreen';

type Props = NativeStackScreenProps<
  NavigationTabParamList,
  'Home',
  'HomeStack'
>;

export type HomeStackParamList = {
  Home: undefined;
  MonthReport: undefined;
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStack: React.FC<Props> = (props) => {
  const { navigation } = props;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
        headerLeft: () => <HeaderBackButton navigation={navigation} />,
      }}
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
    </Stack.Navigator>
  );
};

export default HomeStack;
