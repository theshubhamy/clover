import {firestoredb} from './firebase';

const calculateDistance = (currentUserLocation, userLocation) => {
  const lat1 = currentUserLocation.latitude;
  const lon1 = currentUserLocation.longitude;
  const lat2 = userLocation.latitude;
  const lon2 = userLocation.longitude;

  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km

  return distance;
};

const deg2rad = deg => {
  return deg * (Math.PI / 180);
};

const queryNearbyUsers = async (currentUserId, maxDistanceKm) => {
  try {
    const currentUserDoc = await firestoredb
      .collection('users')
      .doc(currentUserId)
      .get();
    const currentUserLocation = currentUserDoc.data().location;

    const nearbyUsersQuery = await firestoredb
      .collection('users')
      .where('location', '!=', null) // Ensure user has location set
      .where('userId', '!=', currentUserId) // Exclude current user
      .get();

    const nearbyUsers = [];
    nearbyUsersQuery.forEach(doc => {
      const userLocation = doc.data().location;
      const distance = calculateDistance(currentUserLocation, userLocation);
      if (distance <= maxDistanceKm) {
        nearbyUsers.push({id: doc.id, ...doc.data()});
      }
    });

    return nearbyUsers;
  } catch (error) {
    console.error('Error querying nearby users:', error);
    throw error;
  }
};

export {queryNearbyUsers};
