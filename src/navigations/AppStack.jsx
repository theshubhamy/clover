import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MyTabs from '../screens/MyTabs';
import NewChat from '../screens/app/NewChat';
import ChatRoom from '../screens/app/ChatRoom';
import Preference from '../screens/app/Preference';
const {Navigator, Screen} = createStackNavigator();

const AppStack = () => {
  return (
    <Navigator initialRouteName="MyTabs" screenOptions={{headerShown: false}}>
      <Screen name="MyTabs" component={MyTabs} />
      <Screen name="NewChat" component={NewChat} />
      <Screen name="ChatRoom" component={ChatRoom} />
      <Screen name="Preference" component={Preference} />
    </Navigator>
  );
};

export default AppStack;
