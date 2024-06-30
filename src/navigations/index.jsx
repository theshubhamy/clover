import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import {AuthContext} from '../context/AuthContext';

const RootNavigator = () => {
  const {user} = useContext(AuthContext);

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default RootNavigator;
