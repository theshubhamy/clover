import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MyTabs from '../screens/MyTabs';
const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="MyTabs"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="MyTabs" component={MyTabs} />
    </Stack.Navigator>
  );
};

export default AppStack;
