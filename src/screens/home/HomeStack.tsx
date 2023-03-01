import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React from 'react';
import { useTheme } from '@shopify/restyle';

import HeaderBackButton from '../../components/buttons/HeaderBackButton';
import { NavigationTabParamList } from '../../navigation/Navigation';
import Theme from '../../theme';
import HomeScreen from './HomeScreen';
import MonthReportScreen from './MonthReportScreen';
import ReportForm from '../../components/report-form/ReportForm';

// import type { StackNavigationOptions } from '@react-navigation/stack';

export type Props = NativeStackScreenProps<
  NavigationTabParamList,
  'Home',
  'HomeStack'
>;

export type HomeStackParamList = {
  HomeScreen: undefined;
  MonthReport: {
    year: number;
    month: number;
    initialDate: Date;
  };
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStack: React.FC<Props> = () => {
  const theme = useTheme<Theme>();

  return (
    <Stack.Navigator>
      <Stack.Group
        screenOptions={({ navigation }) => ({
          headerShown: false,
          headerShadowVisible: false,
          headerLeft: () => <HeaderBackButton onPress={navigation.goBack} />,
        })}
      >
        <Stack.Screen name="HomeScreen" component={HomeScreen} />

        <Stack.Screen
          name="MonthReport"
          component={MonthReportScreen}
          options={({ route }) => ({
            headerShown: true,
            title: '',
            headerStyle: {
              backgroundColor: theme.colors.backgroundColor,
            },
            headerRight: () => (
              <ReportForm
                hasAddButton={true}
                headerButton={true}
                initialDate={route.params.initialDate}
              />
            ),
            // presentation: 'modal',
          })}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default HomeStack;
