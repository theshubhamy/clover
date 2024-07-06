import React from 'react';
import {FlatList, Text, View, StyleSheet} from 'react-native';
import useChat from '../../hooks/useChat';

const ChatRoom = ({chatRoomId}) => {
  const {messages} = useChat(chatRoomId);

  return (
    <View className="flex-1">
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View
            className={`flex-row my-1 ${
              item.senderId === 'currentUserId' ? 'flex-row-reverse' : ''
            }`}>
            <View
              className={`p-2 rounded-lg ${
                item.senderId === 'currentUserId'
                  ? 'bg-green-200'
                  : 'bg-gray-200'
              }`}>
              <Text>{item.text}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingVertical: 10,
  },
});

export default ChatRoom;
