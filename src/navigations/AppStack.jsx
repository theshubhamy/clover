import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MyTabs from '../screens/MyTabs';
import NewChat from '../screens/app/NewChat';
import ChatRoom from '../screens/app/ChatRoom';
import Preference from '../screens/app/Preference';
import Setup from '../screens/app/Setup';
const {Navigator, Screen, Group} = createStackNavigator();

const AppStack = () => {
  return (
    <Navigator
      initialRouteName="MyTabs"
      screenOptions={{headerShown: false, lazy: true}}
      shouldRasterizeIOS>
      <Group>
        <Screen name="MyTabs" component={MyTabs} />
        <Screen name="NewChat" component={NewChat} />
        <Screen name="ChatRoom" component={ChatRoom} />
      </Group>
      <Group screenOptions={{presentation: 'modal'}}>
        <Screen name="Preference" component={Preference} />
        <Screen name="Setup" component={Setup} />
      </Group>
    </Navigator>
  );
};

export default AppStack;
