import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '@shopify/restyle';
import React, { useRef, useState } from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import MonthReportHeader from '../../components/month-report/MonthReportHeader';
import MonthReportItem from '../../components/month-report/MonthReportItem';
import ReportForm, {
  ReportFormRef,
} from '../../components/report-form/ReportForm';
import ScreenSafeAreaContainer from '../../components/ScreenSafeAreaContainer';
import { selectReportsByMonth } from '../../store/reports/reportsSelectors';
import { ReportStorage } from '../../store/reports/reportsState';
import Theme from '../../theme';
import { HomeStackParamList } from './HomeStack';

type Props = NativeStackScreenProps<HomeStackParamList, 'MonthReport'>;

const MonthReportScreen: React.FC<Props> = (props) => {
  const { route } = props;

  const year = route.params.year;
  const month = route.params.month;
  const reportFormRef = useRef<ReportFormRef>(null);

  const [reportFormDataEdit, setReportFormDataEdit] = useState<ReportStorage>();

  const reportsByMonth = useSelector(selectReportsByMonth(year, month));

  const theme = useTheme<Theme>();

  return (
    <ScreenSafeAreaContainer
      style={{ backgroundColor: theme.colors.backgroundColor }}
      disableSafeAreaEdges={['top']}
    >
      <>
        <FlatList
          data={reportsByMonth.reportsByDays}
          ListHeaderComponent={() => <MonthReportHeader month={month} />}
          renderItem={({ item }) => (
            <MonthReportItem
              setReportFormDataEdit={setReportFormDataEdit}
              reportFormRef={reportFormRef}
              reports={item}
            />
          )}
          keyExtractor={(item) => item.day.toString()}
          // key={(key) => key}
        />
        <ReportForm
          reportData={reportFormDataEdit}
          ref={reportFormRef}
          hasAddButton={false}
        />
      </>
    </ScreenSafeAreaContainer>
  );
};

export default MonthReportScreen;

// const styles = StyleSheet.create({
//   screenContainer: {
//     backgroundColor: '#ffffff',
//   },
// });