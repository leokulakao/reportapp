import React, { RefObject } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@shopify/restyle';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { useActionSheet } from '@expo/react-native-action-sheet';

import { ReportsByDays, ReportStorage } from '../../store/reports/reportsState';
import { doDeleteReportById } from '../../store/reports/reportsService';
import { ReportFormRef } from '../report-form/ReportForm';
import Theme from '../../theme';
import { dateToLocale } from '../../utils/date';
import i18n from '../../../localization';

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
  const theme = useTheme<Theme>();

  const handleActionSheet = (selectedReport: ReportStorage) => {
    const options = [i18n.t('Delete'), i18n.t('Edit'), i18n.t('Cancel')];
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
    <View style={styles(theme).container}>
      <View style={styles(theme).title}>
        <Text style={styles(theme).titleText}>{reports?.day}</Text>
      </View>
      {reports.reports.length > 0 ? (
        reports.reports.map((report, index) => (
          <View style={styles(theme).item} key={index}>
            <Text style={styles(theme).itemText}>
              {report.title === ''
                ? dateToLocale(new Date(report.date))
                : report.title}
            </Text>
            <View style={styles(theme).actionContainer}>
              <TouchableOpacity onPress={() => handleActionSheet(report)}>
                <Icon
                  name="ellipsis-horizontal-outline"
                  size={22}
                  color={theme.colors.secondaryIconColor}
                />
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

const styles = (theme: Theme) =>
  StyleSheet.create({
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
      fontSize: 14,
      color: theme.colors.secondaryTextColor,
    },
    item: {
      flexDirection: 'row',
      paddingTop: 15,
      paddingBottom: 15,
      paddingLeft: 20,
      paddingRight: 20,
      backgroundColor: theme.colors.cardItemColor,
    },
    actionContainer: {
      marginLeft: 'auto',
    },
    itemText: {
      fontSize: 14,
      lineHeight: 22,
      color: theme.colors.textColor,
    },
  });
