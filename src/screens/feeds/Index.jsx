import {SafeAreaView} from 'react-native';
import React from 'react';
import Stories from './Stories';
const Feed = ({navigation}) => {
  const navigateToAddStory = () => {
    navigation.navigate('AddStory');
  };
  return (
    <SafeAreaView className="flex-1  bg-white">
      <Stories navigateToAddStory={navigateToAddStory} />
    </SafeAreaView>
  );
};

export default Feed;
