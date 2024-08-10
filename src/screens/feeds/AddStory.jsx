import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Linking,
  Animated,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import ImagePicker from 'react-native-image-crop-picker';
import Video from 'react-native-video';
const AddStory = ({navigation}) => {
  const device = useCameraDevice('front');
  const [torch, setTorch] = useState('off');
  const [flashtoggle, setFlashToggle] = useState(false);
  const cameraRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const blinkingAnimation = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    async function getPermission() {
      const permission = await Camera.requestCameraPermission();
      if (permission === 'denied') {
        await Linking.openSettings();
      }
    }
    getPermission();
  }, []);
  useEffect(() => {
    if (isRecording) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(blinkingAnimation, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(blinkingAnimation, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    } else {
      blinkingAnimation.stopAnimation();
      blinkingAnimation.setValue(0);
    }
  }, [isRecording, blinkingAnimation]);

  // Capture Photo
  const captureImage = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePhoto({
        qualityPrioritization: 'quality',
        flash: `${torch}`,
        enableAutoRedEyeReduction: true,
      });
      navigation.navigate('StoryCanvas', {
        mediaUri: photo.path,
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
          mediaUri: video.path,
          mediaType: 'video',
        });
      } else {
        setIsRecording(true);
        const torchEnabled = device?.hasTorch && torch === 'on';
        cameraRef.current.startRecording({
          flash: torchEnabled ? 'on' : 'off',
          onRecordingFinished: video => {
            navigation.navigate('StoryCanvas', {
              mediaUri: video.path,
              mediaType: 'video',
            });
          },
          onRecordingError: error => console.error(error + '89'),
        });
      }
    }
  };

  // Select Media from Gallery
  const selectMedia = () => {
    ImagePicker.openPicker({
      mediaType: 'video',
    }).then(response => {
      if (response) {
        // Check video duration
        const videoUri = response.path;
        const videoPlayer = new Video({uri: videoUri});

        videoPlayer.onLoad = ({duration}) => {
          if (duration <= 30) {
            navigation.navigate('StoryCanvas', {
              mediaUri: videoUri,
              mediaType: 'video',
            });
          } else {
            Alert.alert(
              'Video Too Long',
              'Please select a video that is 30 seconds or less.',
              [{text: 'OK', onPress: () => {}}],
            );
          }
        };
      }
    });
  };

  if (!device) {
    return (
      <View style={styles.container}>
        <Text>Loading camera...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {device && (
        <Camera
          ref={cameraRef}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          photo={true}
          video={true}
          audio={true}
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
          <View style={styles.recordingIconContainer}>
            <Icon
              name={isRecording ? 'videocam-outline' : 'videocam-off'}
              size={40}
              color="#fff"
            />
            {isRecording && (
              <Animated.View
                style={[
                  styles.blinkingDot,
                  {
                    opacity: blinkingAnimation,
                  },
                ]}
              />
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cameraFlashBtn}
          onPress={() => {
            setFlashToggle(!flashtoggle);
            torch === 'off' ? setTorch('on') : setTorch('off');
          }}>
          <Icon
            name={torch === 'off' ? 'flash-off' : 'flash'}
            size={40}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  recordingIconContainer: {
    position: 'relative',
  },
  blinkingDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
  },
});

export default AddStory;
