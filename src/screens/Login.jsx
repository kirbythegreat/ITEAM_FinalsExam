import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Image } from 'react-native';
import LoginStyles from '../styles/LoginStyles';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Login() {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);


  const handleLogin = async () => {
  try {
    const response = await axios.post(
      'https://pk9blqxffi.execute-api.us-east-1.amazonaws.com/xdeal/LoginXpert',
      {
        version_number: '2.2.6',
        Username: username,
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
        <Image source={require('../icons/XureLogo2.png')} style={LoginStyles.header} />
        <Text style={LoginStyles.subHeader}>Sign In</Text>

        <TextInput
          style={LoginStyles.input}
          placeholder="Email address or username"
          placeholderTextColor="#999"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />


        <View style={{ position: 'relative' }}>
          <TextInput
            style={LoginStyles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={{
              position: 'absolute',
              right: 15,
              top: 8,
              padding: 5,
            }}
          >
            <Icon
              name={showPassword ? 'visibility' : 'visibility-off'}
              size={24}
              color="#868686"
            />
          </TouchableOpacity>
        </View>


        <TouchableOpacity style={LoginStyles.loginButton} onPress={handleLogin}>
          <Text style={LoginStyles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={LoginStyles.forgotPassword}>
          <Text style={LoginStyles.linkText}>Forgot Password?</Text>
        </TouchableOpacity>

        <View style={LoginStyles.signUpContainer}>
          <Text style={LoginStyles.signUpText}>Don't have an account?</Text>
          <TouchableOpacity style={LoginStyles.outlineButton}>
            <Text style={LoginStyles.outlineButtonText}>Create an Account</Text>
          </TouchableOpacity>
        </View>

      </View>
    </KeyboardAvoidingView>
  );
}
