import {firestoredb, firestore} from './firebase';

const listenForMessages = (chatRoomId, onSnapshot) => {
  return firestoredb
    .collection('chatRooms')
    .doc(chatRoomId)
    .collection('messages')
    .orderBy('timestamp', 'asc')
    .onSnapshot(onSnapshot);
};

export const fetchMatches = async () => {
  const userId = 'currentUserId'; // Replace with current user's ID or fetch dynamically
  const snapshot = await firestore()
    .collection('matches')
    .where('userId', '==', userId)
    .get();
  return snapshot.docs.map(doc => ({
    userId: doc.id,
    name: doc.data().name,
    // Add other match properties as needed
  }));
};

export const createNewChatRoom = async (chatRoomData, selectedMatchId) => {
  try {
    if (!selectedMatchId) {
      throw new Error('No match selected to create chat room');
    }

    const chatRoomRef = await firestore()
      .collection('chatRooms')
      .add({
        ...chatRoomData,
        members: selectedMatchId, // Assuming member data structure
        createdAt: firestore.FieldValue.serverTimestamp(), // Example metadata
        // Add other metadata as needed
      });
    return chatRoomRef.id;
  } catch (error) {
    throw error;
  }
};

const sendMessage = async (chatRoomId, message) => {
  try {
    await firestoredb
      .collection('chatRooms')
      .doc(chatRoomId)
      .collection('messages')
      .add({
        text: message.text,
        senderId: message.senderId,
        timestamp: firestore.FieldValue.serverTimestamp(),
      });
    console.log('Message sent successfully');
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

export {listenForMessages, sendMessage};
