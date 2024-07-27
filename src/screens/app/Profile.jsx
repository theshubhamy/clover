import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useAuth} from '../../context/AuthContext';
const Profile = () => {
  const {user, signOut} = useAuth();
  const items = [
    {label: 'Secrity', icon: 'lock-closed'},
    {label: 'Notification', icon: 'notifications'},
    {label: 'Langauage', icon: 'language'},
    {label: 'Subscription', icon: 'cash'},
    {label: 'Support', icon: 'headset'},
  ];
  const renderItem = ({item}) => (
    <TouchableOpacity className=" flex flex-row justify-between items-center p-4 my-2 rounded-full  bg-secondary ">
      <View className="flex flex-row gap-4 items-center">
        <Icon name={item.icon} size={24} color={'#FF3A8E'} />
        <Text>{item.label}</Text>
      </View>

      <Icon name="chevron-forward" size={24} color={'#FF3A8E'} />
    </TouchableOpacity>
  );
  return (
    <View className="flex-1 items-center justify-center bg-white p-8">
      <Image
        source={{
          uri: 'https://firebasestorage.googleapis.com/v0/b/clover-rn.appspot.com/o/user.png?alt=media&token=f504d6de-ef4d-4759-b91c-da060e6c1f04',
        }}
        className="w-24 h-24 rounded-full mb-4"
      />
      <Text className="text-2xl font-bold text-primary mb-8">
        {user?.displayName}
      </Text>
      <View className=" w-full ">
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          extraData={items}
        />
      </View>
      <View className="flex-1 justify-end w-full ">
        <TouchableOpacity
          onPress={() => signOut()}
          className="flex flex-row justify-center items-center px-4 py-3 bg-primary rounded-full w-full gap-4">
          <Icon name="log-out-outline" size={24} color={'#ffff'} />
          <Text className="text-white text-center text-lg font-medium">
            Log out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;
