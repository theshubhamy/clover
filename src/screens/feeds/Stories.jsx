import React from 'react';
import {View, ScrollView, Image, Text, TouchableOpacity} from 'react-native';
import stories from '../../_mock/stroies';

const Stories = () => {
  return (
    <View className="mt-2 flex justify-start items-center flex-row">
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity className="items-center mx-2">
          <View className="w-20 h-20 bg-secondary rounded-full justify-center items-center">
            <Text className="text-3xl text-white">+</Text>
          </View>
          <Text className="text-xs mt-1 text-center">Your Story</Text>
        </TouchableOpacity>
        {stories.map((story, index) => (
          <View key={index + 1}>
            <TouchableOpacity className=" mx-2  rounded-full border-3 border-primary ">
              <Image
                source={{uri: story.image}}
                className="w-16 h-16 rounded-full border-3 border-primary"
              />
            </TouchableOpacity>
            <Text className="text-xs mt-1 text-center">
              {story.name} {story.id}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Stories;
