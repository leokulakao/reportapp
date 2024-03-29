import React from 'react';
import { useTheme } from '@shopify/restyle';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import Theme from '../../theme';
import ReportForm from '../../components/report-form/ReportForm';
import MonthSlider from '../../components/month-slider/MonthSlider';
import { HomeStackParamList } from './HomeStack';
import ScreenSafeAreaContainer from '../../components/ScreenSafeAreaContainer';

type Props = NativeStackScreenProps<HomeStackParamList, 'HomeScreen'>;

const HomeScreen: React.FC<Props> = (props) => {
  const { navigation } = props;
  const theme = useTheme<Theme>();
  return (
    <ScreenSafeAreaContainer
      style={{ backgroundColor: theme.colors.secondaryBackgroundColor }}
    >
      <>
        <MonthSlider navigation={navigation} />
        <ReportForm hasAddButton={true} />
      </>
    </ScreenSafeAreaContainer>
  );
};

export default HomeScreen;

// const styles = StyleSheet.create({
//   screenContainer: {
//     backgroundColor: ,
//   },
// });
