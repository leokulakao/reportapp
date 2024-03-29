import { NavigationProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Dimensions, View, StyleSheet } from 'react-native';
import YearForm from '../year-form/YearForm';
import Carousel from 'react-native-reanimated-carousel';
import MonthItem from './MonthItem';
// import { ReportStatsYear } from '../../store/reports/reportsState';
import { useSelector } from 'react-redux';
import { selectStatsReportsByYear } from '../../store/reports/reportsSelectors';
// import { StyleSheet, TouchableOpacity, Text } from 'react-native';

type Props = {
  navigation?: NavigationProp<any, any>;
};

const currentYear: number = new Date().getFullYear();
const currentMonth: number = new Date().getMonth() + 1;

const getArrayMonth = () => {
  const result: number[] = [];
  for (let i = 0; i < 12; i++) {
    result.push(i);
  }
  return result;
};

const getMonths = (year: number) =>
  year === currentYear
    ? getArrayMonth().slice(0, currentMonth)
    : getArrayMonth();

const MonthSlider: React.FC<Props> = (props) => {
  const { navigation } = props;

  const width = Dimensions.get('window').width;

  const [year, setYear] = useState<number>(currentYear);
  const [months, setMonths] = useState<number[]>(getMonths(currentYear));
  const [defaultIndex, setDefaultIndex] = useState<number>();
  // const [stats, setStats] = useState<ReportStatsYear>();

  const stats = useSelector(selectStatsReportsByYear(year));

  useEffect(() => {
    const newMonths = getMonths(year);
    setDefaultIndex(newMonths.length - 1);
    setMonths(newMonths);
    // setStats(returnStats);
  }, [year]);

  return (
    <View style={{ flex: 1 }}>
      <YearForm year={year} setYear={setYear} />
      <Carousel
        loop={false}
        width={width * 0.85}
        // height={430}
        autoPlay={false}
        data={months}
        style={styles.carousel}
        defaultIndex={defaultIndex}
        scrollAnimationDuration={1000}
        onSnapToItem={() => {}}
        renderItem={({ index }) => (
          <MonthItem
            stats={
              stats.statsMonths.filter((elem) => elem.month === index).length >
              0
                ? stats.statsMonths.filter((elem) => elem.month === index)[0]
                : null
            }
            year={year}
            month={index}
            navigation={navigation}
          />
        )}
      />
    </View>
  );
};

export default MonthSlider;

const styles = StyleSheet.create({
  carousel: {
    width: '100%',
    justifyContent: 'center',
  },
});
