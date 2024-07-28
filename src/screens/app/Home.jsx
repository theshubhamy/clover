import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useQuery} from '@tanstack/react-query';
import SwiperCard from '../../components/SwiperCard';
import {useAuth} from '../../context/AuthContext';
import {fetchUsers} from '../../services/userService';
const Home = ({navigation}) => {
  const {user} = useAuth();
  const {data, isLoading, refetch} = useQuery({
    queryKey: ['users', user?.uid],
    queryFn: () => fetchUsers(user?.uid),
    enabled: !!user?.uid,
  });
  console.log(data);
  const navigateToPreferences = () => {
    navigation.navigate('Preference');
  };
  const handleRefresh = () => {
    refetch();
  };

  return (
    <>
      <View className="flex-1 bg-white">
        {/* header */}
        <View className="flex-row justify-between items-center px-4 py-2">
          <View className="flex flex-row justify-center items-center gap-4">
            <TouchableOpacity onPress={() => navigation.navigate('Setup')}>
              <Image
                source={{
                  uri: 'https://firebasestorage.googleapis.com/v0/b/clover-rn.appspot.com/o/user.png?alt=media&token=f504d6de-ef4d-4759-b91c-da060e6c1f04',
                }}
                className="w-12 h-12 rounded-full border border-primary "
              />
            </TouchableOpacity>
            <Text className="text-xl font-semibold leading-7 capitalize tracking-tight text-primary">
              {user.displayName}
            </Text>
          </View>

          <TouchableOpacity
            onPress={navigateToPreferences}
            className="p-2 border-secondary border rounded-full">
            <Icon name="filter" size={24} color={'#ff3a8e'} />
          </TouchableOpacity>
        </View>
        {/* SwiperCard */}

        <SwiperCard
          data={data}
          navigateToPreferences={navigateToPreferences}
          handleRefresh={handleRefresh}
          isLoading={isLoading}
        />
      </View>
    </>
  );
};

export default Home;
