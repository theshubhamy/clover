import React, {useState, useEffect} from 'react';
import {firestore} from '../../services/firebase';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
const ChatScreen = ({navigation}) => {
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('chatRooms')
      .onSnapshot(snapshot => {
        const rooms = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setChatRooms(rooms);
      });

    return () => unsubscribe();
  }, []);
  const openChatRoom = chatRoomId => {
    navigation.navigate('ChatRoom', {chatRoomId});
  };

  const createNewChat = () => {
    // Implement logic to create new chat
    // Example: createNewChatWithMatches();
    // Then navigate to the new chat room
    navigation.navigate('NewChat');
  };

  return (
    <View className="flex-1">
      <Text className="text-2xl font-bold p-4">Chats</Text>
      <FlatList
        data={chatRooms}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            className="p-4 border border-primary"
            onPress={() => openChatRoom(item.id)}>
            <Text className="text-lg text-primary">{item.name}</Text>
            <Text className="text-lg text-primary">{item.phone}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        className="p-4 bg-blue-500 rounded-full mt-4 mx-4"
        onPress={createNewChat}>
        <Text className="text-white font-bold">New Chat with Matches</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChatScreen;
