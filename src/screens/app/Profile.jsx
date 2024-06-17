import {View, Text, Image, Button} from 'react-native';
import React from 'react';

const Profile = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Image
        source={{uri: 'https://example.com/profile-pic.jpg'}}
        className="w-24 h-24 rounded-full mb-4"
      />
      <Text className="text-xl font-bold text-primary mb-2">John Doe</Text>
      <Text className="text-gray-600 mb-4">johndoe@example.com</Text>
      <Button
        title="Edit Profile"
        onPress={() => console.log('Edit Profile pressed')}
        color="#1E40AF"
      />
    </View>
  );
};

export default Profile;
