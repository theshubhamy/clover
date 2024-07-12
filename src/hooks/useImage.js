import storage from '@react-native-firebase/storage';

export const getImageUrl = async remotePath => {
  const reference = storage().ref(remotePath);

  try {
    const url = await reference.getDownloadURL();
    console.log('Download URL:', url);
    return url;
  } catch (error) {
    console.error('Error getting download URL:', error);
    return null;
  }
};
