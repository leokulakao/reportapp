import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  month: number;
};

const MonthReportHeader: React.FC<Props> = (props) => {
  const { month } = props;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [t, i18n] = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{t(`month-${month}`)}</Text>
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
