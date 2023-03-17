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
  border?: boolean;
};

const Pill: React.FC<Props> = (props) => {
  const { icon, text, color, textColor, border = true } = props;
  const theme = useTheme<Theme>();

  return (
    <View style={styles(theme, color, textColor, border).container}>
      {icon ? (
        <>
          <Icon
            name={icon || 'help-outline'}
            size={14}
            color={theme.colors.secondaryTextColor}
            style={styles(theme).icon}
          />
        </>
      ) : null}
      <Text style={styles(theme, color, textColor).text}>{text}</Text>
    </View>
  );
};

export default Pill;

const styles = (
  theme: Theme,
  color?: string,
  textColor?: string,
  border?: boolean
) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: color ? color : theme.colors.backgroundColor,
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 10,
      paddingRight: 10,
      borderRadius: 200,
      marginRight: 5,
      marginBottom: 5,
      borderWidth: 1,
      borderColor: border
        ? theme.colors.secondaryBackgroundColor
        : theme.colors.backgroundColor,
    },
    text: {
      fontSize: 12,
      color: textColor ? textColor : theme.colors.secondaryTextColor,
    },
    icon: {
      marginRight: 5,
    },
  });
