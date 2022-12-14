import React from 'react';
import { NavigationProp } from '@react-navigation/core';
import ScreenSafeAreaContainer from '../../components/ScreenSafeAreaContainer';
import { useTheme } from '@shopify/restyle';
import Theme from '../../theme';
import ReportForm from '../../components/report-form/ReportForm';

type Props = {
  navigation?: NavigationProp<any, any>;
};

const HomeScreen: React.FC<Props> = () => {
  const theme = useTheme<Theme>();
  console.log(theme);
  return (
    <ScreenSafeAreaContainer
      style={{ backgroundColor: theme.colors.homeBackground }}
    >
      <ReportForm hasAddButton={true} />
    </ScreenSafeAreaContainer>
  );
};

export default HomeScreen;

// const styles = StyleSheet.create({
//   screenContainer: {
//     backgroundColor: ,
//   },
// });
