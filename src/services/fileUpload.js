import React, {useEffect} from 'react';
import {View, Button} from 'react-native';

import {utils} from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';

function App() {
  // create bucket storage reference to not yet existing image
  const reference = storage().ref('black-t-shirt-sm.png');

  return (
    <View>
      <Button
        onPress={async () => {
          // path to existing file on filesystem
          const pathToFile = `${utils.FilePath.PICTURES_DIRECTORY}/black-t-shirt-sm.png`;
          // uploads file
          await reference.putFile(pathToFile);
        }}
      />
    </View>
  );
}

const getImageUrl = async remotePath => {
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
