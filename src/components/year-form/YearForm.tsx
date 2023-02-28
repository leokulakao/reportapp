import { BottomSheetModal } from '@gorhom/bottom-sheet';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { View, StyleSheet } from 'react-native';
import BottomSheetModalComp from '../BottomSheetModalComp';
import MainButton from '../buttons/MainButton';
import SelectYearButton from '../buttons/SelectYearButton';
import WheelPicker from 'react-native-wheely';
import { Theme } from '@react-navigation/native';
import { useTheme } from '@shopify/restyle';
import { useSelector } from 'react-redux';
import { selectMinYear } from '../../store/reports/reportsSelectors';

type Props = {
  year: number;
  setYear: (e: number) => void;
};

const YearForm: React.FC<Props> = (props) => {
  const { year, setYear } = props;
  const theme = useTheme<Theme>();

  const [selectedIndex, setSelectedIndex] = useState(0);
  // BottomSheetModal
  const minYear = useSelector(selectMinYear());
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => [340], []);
  // const width = Dimensions.get('window').width;

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  console.log('------>', minYear);

  const handleMainButtonPress = () => {
    console.log(selectedIndex);
    console.log(setYears(minYear));
    setYear(+setYears(minYear)[selectedIndex]);
    bottomSheetModalRef.current?.close();
  };

  useEffect(() => {
    setSelectedIndex(0);
  }, [minYear]);

  const setYears = (minYear: number | null = null): string[] => {
    const currentYear: number = new Date().getFullYear();
    const result: string[] = [];
    if (minYear === null) {
      result.push(currentYear.toString());
      for (let i = 1; i < 3; i++) {
        const y = currentYear - i;
        result.push(y.toString());
      }
    } else {
      for (let i = 0; i < currentYear - minYear + 1; i++) {
        result.push(String(currentYear - i));
      }
    }
    return result;
  };

  return (
    <>
      <SelectYearButton onPress={handlePresentModalPress} year={year} />
      <BottomSheetModalComp
        innerRef={bottomSheetModalRef}
        snapPoints={snapPoints}
        containerStyle={styles.sheetContainer}
      >
        <WheelPicker
          selectedIndex={selectedIndex}
          options={setYears(minYear)}
          onChange={(index) => setSelectedIndex(index)}
          itemTextStyle={{ color: theme.colors.textColor }}
          selectedIndicatorStyle={{
            backgroundColor: theme.colors.secondaryBackgroundColor,
          }}
        />

        <View>
          <MainButton icon="checkmark" onPress={handleMainButtonPress} />
        </View>
      </BottomSheetModalComp>
    </>
  );
};

export default YearForm;

const styles = StyleSheet.create({
  sheetContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 45,
  },
});
