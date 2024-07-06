import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from './app/Profile';
import Home from './app/Home';
import Matches from './app/Matches';
import Chat from './app/Chat';
const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={{headerShown: true}}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Matches" component={Matches} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Chat" component={Chat} />
    </Tab.Navigator>
  );
};

export default MyTabs;
