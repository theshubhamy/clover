import {firestoredb, firestore} from './firebase';

export const fetchUsers = async currentUserId => {
  try {
    const passesSnapshot = await firestore()
      .collection('users')
      .doc(currentUserId)
      .collection('passes')
      .get();

    const passedUserIds = passesSnapshot.docs.map(doc => doc.id);

    const likesSnapshot = await firestore()
      .collection('users')
      .doc(currentUserId)
      .collection('likes')
      .get();

    const likedUserIds = likesSnapshot.docs.map(doc => doc.id);

    // Combine passed and liked user IDs
    const excludedUserIds = [...new Set([...passedUserIds, ...likedUserIds])];

    if (excludedUserIds.length === 0) {
      excludedUserIds.push('dummy_id_to_avoid_empty_not_in_query');
    }

    const snapshot = await firestore()
      .collection('users')
      .where(firestore.FieldPath.documentId(), 'not-in', excludedUserIds)
      .get();

    // Filter out the current user from the fetched list
    const profiles = snapshot.docs
      .filter(doc => doc.id !== currentUserId)
      .map(doc => ({id: doc.id, ...doc.data()}));

    return profiles;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
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
const userSwipeProfiles = async (type, userId, userswiped) => {
  try {
    await firestoredb
      .collection('users')
      .doc(userId)
      .collection(type)
      .doc(userswiped?.id)
      .set(userswiped);

    console.log(`you swiped pass on ${userswiped.name}`);
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

export {getUserProfile, updateUserProfile, userSwipeProfiles};
