import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import SplashStyles from '../styles/SplashStyles';

export default function Splash({ navigation }) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.replace('Login');
    }, 2000);

    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <View style={SplashStyles.container}>
      <Image source={require('../icons/XureLogo2.png')} style={SplashStyles.logo} />
    </View>
  );
}
