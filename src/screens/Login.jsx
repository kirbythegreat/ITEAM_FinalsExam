import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native';
import LoginStyles from '../styles/LoginStyles';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Handle login logic here
    console.log('Login attempted with:', email, password);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={LoginStyles.container}
    >
      <View style={LoginStyles.innerContainer}>
        {/* Logo/Header */}
        <Text style={LoginStyles.header}>XURE</Text>
        <Text style={LoginStyles.subHeader}>Sign In</Text>

        {/* Email Input */}
        <TextInput
          style={LoginStyles.input}
          placeholder="Enter your email or username"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        {/* Password Input */}
        <TextInput
          style={LoginStyles.input}
          placeholder="Enter your password"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {/* Login Button */}
        <TouchableOpacity style={LoginStyles.loginButton} onPress={handleLogin}>
          <Text style={LoginStyles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        {/* Forgot Password */}
        <TouchableOpacity style={LoginStyles.forgotPassword}>
          <Text style={LoginStyles.linkText}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Sign Up Section */}
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