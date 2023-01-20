import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '@shopify/restyle';
import React from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import MonthReportHeader from '../../components/month-report/MonthReportHeader';
import MonthReportItem from '../../components/month-report/MonthReportItem';
import ScreenSafeAreaContainer from '../../components/ScreenSafeAreaContainer';
import { selectReportsByMonth } from '../../store/reports/reportsSelectors';
import Theme from '../../theme';
import { HomeStackParamList } from './HomeStack';

type Props = NativeStackScreenProps<HomeStackParamList, 'MonthReport'>;

const MonthReportScreen: React.FC<Props> = (props) => {
  const { route } = props;

  const year = route.params.year;
  const month = route.params.month;

  const reportsByMonth = useSelector(selectReportsByMonth(year, month));

  const theme = useTheme<Theme>();

  return (
    <ScreenSafeAreaContainer
      style={{ backgroundColor: theme.colors.backgroundColor }}
      disableSafeAreaEdges={['top']}
    >
      <FlatList
        data={reportsByMonth.reportsByDays}
        ListHeaderComponent={() => <MonthReportHeader month={month} />}
        renderItem={({ item }) => <MonthReportItem reports={item} />}
        keyExtractor={(item) => item.day.toString()}
        // key={(key) => key}
      />
    </ScreenSafeAreaContainer>
  );
};

export default MonthReportScreen;

// const styles = StyleSheet.create({
//   screenContainer: {
//     backgroundColor: '#ffffff',
//   },
// });
