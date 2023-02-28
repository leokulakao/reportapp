import { Asset } from 'expo-asset';
import React from 'react';
import { useEffect, useState } from 'react';
import { Appearance } from 'react-native';
import AnimatedSplashScreen from './AnimatedSplashScreen';

type Props = {
  children: JSX.Element;
  image: string;
};

const AnimatedAppLoader: React.FC<Props> = ({ children, image }) => {
  const [isSplashReady, setSplashReady] = useState(false);
  const [splashUri, setSplashUri] = useState<string | null>(null);
  const appearanceTheme = Appearance.getColorScheme();

  useEffect(() => {
    async function prepare() {
      const assets = await Asset.loadAsync(require('../../assets/splash.png'));

      const assetsDark = await Asset.loadAsync(
        require('../../assets/splash-dark.png')
      );
      setSplashUri(
        appearanceTheme === 'light'
          ? assets[0].localUri
          : assetsDark[0].localUri
      );
      setSplashReady(true);
    }

    prepare();
  }, [appearanceTheme, image]);

  if (!isSplashReady) {
    return null;
  }

  return (
    <AnimatedSplashScreen image={splashUri ? splashUri : ''}>
      {children}
    </AnimatedSplashScreen>
  );
};

export default AnimatedAppLoader;
