import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import React, {useCallback} from 'react';
import {useAuth} from '../../context/AuthContext';
import {fetchUsersWhoLikedMe} from '../../services/matchServices';
import {useQuery} from '@tanstack/react-query';

const Likes = ({navigation}) => {
  const {user} = useAuth();

  const {data, refetch} = useQuery({
    queryKey: ['usersWhoLikedMe', user?.uid],
    queryFn: () => fetchUsersWhoLikedMe(user?.uid),
    enabled: !!user?.uid,
  });

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const renderItem = ({item}) => (
    <View className={'flex-1 m-2 bg-gray-100 rounded-lg'}>
      <Image
        source={require('../../assets/user.png')}
        className={'w-full h-36 rounded-t-lg'}
      />
      <View className={'px-4 py-2 bg-white'}>
        <Text className={'text-lg font-bold'}>{item?.name}</Text>
        <Text>{item?.phone}</Text>
        <Text>{item?.age}</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('NewChat', item)}>
        <Text> Chat</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View className={'flex-1 bg-white p-4'} style={styles.cardShadow}>
      <Text className={'text-xl font-bold text-center mb-4'}>Likes</Text>
      <TouchableOpacity onPress={handleRefresh} className={'mb-4'}>
        <Text className={'text-blue-500 text-center'}>Refresh</Text>
      </TouchableOpacity>
      <FlatList
        data={data}
        keyExtractor={item => item.phone}
        renderItem={renderItem}
        numColumns={2}
        contentContainer
        columnWrapper
      />
    </View>
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

export default Likes;
