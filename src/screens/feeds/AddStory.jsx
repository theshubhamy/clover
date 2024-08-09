import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  TextInput,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import ImagePicker from 'react-native-image-crop-picker';
import Video from 'react-native-video';
import {ImageFilterKit} from 'react-native-image-filter-kit';
import RNFS from 'react-native-fs';

const AddStory = ({navigation}) => {
  const device = useCameraDevice('front');
  const cameraRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaUri, setMediaUri] = useState(null);
  const [mediaType, setMediaType] = useState(null);
  const [textOverlay, setTextOverlay] = useState('');
  const [filteredMediaUri, setFilteredMediaUri] = useState(null);

  useEffect(() => {
    const currentCameraRef = cameraRef.current;

    const startCamera = async () => {
      if (device && currentCameraRef) {
        await currentCameraRef.start();
      }
    };

    startCamera();

    return () => {
      if (currentCameraRef) {
        currentCameraRef.stop();
      }
    };
  }, [device]);

  // Capture Photo
  const captureImage = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePhoto();
      setMediaUri(photo.uri);
      setMediaType('photo');
    }
  };

  // Capture Video
  const captureVideo = async () => {
    if (cameraRef.current) {
      if (isRecording) {
        const video = await cameraRef.current.stopRecording();
        setMediaUri(video.uri);
        setMediaType('video');
        setIsRecording(false);
      } else {
        cameraRef.current.startRecording({
          onRecordingFinished: video => {
            setMediaUri(video.uri);
            setMediaType('video');
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
        setMediaUri(response.path);
        setMediaType(response.mime.includes('video') ? 'video' : 'photo');
      }
    });
  };

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

  // Add Text Overlay
  const handleTextOverlay = text => {
    setTextOverlay(text);
  };

  // Save Image Locally or Upload to Server
  const saveMedia = async () => {
    if (filteredMediaUri) {
      const filePath = `${RNFS.DocumentDirectoryPath}/filteredMedia.jpg`;
      await RNFS.copyFile(filteredMediaUri, filePath);
      console.log('Image saved locally:', filePath);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Back and Settings Icons */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconButton}>
          <Icon name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="settings-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Camera Preview */}
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

      {/* Media Preview (Image or Video) */}
      {mediaUri && (
        <>
          {mediaType === 'photo' ? (
            <Image
              source={{uri: filteredMediaUri || mediaUri}}
              style={styles.mediaPreview}
            />
          ) : (
            <Video
              source={{uri: mediaUri}}
              style={styles.mediaPreview}
              controls={true}
              resizeMode="cover"
            />
          )}
          {textOverlay ? (
            <View style={styles.textOverlayContainer}>
              <Text style={styles.textOverlay}>{textOverlay}</Text>
            </View>
          ) : null}
        </>
      )}

      {/* Bottom Bar with Capture, Gallery, Filter, Text, and Upload Options */}
      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={selectMedia}>
          <Icon name="images-outline" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={captureImage}>
          <Icon name="camera-outline" size={50} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={isRecording ? captureVideo : captureVideo}>
          <Icon name="videocam-outline" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => applyFilter('invert')}>
          <Icon name="color-filter-outline" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => saveMedia()}>
          <Icon name="cloud-upload-outline" size={30} color="#fff" />
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
  camera: {
    width: '100%',
    height: '75%',
  },
  mediaPreview: {
    width: '100%',
    height: '75%',
  },
  textOverlayContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -50}, {translateY: -50}],
  },
  textOverlay: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#000',
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
});

export default AddStory;
// re write like first screen  upload or capture image or video.
// 2nd screen filter , add text on image or video set text  postion, and apply snapchat filter templete
