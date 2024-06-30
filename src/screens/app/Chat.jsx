// screens/ChatScreen.js
import React, {useContext, useState, useEffect} from 'react';
import {View, TextInput, Button, FlatList, Text} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../context/AuthContext';
import {tailwind} from 'react-native-tailwindcss';

const ChatScreen = ({route}) => {
  const {user} = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('messages')
      .where('chatId', '==', route.params.chatId)
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const messagesData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(messagesData);
      });
    return unsubscribe;
  }, [route.params.chatId]);

  const sendMessage = () => {
    firestore().collection('messages').add({
      text,
      createdAt: firestore.FieldValue.serverTimestamp(),
      userId: user.uid,
      chatId: route.params.chatId,
    });
    setText('');
  };

  return (
    <View style={tailwind('flex-1 p-4')}>
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <Text style={tailwind('p-2')}>{item.text}</Text>
        )}
      />
      <TextInput
        style={tailwind('border p-2 mb-2')}
        value={text}
        onChangeText={setText}
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
};

export default ChatScreen;
