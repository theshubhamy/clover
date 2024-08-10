import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  TextInput,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Video from 'react-native-video';
import {ImageFilterKit} from 'react-native-image-filter-kit';
import RNFS from 'react-native-fs';

const StoryCanvas = ({route, navigation}) => {
  const timestamp = new Date().toISOString();
  const {mediaUri, mediaType} = route.params;
  const [filteredMediaUri, setFilteredMediaUri] = useState(mediaUri);
  const [textOverlay, setTextOverlay] = useState('');

  // Apply Filter to Image
  const applyFilter = async filterType => {
    if (mediaType === 'photo' && mediaUri) {
      try {
        const filteredImage = await ImageFilterKit.filter(mediaUri, filterType);
        setFilteredMediaUri(filteredImage);
      } catch (error) {
        console.error('Filter application failed', error);
      }
    }
  };

  // Save Image Locally or Upload to Server
  const saveMedia = async () => {
    if (filteredMediaUri) {
      const filePath = `${RNFS.DocumentDirectoryPath}/filteredMedia_${timestamp}.jpg`;
      await RNFS.copyFile(filteredMediaUri, filePath);
      console.log('Image saved locally:', filePath);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconButton}>
          <Icon name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={saveMedia} style={styles.iconButton}>
          <Icon name="cloud-upload-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {mediaType === 'photo' ? (
        <Image source={{uri: filteredMediaUri}} style={styles.mediaPreview} />
      ) : (
        <Video
          source={{uri: mediaUri}}
          style={styles.mediaPreview}
          controls={true}
          resizeMode="cover"
        />
      )}

      <TextInput
        style={styles.textInput}
        placeholder="Add Text..."
        placeholderTextColor="#fff"
        onChangeText={setTextOverlay}
        value={textOverlay}
      />

      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={() => applyFilter('invert')}>
          <Icon name="color-filter-outline" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => applyFilter('sepia')}>
          <Icon name="color-filter-outline" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => applyFilter('grayscale')}>
          <Icon name="color-filter-outline" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  iconButton: {
    padding: 5,
  },
  mediaPreview: {
    width: '100%',
    height: '75%',
  },
  textInput: {
    position: 'absolute',
    bottom: 80,
    left: 10,
    right: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    color: '#fff',
    fontSize: 18,
    padding: 5,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#000',
  },
});

export default StoryCanvas;
