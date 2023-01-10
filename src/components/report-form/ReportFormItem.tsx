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
            styles.reportFormItem,
            marginB && styles.reportFormItemMargin,
            { backgroundColor: theme.colors.secondaryBackgroundColor },
          ]}
        >
          <Icon
            name={icon || 'help-outline'}
            size={24}
            // color={THEME.CONTRAST_COLOR}
          />
          <Text
            style={[styles.reportFormItemText, styles.reportFormItemTextGrow]}
          >
            {title}
          </Text>

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
              // color={!value ? THEME.SECONDARY_TEXT_COLOR : THEME.CONTRAST_COLOR}
            />
          </TouchableOpacity>
          <Text
            style={[
              styles.reportFormItemText,
              styles.reportFormItemTextMarginH,
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
            <Icon name="add" size={26} />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          onPress={() =>
            Platform.OS === 'android'
              ? onDateItemAndroidPress()
              : () => console.log('ios')
          }
          style={[
            styles.reportFormItem,
            marginB && styles.reportFormItemMargin,
            { backgroundColor: theme.colors.secondaryBackgroundColor },
          ]}
          activeOpacity={0.7}
        >
          <Icon
            name="calendar-outline"
            size={24}
            // color={THEME.CONTRAST_COLOR}
          />
          <Text
            style={[
              styles.reportFormItemText,
              styles.reportFormItemTextGrow,
              { backgroundColor: theme.colors.secondaryBackgroundColor },
            ]}
          >
            {title}
          </Text>
          {type === 'date' && typeof value && Platform.OS === 'ios' ? (
            <DateTimePicker
              value={new Date(value)}
              mode={'date'}
              is24Hour={true}
              onChange={(e, selectedDate) => onChange(selectedDate)}
            />
          ) : (
            <Text style={{ fontSize: 18, lineHeight: 22 }}>
              {type === 'date' ? value.toLocaleString() : value.toString()}
            </Text>
          )}
        </TouchableOpacity>
      )}
    </>
  );
};

export default ReportFormItem;

const styles = StyleSheet.create({
  reportFormItem: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 24,
    // backgroundColor: THEME.SECONDARY_BACKGROUND_COLOR,
    borderRadius: 8,
  },
  reportFormItemMargin: {
    marginBottom: 35,
  },
  reportFormItemText: {
    marginHorizontal: 15,
    fontSize: 18,
    lineHeight: 22,
  },
  reportFormItemTextGrow: {
    flexGrow: 1,
  },
  reportFormItemTextMarginH: {
    marginHorizontal: 20,
  },
});
