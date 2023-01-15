import { NavigationProp } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
  index: number;
  navigation?: NavigationProp<any, any>;
};

const MonthItem: React.FC<Props> = (props) => {
  const { index, navigation } = props;

  const onPressToMonthNavigate = () => navigation?.navigate('MonthReport');

  return (
    <TouchableOpacity style={styles.mainPress} onPress={onPressToMonthNavigate}>
      <View style={styles.item}>
        <Text style={styles.title}>{index}</Text>
        <View style={styles.containerLine}>
          <View style={styles.firstLine} />
        </View>
        <View style={styles.statContainer}>
          <Icon name="stopwatch-outline" size={24} />
          <Text style={styles.statTitle}>{'Hours'}</Text>
          <Text style={styles.statValue}>{0}</Text>
        </View>
        <View style={styles.statContainer}>
          <Icon name="library-outline" size={24} />
          <Text style={styles.statTitle}>{'Publications'}</Text>
          <Text style={styles.statValue}>{0}</Text>
        </View>
        <View style={styles.statContainer}>
          <Icon name="play-outline" size={24} />
          <Text style={styles.statTitle}>{'Videos'}</Text>
          <Text style={styles.statValue}>{0}</Text>
        </View>
        <View style={styles.statContainer}>
          <Icon name="chatbubbles-outline" size={24} />
          <Text style={styles.statTitle}>{'Return Visits'}</Text>
          <Text style={styles.statValue}>{0}</Text>
        </View>
        <View style={styles.statContainer}>
          <Icon name="people-outline" size={24} />
          <Text style={styles.statTitle}>{'Bible Studies'}</Text>
          <Text style={styles.statValue}>{0}</Text>
        </View>
        <View style={styles.statContainer}>
          <Icon name="stopwatch-outline" size={24} />
          <Text style={styles.statTitle}>{'Special Hours'}</Text>
          <Text style={styles.statValue}>{0}</Text>
        </View>
        <View style={styles.containerLine}>
          <View style={styles.secondLine} />
        </View>
        <TouchableOpacity
          style={styles.buttonShare}
          onPress={() => console.log(123)}
        >
          <Icon name="share-outline" size={24} />
          <Text style={styles.buttonShareText}>{'Send Report'}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default MonthItem;

const styles = StyleSheet.create({
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
    backgroundColor: 'white',
  },
  title: {
    fontSize: 49,
    paddingBottom: 20,
  },
  containerLine: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  firstLine: {
    marginBottom: 20,
    flex: 1,
    height: 1,
    backgroundColor: '#EBEEF2',
  },
  secondLine: {
    marginTop: 20,
    marginBottom: 10,
    flex: 1,
    height: 1,
    backgroundColor: '#EBEEF2',
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
  },
  statValue: {
    flex: 1,
    paddingLeft: 5,
    textAlign: 'right',
    fontSize: 16,
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
  },
});
