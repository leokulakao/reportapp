import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  children?: JSX.Element | JSX.Element[];
  scrollContainer?: any;
  paddingHorizontal?: any;
  disableSafeAreaEdges?: Edge[];
  noBounces?: any;
  style?: any;
  tabsIndent?: any;
};

const ScreenSafeAreaContainer: React.FC<Props> = ({
  children,
  scrollContainer,
  paddingHorizontal,
  disableSafeAreaEdges,
  noBounces,
  style,
  tabsIndent,
}) => {
  const insets = useSafeAreaInsets();
  const edges: Edge[] = ['top', 'bottom', 'left', 'right'];
  return (
    <SafeAreaView
      style={[
        styles.container,
        !scrollContainer && paddingHorizontal && styles.containerPadding,
        !scrollContainer && tabsIndent && { paddingBottom: insets.bottom + 18 },
        !scrollContainer && style,
      ]}
      edges={
        disableSafeAreaEdges
          ? edges.filter((item) => !disableSafeAreaEdges.includes(item))
          : edges
      }
    >
      {scrollContainer ? (
        <ScrollView
          contentContainerStyle={[
            styles.scrollContainer,
            paddingHorizontal && styles.containerPadding,
            tabsIndent && { paddingBottom: insets.bottom + 18 },
            style,
          ]}
          bounces={noBounces ? false : true}
        >
          {children}
        </ScrollView>
      ) : (
        <>{children}</>
      )}
    </SafeAreaView>
  );
};

export default ScreenSafeAreaContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  containerPadding: {
    paddingHorizontal: 20,
  },
});
