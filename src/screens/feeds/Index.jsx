import {View, Text} from 'react-native';
import React from 'react';
import Stories from './Stories';
const Feed = () => {
  return (
    <View className="flex-1  bg-white">
      <Text>Feed</Text>
      <Stories />
    </View>
  );
};

export default Feed;
