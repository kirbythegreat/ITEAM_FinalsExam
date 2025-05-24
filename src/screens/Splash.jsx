import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function Splash({ navigation }) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.replace('Login'); // Navigate after 2 seconds
    }, 2000);

    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../icons/XureLogo.png')} style={styles.logo} />
      <Text style={styles.text}>Welcome to XURE</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
