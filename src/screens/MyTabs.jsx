import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// icons
import {Icon, MIcon} from '../components/Icons';
import Profile from './app/Profile';
import Home from './app/Home';
import Feed from './app/Feed';
import Matches from './app/Matches';
import Chat from './app/Chat';
const {Navigator, Screen} = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#FF3A8E',
      }}>
      <Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: Icon('home'),
          tabBarBackgroundColor: '#FF3A8E',
        }}
      />
      <Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarIcon: MIcon('explore'),
        }}
      />
      <Screen
        name="Matches"
        component={Matches}
        options={{
          tabBarIcon: Icon('heart'),
        }}
      />

      <Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarIcon: Icon('chatbubbles'),
        }}
      />
      <Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: Icon('person'),
        }}
      />
    </Navigator>
  );
};

export default MyTabs;
