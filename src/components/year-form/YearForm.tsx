import { BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import BottomSheetModalComp from '../BottomSheetModalComp';
import MainButton from '../buttons/MainButton';
import SelectYearButton from '../buttons/SelectYearButton';
import WheelPicker from 'react-native-wheely';

type Props = {
  year: number;
  setYear: (e: number) => void;
};

const YearForm: React.FC<Props> = (props) => {
  const { year, setYear } = props;

  const [selectedIndex, setSelectedIndex] = useState(0);
  // BottomSheetModal
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => [340], []);
  // const width = Dimensions.get('window').width;

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleMainButtonPress = () => {
    setYear(+setYears()[selectedIndex]);
    bottomSheetModalRef.current?.close();
  };

  const setYears = (minYear: number | null = null): string[] => {
    const currentYear: number = new Date().getFullYear();
    const result: string[] = [];
    if (minYear === null) {
      result.push(currentYear.toString());
      for (let i = 1; i < 3; i++) {
        const y = currentYear - i;
        result.push(y.toString());
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
          options={setYears()}
          onChange={(index) => setSelectedIndex(index)}
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