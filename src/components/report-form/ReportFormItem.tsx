import Theme from '../../theme';
import { useTheme } from '@shopify/restyle';
import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker, {
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';
import { useTranslation } from 'react-i18next';

import { dateToLocale } from '../../utils/date';

type Props = {
  type: 'number' | 'date' | 'string';
  title: string;
  icon?: string;
  value: number | Date | string;
  onChange: (e: any) => void;
  diffOnChange?: number;
  isMinutes?: boolean;
  marginB?: boolean;
};

const ReportFormItem: React.FC<Props> = (props) => {
  const {
    type,
    title = '',
    icon,
    value,
    onChange,
    diffOnChange = 1,
    isMinutes = false,
    marginB = false,
  } = props;

  const theme = useTheme<Theme>();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  const onDateItemAndroidPress = () => {
    console.log(value);
    DateTimePickerAndroid.open({
      value: new Date(value),
      mode: 'date',
      is24Hour: true,
      onChange: (e, selectedDate) => onChange(selectedDate),
    });
  };

  return (
    <>
      {type === 'number' ? (
        <View
          style={[
            styles(theme).reportFormItem,
            marginB && styles(theme).reportFormItemMargin,
          ]}
        >
          <Icon
            name={icon || 'help-outline'}
            size={24}
            color={theme.colors.iconColor}
          />
          <Text
            style={[
              styles(theme).reportFormItemText,
              styles(theme).reportFormItemTextWidth,
              styles(theme).reportFormItemTextGrow,
            ]}
            numberOfLines={2}
          >
            {title}
          </Text>

          <View style={styles(theme).reportFormInputContainer}>
            <TouchableOpacity
              onPress={() => {
                if (isMinutes && typeof value === 'number') {
                  onChange(
                    value - diffOnChange < 60 ? value - diffOnChange : value
                  );
                } else if (typeof value === 'number') {
                  onChange(value - diffOnChange);
                }
              }}
              activeOpacity={0.7}
              disabled={!value}
            >
              <Icon
                name="remove"
                size={26}
                color={theme.colors.secondaryIconColor}
              />
            </TouchableOpacity>

            <Text
              style={[
                styles(theme).reportFormItemText,
                styles(theme).reportFormItemTextMarginH,
              ]}
            >
              {value + ''}
            </Text>

            <TouchableOpacity
              onPress={() => {
                if (isMinutes && typeof value === 'number') {
                  onChange(
                    value + diffOnChange < 60 ? value + diffOnChange : value
                  );
                } else if (typeof value === 'number') {
                  onChange(value + diffOnChange);
                }
              }}
              activeOpacity={0.7}
            >
              <Icon
                name="add"
                size={26}
                color={theme.colors.secondaryIconColor}
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <TouchableOpacity
          onPress={() =>
            Platform.OS === 'android'
              ? onDateItemAndroidPress()
              : () => console.log('ios')
          }
          style={[
            styles(theme).reportFormItem,
            marginB && styles(theme).reportFormItemMargin,
          ]}
          activeOpacity={0.7}
        >
          <Icon
            name="calendar-outline"
            size={24}
            color={theme.colors.iconColor}
          />
          <Text
            style={[
              styles(theme).reportFormItemText,
              styles(theme).reportFormItemTextGrow,
            ]}
          >
            {title}
          </Text>
          {type === 'date' && typeof value && Platform.OS === 'ios' ? (
            <DateTimePicker
              locale={i18n.language}
              accentColor="#1F1F1F"
              themeVariant={theme.colors.theme}
              value={new Date(value)}
              mode={'date'}
              is24Hour={true}
              onChange={(e, selectedDate) => onChange(selectedDate)}
            />
          ) : (
            <Text
              style={{
                fontSize: 18,
                lineHeight: 22,
                color: theme.colors.textColor,
              }}
            >
              {type === 'date' ? dateToLocale(value as Date) : value.toString()}
            </Text>
          )}
        </TouchableOpacity>
      )}
    </>
  );
};

export default ReportFormItem;

const styles = (theme: Theme) =>
  StyleSheet.create({
    reportFormItem: {
      height: 52,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
      paddingHorizontal: 15,
      backgroundColor: theme.colors.cardItemColor,
      borderRadius: 8,
    },
    reportFormItemMargin: {
      marginBottom: 35,
    },
    reportFormItemText: {
      minWidth: 22,
      marginHorizontal: 15,
      fontSize: 18,
      lineHeight: 22,
      color: theme.colors.textColor,
      backgroundColor: theme.colors.cardItemColor,
    },
    reportFormItemTextWidth: {
      width: '34%',
    },
    reportFormItemTextGrow: {
      flexGrow: 1,
    },
    reportFormItemTextMarginH: {
      marginHorizontal: 5,
      textAlign: 'center',
    },
    reportFormInputContainer: {
      marginLeft: 'auto',
      flexDirection: 'row',
      alignItems: 'center',
    }
  });
