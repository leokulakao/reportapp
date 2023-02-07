import { Asset } from 'expo-asset';
import React from 'react';
import { useEffect, useState } from 'react';
import AnimatedSplashScreen from './AnimatedSplashScreen';

type Props = {
  children: JSX.Element;
  image: string;
};

const AnimatedAppLoader: React.FC<Props> = ({ children, image }) => {
  const [isSplashReady, setSplashReady] = useState(false);
  const [splashUri, setSplashUri] = useState<string | null>(null);

  useEffect(() => {
    async function prepare() {
      const [{ localUri }] = await Asset.loadAsync(
        require('../../assets/splash.png')
      );
      setSplashUri(localUri);
      setSplashReady(true);
    }

    prepare();
  }, [image]);

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
