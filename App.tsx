import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from '@shopify/restyle';

import store from './src/store/store';
import LogicCore from './src/core/LogicCore';
import Navigation from './src/navigation/Navigation';
import { themes } from './src/theme';

const App = () => {
  // const theme = useTheme<Theme>();
  const persistor = persistStore(store);
  return (
    <Provider store={store}>
      <ThemeProvider theme={themes.light.theme}>
        <PersistGate persistor={persistor} loading={null} />
        <GestureHandlerRootView style={{ flex: 1 }}>
          <LogicCore />
          <Navigation />
        </GestureHandlerRootView>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
