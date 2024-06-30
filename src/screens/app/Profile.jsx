import {View, Text, Image, Button} from 'react-native';
import React, {useContext} from 'react';
import {AuthContext} from '../../context/AuthContext';
const Profile = () => {
  const {user, signOut} = useContext(AuthContext);
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Image
        source={{uri: user?.photoURL}}
        className="w-24 h-24 rounded-full mb-4"
      />
      <Text className="text-xl font-bold text-primary mb-2">
        {user?.displayName}
      </Text>
      <Text className="text-gray-600 mb-4">{user.email}</Text>
      <Button title="logout" onPress={() => signOut()} color="#1E40AF" />
    </View>
  );
};

export default Profile;
