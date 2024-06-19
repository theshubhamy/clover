import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/auth/Login';
import Setup from '../screens/auth/Setup';
const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Setup"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Setup" component={Setup} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

export default AuthStack;
