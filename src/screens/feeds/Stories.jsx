import React from 'react';
import {View, ScrollView, Image, Text, TouchableOpacity} from 'react-native';
import stories from '../../_mock/stroies';

const Stories = ({navigateToAddStory}) => {
  return (
    <View className="mt-2 flex justify-start items-center flex-row">
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View>
          <TouchableOpacity
            onPress={navigateToAddStory}
            className="items-center mx-2 p-1 rounded-full border-2 border-gray">
            <View className="w-20 h-20 bg-secondary rounded-full justify-center items-center">
              <Text className="text-5xl text-white">+</Text>
            </View>
          </TouchableOpacity>
          <Text className="text-xs mt-1 text-center">Your Story</Text>
        </View>

        {stories.map((story, index) => (
          <View key={index + 1}>
            <TouchableOpacity className=" mx-2  p-1 rounded-full border-2 border-primary ">
              <Image
                source={{uri: story.image}}
                className="w-20 h-20 rounded-full "
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
