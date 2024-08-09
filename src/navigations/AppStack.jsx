import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import MyTabs from '../screens/MyTabs';
import NewChat from '../screens/app/NewChat';
import ChatRoom from '../screens/app/ChatRoom';
import Preference from '../screens/app/Preference';
import Setup from '../screens/app/Setup';
import Match from '../screens/app/Match';
import AddStory from '../screens/feeds/AddStory';
const {Navigator, Screen, Group} = createStackNavigator();

const AppStack = () => {
  return (
    <Navigator
      initialRouteName="MyTabs"
      screenOptions={{
        headerShown: false,
        lazy: true,
        gestureEnabled: true,
        cardOverlayEnabled: true,
      }}
      shouldRasterizeIOS>
      <Group>
        <Screen name="MyTabs" component={MyTabs} />
        <Screen name="NewChat" component={NewChat} />
        <Screen name="ChatRoom" component={ChatRoom} />
        <Screen name="AddStory" component={AddStory} />
      </Group>
      <Group
        screenOptions={({navigation}) => ({
          presentation: 'modal',
          ...TransitionPresets.ModalSlideFromBottomIOS,
        })}>
        <Screen name="Preference" component={Preference} />
        <Screen name="Setup" component={Setup} />
      </Group>
      <Group
        screenOptions={{
          presentation: 'transparentModel',
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}>
        <Screen name="Match" component={Match} />
      </Group>
    </Navigator>
  );
};

export default AppStack;
