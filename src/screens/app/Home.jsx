import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useAuth} from '../../context/AuthContext';
const Home = ({navigation}) => {
  const {user} = useAuth();
  const navigateToPreferences = () => {
    navigation.navigate('Preference');
  };
  return (
    <View className="flex-1 bg-white">
      {/* header */}
      <View className="flex-row justify-between items-center p-4">
        <View className="flex flex-row justify-center items-center gap-4">
          <Image
            source={{
              uri:
                user?.photoURL ||
                'https://lh3.googleusercontent.com/a/ACg8ocKuqFFhgp6ba9uNDmyruXBgOopOeZEpkeG4D9P8FS6RnFDYHQ=s96-c',
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

      <View className="flex-1 p-4">
        <Text className="text-2xl mb-4">Welcome to the Dating App!</Text>
        {/* <Swiper
          cards={userList}
          renderCard={card => (
            <View className="bg-white rounded-lg shadow-lg p-6">
              <Text className="text-xl">{card.name}</Text>
              <Button
                title="View Profile"
                onPress={() =>
                  navigation.navigate('UserProfile', {userId: card.id})
                }
              />
            </View>
          )}
          cardIndex={0}
          backgroundColor={'#f8f8f8'}
          stackSize={3}
        /> */}
      </View>
    </View>
  );
};

export default Home;
