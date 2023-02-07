import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';

import './localization';
import store from './src/store/store';
import LogicCore from './src/core/LogicCore';
import Navigation from './src/navigation/Navigation';
import AnimatedAppLoader from './src/components/AnimatedAppLoader';
import Constants from 'expo-constants';

SplashScreen.preventAutoHideAsync();

const App = () => {
  const persistor = persistStore(store);

  console.log(Constants.manifest?.splash?.image);

  return (
    <AnimatedAppLoader image={Constants.manifest?.splash?.image as string}>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null} />
        <GestureHandlerRootView style={{ flex: 1 }}>
          <LogicCore />
          <Navigation />
        </GestureHandlerRootView>
      </Provider>
    </AnimatedAppLoader>
  );
};

export default App;
