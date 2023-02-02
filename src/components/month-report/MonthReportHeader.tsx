import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@shopify/restyle';

import Theme from '../../theme';

type Props = {
  month: number;
};

const MonthReportHeader: React.FC<Props> = (props) => {
  const { month } = props;
  const theme = useTheme<Theme>();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [t, i18n] = useTranslation();

  return (
    <View style={styles(theme).container}>
      <Text style={styles(theme).text}>{t(`month-${month}`)}</Text>
    </View>
  );
};

export default MonthReportHeader;

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      paddingTop: 10,
      paddingLeft: 20,
      paddingRight: 20,
      paddingBottom: 20,
    },
    text: {
      fontSize: 49,
      color: theme.colors.textColor,
    },
  });
