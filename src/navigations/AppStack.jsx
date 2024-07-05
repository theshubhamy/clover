import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MyTabs from '../screens/MyTabs';
const {Navigator, Screen} = createStackNavigator();

const AppStack = () => {
  return (
    <Navigator initialRouteName="MyTabs" screenOptions={{headerShown: false}}>
      <Screen name="MyTabs" component={MyTabs} />
    </Navigator>
  );
};

export default AppStack;
