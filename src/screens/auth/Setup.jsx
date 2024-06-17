import {View, Text, Button, Image} from 'react-native';
import React from 'react';

const Setup = () => {
  return (
    <View className="flex-1 bg-primary">
      <Image
        source={require('../../assets/setup.png')}
        className="w-full h-full object-cover"
      />
      <View className="absolute top-0 left-0 right-0 bottom-0 justify-center items-center">
        <Text className="text-5xl text-center text-white font-bold">
          Find Your Match
        </Text>
        <View className="mt-10 flex row justify-center">
          <Button
            title="Continue with Email & Password"
            onPress={() => {
              /* Handle Email & Password Login */
            }}
            className="rounded-lg px-4 py-2"
          />
          <Button
            title="Continue with Google"
            onPress={() => {
              /* Handle Google Login */
            }}
            className="rounded-lg px-4 py-2 ml-2"
          />
        </View>
      </View>
    </View>
  );
};

export default Setup;
