import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';
import * as Sentry from 'sentry-expo';

import './localization';
import store from './src/store/store';
import LogicCore from './src/core/LogicCore';
import Navigation from './src/navigation/Navigation';
import AnimatedAppLoader from './src/components/AnimatedAppLoader';
import Constants from 'expo-constants';

SplashScreen.preventAutoHideAsync();

Sentry.init({
  dsn: 'https://a4b07c8f5e8a44be8020fe42f3be08ae@o4504768446005248.ingest.sentry.io/4504768448823296',
  enableInExpoDevelopment: true,
  debug: false, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
});

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
