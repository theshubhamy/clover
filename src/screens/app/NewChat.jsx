import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {fetchUsers, createNewChatRoom} from '../../services/chatService'; // Import function to fetch matches

const NewChat = ({navigation}) => {
  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  console.log(selectedMatch);
  useEffect(() => {
    const fetchUserMatches = async () => {
      try {
        // Replace with your logic to fetch user matches from Firestore
        const matchesData = await fetchUsers(); // Implement fetchMatches in FirestoreService.js
        setMatches(matchesData);
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };
    fetchUserMatches();
  }, []);

  const handleCreateChatRoom = async () => {
    try {
      if (!selectedMatch) {
        // Handle case where no match is selected
        return;
      }
      const newChatRoomId = await createNewChatRoom(
        selectedMatch,
        selectedMatch.id,
      );
      console.log(newChatRoomId);
      navigation.navigate('ChatRoom', {chatRoomId: newChatRoomId});
    } catch (error) {
      console.error('Error creating new chat room:', error);
      // Handle error gracefully, show error message, etc.
    }
  };

  const handleMatchSelection = match => {
    setSelectedMatch(match);
  };

  return (
    <View className="flex-1">
      <Text className="text-2xl font-bold p-4">Create New Chat Room</Text>
      <View className="p-4">
        <FlatList
          data={matches}
          keyExtractor={item => item.userId}
          renderItem={({item}) => (
            <TouchableOpacity
              className="p-4 border-secondary border"
              onPress={() => handleMatchSelection(item)}>
              <Text className="text-lg">{item.name}</Text>
              <Text className="text-lg">{item.phone}</Text>
            </TouchableOpacity>
          )}
        />

        <TouchableOpacity
          className="p-4 bg-blue-500 rounded-full mt-4"
          onPress={handleCreateChatRoom}>
          <Text className="text-white font-bold">Create Chat Room</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NewChat;
