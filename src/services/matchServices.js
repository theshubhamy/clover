import {firestore, firestoredb} from './firebase';

const fetchUsersWhoLikedMe = async admin => {
  try {
    const usersRef = firestoredb.collection('users');
    const snapshot = await usersRef.get();

    // Array to hold user IDs of users who liked the specific user
    const userPromises = snapshot.docs.map(async userDoc => {
      const userId = userDoc.id;
      const likesRef = firestoredb
        .collection('users')
        .doc(userId)
        .collection('likes');

      // Check if the likes subcollection contains the specific user ID
      const likeSnapshot = await likesRef
        .where(firestore.FieldPath.documentId(), '==', admin)
        .get();

      if (!likeSnapshot.empty) {
        const userProfile = userDoc.data();
        return userProfile; // Return the user ID if it contains the document
      }
      return null;
    });

    const results = await Promise.all(userPromises);

    return results.filter(userId => userId !== null);
  } catch (error) {
    console.error('Error fetching users who liked me:', error);
    throw error;
  }
};

const handleLike = async (currentUserId, likedUserId) => {
  try {
    // Store the like in the current user's likes sub-collection
    await firestore()
      .collection('users')
      .doc(currentUserId)
      .collection('likes')
      .doc(likedUserId)
      .set({likedAt: firestore.FieldValue.serverTimestamp()});

    // Check if the liked user has already liked the current user
    const mutualLikeDoc = await firestore()
      .collection('users')
      .doc(likedUserId)
      .collection('likes')
      .doc(currentUserId)
      .get();

    if (mutualLikeDoc.exists) {
      // Mutual like found, create a match for both users
      await createMatch(currentUserId, likedUserId);
    } else {
      console.log('Like stored, no mutual like yet.');
    }
  } catch (error) {
    console.error('Error handling like:', error);
    throw error;
  }
};

const createMatch = async (user1Id, user2Id) => {
  const matchData = {
    users: [user1Id, user2Id],
    matchedAt: firestore.FieldValue.serverTimestamp(),
  };

  // Create match documents for both users
  await firestore()
    .collection('users')
    .doc(user1Id)
    .collection('matches')
    .doc(user2Id)
    .set(matchData);

  await firestore()
    .collection('users')
    .doc(user2Id)
    .collection('matches')
    .doc(user1Id)
    .set(matchData);
};

export {handleLike, fetchUsersWhoLikedMe};
