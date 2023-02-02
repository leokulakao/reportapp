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
};

const MainButton: React.FC<Props> = (props) => {
  const { icon, iconColor, onPress, text, textColor, style } = props;

  const theme = useTheme<Theme>();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles(theme).button, style]}
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
        <View>
          <Text
            style={[
              styles(theme).text,
              { color: textColor || theme.colors.textColor },
            ]}
          >
            {text}
          </Text>
          {!!icon && (
            <View style={styles(theme).iconContainerAbsolute}>
              <Icon
                name={icon}
                size={29}
                color={iconColor || theme.colors.iconColor}
              />
            </View>
          )}
        </View>
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
    text: {
      fontSize: 18,
      color: theme.colors.textColor,
      marginHorizontal: 15,
    },
    iconContainerAbsolute: {
      position: 'absolute',
      top: -3,
      left: -23,
    },
  });
