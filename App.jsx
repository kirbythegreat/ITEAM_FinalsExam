import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Homepage from './src/screens/Homepage';
import Login from './src/screens/Login';
import Details from './src/screens/Details';
import Splash from './src/screens/Splash';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Splash' component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name='Home' component={Homepage} options={{ headerShown: false }} />
        <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
        <Stack.Screen name='Details' component={Details} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
