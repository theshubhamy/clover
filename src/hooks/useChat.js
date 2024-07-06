import {useEffect, useState} from 'react';
import {db} from '../services/firebase';

const useChat = chatRoomId => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection('chatRooms')
      .doc(chatRoomId)
      .collection('messages')
      .orderBy('timestamp', 'asc')
      .onSnapshot(snapshot => {
        const messagesData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(messagesData);
      });

    return () => unsubscribe();
  }, [chatRoomId]);

  const sendMessage = async message => {
    try {
      await db
        .collection('chatRooms')
        .doc(chatRoomId)
        .collection('messages')
        .add({
          text: message.text,
          senderId: message.senderId,
          timestamp: new Date(),
        });
      console.log('Message sent successfully');
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  };

  return {messages, sendMessage};
};

export default useChat;
