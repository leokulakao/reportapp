import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ReportsByDays } from '../../store/reports/reportsState';
import Icon from 'react-native-vector-icons/Ionicons';
import { useActionSheet } from '@expo/react-native-action-sheet';

type Props = {
  reports: ReportsByDays;
};

const MonthReportItem: React.FC<Props> = (props) => {
  const { reports } = props;
  const { showActionSheetWithOptions } = useActionSheet();

  const handleActionSheet = () => {
    const options = ['Delete', 'Save', 'Cancel'];
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
            // Save
            break;

          case destructiveButtonIndex:
            // Delete
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
                ? new Date(report.date).toISOString()
                : report.title}
            </Text>
            <View style={styles.actionContainer}>
              <TouchableOpacity onPress={handleActionSheet}>
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
