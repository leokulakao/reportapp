import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {};

const MonthReportHeader: React.FC<Props> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{'123'}</Text>
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
