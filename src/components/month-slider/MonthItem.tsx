import { NavigationProp } from '@react-navigation/native';
import React from 'react';
import { useTheme } from '@shopify/restyle';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Theme from '../../theme';

type Props = {
  index: number;
  navigation?: NavigationProp<any, any>;
};

const MonthItem: React.FC<Props> = (props) => {
  const { index, navigation } = props;
  const theme = useTheme<Theme>();

  const onPressToMonthNavigate = () => navigation?.navigate('MonthReport');

  return (
    <TouchableOpacity
      style={styles(theme).mainPress}
      onPress={onPressToMonthNavigate}
    >
      <View style={styles(theme).item}>
        <Text style={styles(theme).title}>{index}</Text>
        <View style={styles(theme).containerLine}>
          <View style={styles(theme).firstLine} />
        </View>
        <View style={styles(theme).statContainer}>
          <Icon
            name="stopwatch-outline"
            size={24}
            color={theme.colors.textColor}
          />
          <Text style={styles(theme).statTitle}>{'Hours'}</Text>
          <Text style={styles(theme).statValue}>{0}</Text>
        </View>
        <View style={styles(theme).statContainer}>
          <Icon
            name="library-outline"
            size={24}
            color={theme.colors.textColor}
          />
          <Text style={styles(theme).statTitle}>{'Publications'}</Text>
          <Text style={styles(theme).statValue}>{0}</Text>
        </View>
        <View style={styles(theme).statContainer}>
          <Icon name="play-outline" size={24} color={theme.colors.textColor} />
          <Text style={styles(theme).statTitle}>{'Videos'}</Text>
          <Text style={styles(theme).statValue}>{0}</Text>
        </View>
        <View style={styles(theme).statContainer}>
          <Icon
            name="chatbubbles-outline"
            size={24}
            color={theme.colors.textColor}
          />
          <Text style={styles(theme).statTitle}>{'Return Visits'}</Text>
          <Text style={styles(theme).statValue}>{0}</Text>
        </View>
        <View style={styles(theme).statContainer}>
          <Icon
            name="people-outline"
            size={24}
            color={theme.colors.textColor}
          />
          <Text style={styles(theme).statTitle}>{'Bible Studies'}</Text>
          <Text style={styles(theme).statValue}>{0}</Text>
        </View>
        <View style={styles(theme).statContainer}>
          <Icon
            name="stopwatch-outline"
            size={24}
            color={theme.colors.textColor}
          />
          <Text style={styles(theme).statTitle}>{'Special Hours'}</Text>
          <Text style={styles(theme).statValue}>{0}</Text>
        </View>
        <View style={styles(theme).containerLine}>
          <View style={styles(theme).secondLine} />
        </View>
        <TouchableOpacity
          style={styles(theme).buttonShare}
          onPress={() => console.log(123)}
        >
          <Icon name="share-outline" size={24} color={theme.colors.textColor} />
          <Text style={styles(theme).buttonShareText}>{'Send Report'}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default MonthItem;

const styles = (theme: Theme) =>
  StyleSheet.create({
    mainPress: {
      flex: 1,
    },
    item: {
      flex: 1,
      borderRadius: 10,
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 30,
      paddingBottom: 30,
      marginLeft: '2.5%',
      marginRight: '2.5%',
      backgroundColor: theme.colors.backgroundColor,
    },
    title: {
      fontSize: 49,
      paddingBottom: 20,
      color: theme.colors.textColor,
    },
    containerLine: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    firstLine: {
      marginBottom: 20,
      flex: 1,
      height: 1,
      backgroundColor: theme.colors.secondaryBackgroundColor,
    },
    secondLine: {
      marginTop: 20,
      marginBottom: 10,
      flex: 1,
      height: 1,
      backgroundColor: theme.colors.secondaryBackgroundColor,
    },
    statContainer: {
      paddingTop: 4,
      paddingBottom: 4,
      flexDirection: 'row',
      alignItems: 'center',
    },
    statTitle: {
      flex: 1,
      paddingLeft: 15,
      fontSize: 16,
      color: theme.colors.textColor,
    },
    statValue: {
      flex: 1,
      paddingLeft: 5,
      textAlign: 'right',
      fontSize: 16,
      color: theme.colors.textColor,
    },
    buttonShare: {
      paddingTop: 5,
      paddingBottom: 5,
      flexDirection: 'row',
      alignItems: 'center',
    },
    buttonShareText: {
      flex: 1,
      paddingLeft: 15,
      fontSize: 16,
      color: theme.colors.textColor,
    },
  });
