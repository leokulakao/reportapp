import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '@shopify/restyle';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import MonthReportItem from '../../components/month-report/MonthReportItem';
import ReportForm, {
  ReportFormRef,
} from '../../components/report-form/ReportForm';
import ScreenHeader from '../../components/ScreenHeader';
import ScreenSafeAreaContainer from '../../components/ScreenSafeAreaContainer';
import { ReportSaved } from '../../models';
import {
  selectMinutesPassedAlert,
  selectReportsByMonthView,
} from '../../store/reports/reportsSelectors';
import { doPassRemainingHours } from '../../store/reports/reportsService';
import Theme from '../../theme';
import { HomeStackParamList } from './HomeStack';

type Props = NativeStackScreenProps<HomeStackParamList, 'MonthReport'>;

const MonthReportScreen: React.FC<Props> = (props) => {
  const { route } = props;

  const dispatch = useDispatch();

  const year = route.params.year;
  const month = route.params.month;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [t, i18n] = useTranslation();

  const reportFormRef = useRef<ReportFormRef>(null);

  const [reportFormDataEdit, setReportFormDataEdit] = useState<ReportSaved>();

  const reportsByMonth = useSelector(selectReportsByMonthView(year, month));
  const minutesPassedAlertData = useSelector(
    selectMinutesPassedAlert(
      month === 0 ? year - 1 : year,
      month === 0 ? 11 : month - 1
    )
  );

  const theme = useTheme<Theme>();

  const passHours = useCallback(() => {
    doPassRemainingHours(dispatch, {
      year: year,
      month: month,
      minutesPassed: minutesPassedAlertData.minutesPassed,
      spetialMinutesPassed: minutesPassedAlertData.spetialMinutesPassed,
      reportRounded: minutesPassedAlertData.reportRounded,
      titleNext: i18n.t('Transferred to the next month'),
      titlePrev: i18n.t('Transferred from the previous month'),
    });
  }, [
    dispatch,
    minutesPassedAlertData.minutesPassed,
    minutesPassedAlertData.spetialMinutesPassed,
    minutesPassedAlertData.reportRounded,
    month,
    i18n,
    year,
  ]);

  useEffect(() => {
    if (
      reportsByMonth.reportsByDays.length === 0 &&
      minutesPassedAlertData.minutesPassed > 0 &&
      month === new Date().getMonth()
    ) {
      Alert.alert(
        i18n.t('Transfer minutes'),
        i18n.t('Do you want to transfer minutes from the previous month?') ||
          'Do you want to transfer minutes from the previous month?',
        [
          {
            text: i18n.t('Yes') || 'Yes',
            onPress: passHours,
          },
          {
            text: i18n.t('Cancel') || 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
        ]
      );
    }
  }, [reportsByMonth, minutesPassedAlertData, month, passHours, i18n]);

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
