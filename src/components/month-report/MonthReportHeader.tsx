import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  month: number;
};

const MonthReportHeader: React.FC<Props> = (props) => {
  const { month } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{month}</Text>
    </View>
  );
};

export default MonthReportHeader;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
  },
  text: {
    fontSize: 49,
  },
});
