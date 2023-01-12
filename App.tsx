import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import './localization';
import store from './src/store/store';
import LogicCore from './src/core/LogicCore';
import Navigation from './src/navigation/Navigation';

const App = () => {
  const persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null} />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <LogicCore />
        <Navigation />
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;
