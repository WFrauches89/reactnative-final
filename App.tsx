import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';
import { AuthProvider } from './src/Context/Auth';
import Header from './src/components/Header';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#520a64" barStyle="light-content" />
      {/* <Header /> */}
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}
