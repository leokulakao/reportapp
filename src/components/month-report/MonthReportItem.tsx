import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  item: any;
};

const MonthReportItem: React.FC<Props> = (props) => {
  const { item } = props;
  return (
    <View style={styles.container}>
      <Text>{item}</Text>
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
