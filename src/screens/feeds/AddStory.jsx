import React, {useRef, useState} from 'react';
import {View, TouchableOpacity, SafeAreaView, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import ImagePicker from 'react-native-image-crop-picker';

const AddStory = ({navigation}) => {
  const devices = useCameraDevices();
  const [cameraPosition, setCameraPosition] = useState('back');
  const device = cameraPosition === 'back' ? devices.back : devices.front;
  const cameraRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);

  // Switch Camera
  const switchCamera = () => {
    setCameraPosition(prevPosition =>
      prevPosition === 'back' ? 'front' : 'back',
    );
  };

  // Capture Photo
  const captureImage = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePhoto();
      navigation.navigate('EditMediaScreen', {
        mediaUri: photo.uri,
        mediaType: 'photo',
      });
    }
  };

  // Capture Video
  const captureVideo = async () => {
    if (cameraRef.current) {
      if (isRecording) {
        const video = await cameraRef.current.stopRecording();
        setIsRecording(false);
        navigation.navigate('StoryCanvas', {
          mediaUri: video.uri,
          mediaType: 'video',
        });
      } else {
        cameraRef.current.startRecording({
          onRecordingFinished: video => {
            navigation.navigate('StoryCanvas', {
              mediaUri: video.uri,
              mediaType: 'video',
            });
          },
          onRecordingError: error => console.error(error),
        });
        setIsRecording(true);
      }
    }
  };

  // Select Media from Gallery
  const selectMedia = () => {
    ImagePicker.openPicker({
      mediaType: 'any',
    }).then(response => {
      if (response) {
        navigation.navigate('StoryCanvas', {
          mediaUri: response.path,
          mediaType: response.mime.includes('video') ? 'video' : 'photo',
        });
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {device && (
        <Camera
          ref={cameraRef}
          style={styles.camera}
          device={device}
          isActive={true}
          photo={true}
          video={true}
        />
      )}

      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={selectMedia}>
          <Icon name="images-outline" size={40} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={captureImage}>
          <Icon name="camera-outline" size={40} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={captureVideo}>
          <Icon name="videocam-outline" size={40} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={switchCamera}>
          <Icon name="camera-reverse-outline" size={40} color="#fff" />
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
  camera: {
    flex: 1,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#000',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});

export default AddStory;
