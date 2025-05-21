import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import LoginStyles from '../styles/LoginStyles';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function Login() {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
  try {
    const response = await axios.post(
      'https://pk9blqxffi.execute-api.us-east-1.amazonaws.com/xdeal/LoginXpert',
      {
        version_number: '2.2.6',
        Username: username,  // match what API expects
        Password: password,
        app_name: 'xtore',
      },
      { headers: { 'Content-Type': 'application/json' } }
    );

    console.log('Full login response:', response.data);

    if (
      response.data &&
      Array.isArray(response.data.XpertData) &&
      response.data.XpertData.length > 0
    ) {
      console.log('Login success');
      navigation.navigate('Home');
    } else {
      console.error('Login failed: Unexpected response structure');
    }

  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message);
  }
};


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={LoginStyles.container}
    >
      <View style={LoginStyles.innerContainer}>
        <Text style={LoginStyles.header}>XURE</Text>
        <Text style={LoginStyles.subHeader}>Sign In</Text>

        <TextInput
          style={LoginStyles.input}
          placeholder="Enter your username"
          placeholderTextColor="#999"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />


        <TextInput
          style={LoginStyles.input}
          placeholder="Enter your password"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={LoginStyles.loginButton} onPress={handleLogin}>
          <Text style={LoginStyles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={LoginStyles.forgotPassword}>
          <Text style={LoginStyles.linkText}>Forgot Password?</Text>
        </TouchableOpacity>

        <View style={LoginStyles.signUpContainer}>
          <Text style={LoginStyles.signUpText}>Don't have an account?</Text>
          <TouchableOpacity>
            <Text style={[LoginStyles.linkText, LoginStyles.signUpLink]}>Create an Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
