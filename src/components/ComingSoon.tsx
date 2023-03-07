import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { useTheme } from '@shopify/restyle';

import Theme from '../theme';

const ComingSoon = () => {
  const theme = useTheme<Theme>();

  return (
    <View style={styles(theme).container}>
      <Text style={styles(theme).title}>Coming Soon...</Text>
    </View>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      marginTop: -50,
      color: theme.colors.textColor,
      fontSize: 30,
      lineHeight: 44,
    },
  });

export default ComingSoon;
