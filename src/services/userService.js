import {firestoredb, firestore} from './firebase';

export const fetchUsers = async currentUserId => {
  const snapshot = await firestore().collection('users').get();
  return snapshot.docs
    .filter(doc => doc.id !== currentUserId)
    .map(doc => ({id: doc.id, ...doc.data()}));
};
const getUserProfile = async userId => {
  try {
    const doc = await firestoredb.collection('users').doc(userId).get();
    if (doc.exists) {
      return {id: doc.id, ...doc.data()};
    } else {
      throw new Error('User profile not found');
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

const updateUserProfile = async (userId, newData) => {
  try {
    await firestoredb.collection('users').doc(userId).update(newData);
    console.log('User profile updated successfully');
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

export {getUserProfile, updateUserProfile};
