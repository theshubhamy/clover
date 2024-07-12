import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SwiperCard from '../../components/SwiperCard';
import {useAuth} from '../../context/AuthContext';
import {useQuery} from '@tanstack/react-query';

import {fetchUsers} from '../../services/userService';
const Home = ({navigation}) => {
  const {user} = useAuth();
  const {data, isLoading, error} = useQuery({
    queryKey: ['users', user?.uid],
    queryFn: () => fetchUsers(user?.uid),
  });
  const navigateToPreferences = () => {
    navigation.navigate('Preference');
  };
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Error fetching users</Text>
      </View>
    );
  }
  return (
    <View className="flex-1 bg-white">
      {/* header */}
      <View className="flex-row justify-between items-center p-4">
        <View className="flex flex-row justify-center items-center gap-4">
          <Image
            source={{
              uri: 'https://firebasestorage.googleapis.com/v0/b/clover-rn.appspot.com/o/user.png?alt=media&token=f504d6de-ef4d-4759-b91c-da060e6c1f04',
            }}
            className="w-12 h-12 rounded-full border border-primary "
          />
          <Text className="text-base font-semibold leading-7 tracking-tight text-gray-900">
            {user.displayName}
          </Text>
        </View>

        <TouchableOpacity onPress={navigateToPreferences} className="p-2">
          <Icon name="filter" size={24} className="text-primary" />
        </TouchableOpacity>
      </View>

      <View className="flex-1">
        <Text className="text-2xl px-2">Welcome {user?.displayName}!</Text>
        <SwiperCard data={data} />
      </View>
    </View>
  );
};

export default Home;
