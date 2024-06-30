import 'react-native-gesture-handler';
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import './global.css';
import {name as appName} from './app.json';
import {AuthProvider} from './src/context/AuthContext';

export default function Main() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
