import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useQuery} from '@tanstack/react-query';
import SwiperCard from '../../components/SwiperCard';
import {useAuth} from '../../context/AuthContext';
import {fetchUsers} from '../../services/userService';
const Home = ({navigation}) => {
  const {user} = useAuth();
  const {data, isLoading} = useQuery({
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
        {data.length !== 0 ? (
          <SwiperCard data={data} />
        ) : (
          <View className="flex-1 p-4 bg-white  ">
            <View className="flex-1 justify-center items-center gap-4">
              <Icon name="sad" size={80} color={'#2C272C'} />
              <Text className="text-3xl font-bold text-paper">
                No new profiles
              </Text>
              <Text className="text-lg text-center px-4 text-paper  ">
                Change your preferences to expand your search and see New
                Profiles
              </Text>
            </View>

            <View className="flex-1 justify-end my-4 bg-white">
              <View className="flex-column justify-between items-center gap-8">
                <TouchableOpacity
                  className="px-4 py-3 bg-primary rounded-full w-full"
                  style={styles.cardShadow}
                  onPress={navigateToPreferences}>
                  <Text className="text-white text-center text-lg font-medium">
                    Change my preferences
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="px-4 py-3  bg-secondary  rounded-full w-full"
                  style={styles.cardShadow}>
                  <Text className="text-primary text-center text-lg font-medium">
                    Refresh
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});

export default Home;
