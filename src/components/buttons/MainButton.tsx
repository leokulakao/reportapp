import { useTheme } from '@shopify/restyle';
import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Theme from '../../theme';

type Props = {
  icon?: string;
  iconColor?: string;
  onPress: () => void;
  text?: any;
  textColor?: string;
  style?: object;
  disabled?: boolean;
};

const MainButton: React.FC<Props> = (props) => {
  const { icon, iconColor, onPress, text, textColor, style, disabled } = props;

  const theme = useTheme<Theme>();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles(theme).button,
        disabled && styles(theme).buttonDisabled,
        style,
      ]}
      activeOpacity={0.7}
    >
      {!!icon && !text && (
        <Icon
          name={icon}
          size={29}
          color={iconColor || theme.colors.iconColor}
        />
      )}
      {!!text && (
        <>
          {!!icon && (
            <Icon
              name={icon}
              size={29}
              color={iconColor || theme.colors.iconColor}
            />
          )}
          <Text
            style={[
              styles(theme).text,
              { color: textColor || theme.colors.textColor },
            ]}
          >
            {text}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export default MainButton;

const styles = (theme: Theme) =>
  StyleSheet.create({
    button: {
      flexGrow: 1,
      height: 54,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
      backgroundColor: theme.colors.secondaryBackgroundColor,
    },
    buttonDisabled: {
      opacity: 0.4,
    },
    text: {
      fontSize: 14,
      color: theme.colors.textColor,
      marginHorizontal: 10,
    },
  });
