import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
const RootNavigator = () => {
  const {user} = useSelector(state => state.auth);
  return (
    <NavigationContainer>
      {user !== null ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default RootNavigator;
