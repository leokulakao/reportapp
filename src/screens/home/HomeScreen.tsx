import React from 'react';
import ScreenSafeAreaContainer from '../../components/ScreenSafeAreaContainer';
import { useTheme } from '@shopify/restyle';
import Theme from '../../theme';
import ReportForm from '../../components/report-form/ReportForm';
import MonthSlider from '../../components/month-slider/MonthSlider';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/Navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = (props) => {
  const { navigation } = props;
  const theme = useTheme<Theme>();
  // console.log(theme);
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
