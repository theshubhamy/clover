import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';

const Setup = () => {
  return (
    <View className="flex-1 bg-white">
      <Image
        source={require('../../assets/setup.png')}
        className="w-full h-1/2 object-cover"
      />
      <View className="my-10 flex justify-center items-center">
        <Text className="text-5xl text-center text-black font-bold">
          Let's meeting new people around you.
        </Text>
        <View className="my-10 flex row justify-center gap-4">
          <TouchableOpacity
            onPress={() => {
              /* Handle Email & Password Login */
            }}
            className="rounded-full px-4 py-2 bg-primary ">
            <Text className="text-white font-semibold text-lg text-center">
              Continue with Email
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              /* Handle Google Login */
            }}
            className="rounded-full px-6 py-2  bg-primary  text-white">
            <Text className="text-white font-semibold text-lg text-center">
              Continue with Google
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Setup;
