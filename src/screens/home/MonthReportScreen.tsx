import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '@shopify/restyle';
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import MonthReportHeader from '../../components/month-report/MonthReportHeader';
import MonthReportItem from '../../components/month-report/MonthReportItem';
import ScreenSafeAreaContainer from '../../components/ScreenSafeAreaContainer';
import { RootStackParamList } from '../../navigation/Navigation';
import Theme from '../../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const MonthReportScreen: React.FC<Props> = (props) => {
  // const { navigation } = props;
  const theme = useTheme<Theme>();

  return (
    <ScreenSafeAreaContainer
      style={{ backgroundColor: theme.colors.backgroundColor }}
      disableSafeAreaEdges={['top']}
    >
      <FlatList
        data={[]}
        ListHeaderComponent={() => <MonthReportHeader />}
        renderItem={({ item }) => <MonthReportItem item={item} />}
        keyExtractor={(item) => item.day}
        key={(item) => item.day}
      />
    </ScreenSafeAreaContainer>
  );
};

export default MonthReportScreen;

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: '#ffffff',
  },
});
