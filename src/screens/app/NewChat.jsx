import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from 'react-native';
import io from 'socket.io-client';
import axios from 'axios';
import {useAuth} from '../../context/AuthContext';
const socket = io('http://localhost:5500'); // Replace with your server URL

const NewChat = ({route}) => {
  const {uid} = route.params;
  const {user} = useAuth();
  // Pass room information from navigation params
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    socket.emit('joinRoom', uid);

    socket.on('sendMessage', newMessage => {
      setMessages(prevMessages => [...prevMessages, newMessage]);
    });

    socket.on('typing', data => {
      setTyping(data.isTyping);
    });

    return () => {
      socket.off('sendMessage');
      socket.off('typing');
    };
  }, [uid]);

  const fetchMessages = async (useruid, ruid) => {
    try {
      const response = await axios.get(
        `http://localhost:5500/api/chat/getMessages/${useruid}/${ruid}`,
      );
      console.log(response.data);

      setMessages(response.data);
    } catch (error) {
      console.log(error);

      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    fetchMessages(user.uid, uid);
    return () => {};
  }, [user.uid, uid]);

  const handleSend = () => {
    if (message.trim()) {
      // Send the message to the server and store it
      socket.emit('sendMessage', {
        room: uid,
        senderId: user.uid,
        receiverId: uid,
        message,
      });
      setMessage('');
    }
  };

  const handleTyping = () => {
    socket.emit('typing', {uid, isTyping: true});
    setTimeout(() => {
      socket.emit('typing', {uid, isTyping: false});
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={item => item._id}
        renderItem={({item}) => (
          <View style={styles.message}>
            <Text>
              {item.sender}: {item.content}
            </Text>
          </View>
        )}
        style={styles.messageList}
      />
      {typing && <Text>Someone is typing...</Text>}
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={text => {
          setMessage(text);
          handleTyping();
        }}
        onSubmitEditing={handleSend}
      />
      <Button title="Send" onPress={handleSend} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  messageList: {
    flex: 1,
  },
  message: {
    marginVertical: 5,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginVertical: 5,
  },
});

export default NewChat;
