import React, { RefObject } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ReportsByDays, ReportStorage } from '../../store/reports/reportsState';
import Icon from 'react-native-vector-icons/Ionicons';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { doDeleteReportById } from '../../store/reports/reportsService';
import { useDispatch } from 'react-redux';
import { ReportFormRef } from '../report-form/ReportForm';
import { dateToLocale } from '../../utils/date';

type Props = {
  reports: ReportsByDays;
  setReportFormDataEdit: React.Dispatch<
    React.SetStateAction<ReportStorage | undefined>
  >;
  reportFormRef: RefObject<ReportFormRef>;
};

const MonthReportItem: React.FC<Props> = (props) => {
  const { reports, setReportFormDataEdit, reportFormRef } = props;
  const { showActionSheetWithOptions } = useActionSheet();
  const dispatch = useDispatch();

  const handleActionSheet = (selectedReport: ReportStorage) => {
    const options = ['Delete', 'Edit', 'Cancel'];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (selectedIndex: number | undefined) => {
        switch (selectedIndex) {
          case 1:
            setReportFormDataEdit(selectedReport);
            reportFormRef.current?.open();
            break;

          case destructiveButtonIndex:
            doDeleteReportById(dispatch, selectedReport.id);
            break;

          case cancelButtonIndex:
          // Canceled
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>{reports?.day}</Text>
      </View>
      {reports.reports.length > 0 ? (
        reports.reports.map((report) => (
          <View style={styles.item} key={report.date}>
            <Text style={styles.itemText}>
              {report.title === ''
                ? dateToLocale(new Date(report.date))
                : report.title}
            </Text>
            <View style={styles.actionContainer}>
              <TouchableOpacity onPress={() => handleActionSheet(report)}>
                <Icon name="ellipsis-horizontal-outline" size={24} />
              </TouchableOpacity>
            </View>
          </View>
        ))
      ) : (
        <></>
      )}
    </View>
  );
};

export default MonthReportItem;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
  },
  title: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  titleText: {
    fontSize: 18,
    color: '#AAAEB2',
  },
  item: {
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#EBEEF2',
  },
  actionContainer: {
    marginLeft: 'auto',
  },
  itemText: {
    fontSize: 18,
  },
});
