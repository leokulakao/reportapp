import { useTheme } from '@shopify/restyle';
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Theme from '../theme';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
  icon?: string;
  text: string;
  color?: string;
  textColor?: string;
};

const Pill: React.FC<Props> = (props) => {
  const { icon, text, color } = props;
  const theme = useTheme<Theme>();

  return (
    <View style={styles(theme, color).container}>
      {icon ? (
        <>
          <Icon
            name={icon || 'help-outline'}
            size={16}
            color={theme.colors.secondaryIconColor}
            style={styles(theme).icon}
          />
        </>
      ) : null}
      <Text style={styles(theme).text}>{text}</Text>
    </View>
  );
};

export default Pill;

const styles = (theme: Theme, color?: string, textColor?: string) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: color ? color : theme.colors.secondaryBackgroundColor,
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 10,
      paddingRight: 10,
      borderRadius: 200,
      marginRight: 5,
      marginBottom: 5,
    },
    text: {
      color: textColor ? textColor : theme.colors.textColor,
    },
    icon: {
      marginRight: 5,
    },
  });
