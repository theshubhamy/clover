import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import Setup from '../screens/auth/Setup';
import OtpVerification from '../screens/auth/OtpVerification';
import ForgotPassword from '../screens/auth/ForgotPassword';
const {Navigator, Screen} = createStackNavigator();

const AuthStack = () => {
  return (
    <Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
      <Screen name="Setup" component={Setup} />
      <Screen name="Login" component={Login} />
      <Screen name="Register" component={Register} />
      <Screen name="OtpVerification" component={OtpVerification} />
      <Screen name="ForgotPassword" component={ForgotPassword} />
    </Navigator>
  );
};

export default AuthStack;
