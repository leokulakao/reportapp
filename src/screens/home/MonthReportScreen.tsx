import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '@shopify/restyle';
import React, { useRef, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import MonthReportItem from '../../components/month-report/MonthReportItem';
import ReportForm, {
  ReportFormRef,
} from '../../components/report-form/ReportForm';
import ScreenHeader from '../../components/ScreenHeader';
import ScreenSafeAreaContainer from '../../components/ScreenSafeAreaContainer';
import { ReportSaved } from '../../models';
import { selectReportsByMonthView } from '../../store/reports/reportsSelectors';
import Theme from '../../theme';
import { HomeStackParamList } from './HomeStack';

type Props = NativeStackScreenProps<HomeStackParamList, 'MonthReport'>;

const MonthReportScreen: React.FC<Props> = (props) => {
  const { route } = props;

  const year = route.params.year;
  const month = route.params.month;
  const reportFormRef = useRef<ReportFormRef>(null);

  const [reportFormDataEdit, setReportFormDataEdit] = useState<ReportSaved>();

  const reportsByMonth = useSelector(selectReportsByMonthView(year, month));

  const theme = useTheme<Theme>();

  return (
    <ScreenSafeAreaContainer
      style={{ backgroundColor: theme.colors.backgroundColor }}
      disableSafeAreaEdges={['top']}
    >
      <>
        <FlatList
          data={reportsByMonth.reportsByDays}
          ListHeaderComponent={() => <ScreenHeader title={`month-${month}`} />}
          renderItem={({ item, index }) => (
            <MonthReportItem
              setReportFormDataEdit={setReportFormDataEdit}
              reportFormRef={reportFormRef}
              reports={item}
              key={index}
            />
          )}
          contentContainerStyle={styles.listContainer}
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

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 85,
  },
});
