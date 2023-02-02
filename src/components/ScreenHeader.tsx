import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { useTranslation } from 'react-i18next';

import Theme from '../theme';

type Props = {
  title?: any;
};

const ScreenHeader: React.FC<Props> = (props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const theme = useTheme<Theme>();
  const { title } = props;

  return (
    <View style={styles(theme).container}>
      <Text style={styles(theme).title}>{title || ''}</Text>
    </View>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 25,
      marginBottom: 30,
    },
    title: {
      color: theme.colors.textColor,
      fontSize: 35,
      lineHeight: 48,
      marginTop: 10,
    },
  });

export default ScreenHeader;
