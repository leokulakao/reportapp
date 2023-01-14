import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React from 'react';
import HeaderBackButton from '../../components/buttons/HeaderBackButton';
import { RootStackParamList } from '../../navigation/Navigation';
import HomeScreen from './HomeScreen';
import MonthReportScreen from './MonthReportScreen';

type Props = NativeStackScreenProps<RootStackParamList, 'Home', 'HomeStack'>;

const Stack = createNativeStackNavigator();

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
      <Stack.Screen name="HomeScreen" component={HomeScreen} />

      <Stack.Screen
        name="MonthReportScreen"
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
