import {View, Text, Button} from 'react-native';
import React from 'react';

const Home = ({navigation}) => {
  const navigateToUserProfile = () => {
    navigation.navigate('Profile');
  };

  const navigateToChatScreen = () => {
    navigation.navigate('Chat');
  };

  const navigateToMatchesScreen = () => {
    navigation.navigate('Matches');
  };

  return (
    <View>
      <Text>Welcome to the Dating App!</Text>
      <Button title="Edit Profile" onPress={navigateToUserProfile} />
      <Button title="Chat" onPress={navigateToChatScreen} />
      <Button title="Matches" onPress={navigateToMatchesScreen} />
    </View>
  );
};

export default Home;
