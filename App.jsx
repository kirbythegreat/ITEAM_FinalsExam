import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppStyles from './src/styles/AppStyles';
import Login from './src/screens/Login';
import Homepage from './src/screens/Homepage';

export default function App() {
  return (
    <View style={AppStyles.container}>
      <Homepage />
    </View>
  );
}

