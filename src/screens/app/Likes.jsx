import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useCallback} from 'react';
import {useAuth} from '../../context/AuthContext';
import {fetchUsersWhoLikedMe} from '../../services/matchServices';
import {useQuery} from '@tanstack/react-query';
const Likes = () => {
  const {user} = useAuth();
  const {data, refetch} = useQuery({
    queryKey: ['usersWhoLikedMe', user?.uid],
    queryFn: () => fetchUsersWhoLikedMe(user?.uid),
    enabled: !!user?.uid,
  });

  const handleRefresh = useCallback(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <View className="flex-1 bg-white">
        <Text>Likes</Text>
        <TouchableOpacity onPress={handleRefresh}>
          <Text>Refresh</Text>
        </TouchableOpacity>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View>
              <Text>{item.name}</Text>
              <Text>{item.phone}</Text>
            </View>
          )}
        />
      </View>
    </>
  );
};

export default Likes;
