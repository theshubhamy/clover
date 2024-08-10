import React, {useState, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  Text,
  PanResponder,
  Animated,
  Modal,
  Button,
} from 'react-native';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/Ionicons';
import Video from 'react-native-video';
import RNFS from 'react-native-fs';
const StoryCanvas = ({route, navigation}) => {
  const timestamp = new Date().toISOString();
  const {mediaUri, mediaType} = route.params;
  const [filteredMediaUri, setFilteredMediaUri] = useState(mediaUri);
  const [textOverlay, setTextOverlay] = useState('');
  const [textColor, setTextColor] = useState('#fff');
  const [textSize, setTextSize] = useState(18);
  const [textVisible, setTextVisible] = useState(false);
  const [showTextEditor, setShowTextEditor] = useState(false);
  // Create PanResponder for text movement
  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
      useNativeDriver: false,
    }),
    onPanResponderRelease: (e, gestureState) => {
      pan.flattenOffset();
    },
  });

  // Save Image Locally or Upload to Server
  const saveMedia = async () => {
    if (filteredMediaUri) {
      const filePath = `${RNFS.DocumentDirectoryPath}/${mediaType}_${timestamp}.jpg`;
      await RNFS.copyFile(filteredMediaUri, filePath);
      console.log('Image saved locally:', filePath);
    }
  };

  return (
    <View style={styles.container}>
      {mediaType === 'photo' ? (
        <Image
          source={{uri: filteredMediaUri}}
          style={StyleSheet.absoluteFill}
        />
      ) : (
        <Video
          source={{uri: mediaUri}}
          style={StyleSheet.absoluteFill}
          controls={true}
          resizeMode="cover"
        />
      )}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconButton}>
          <Icon name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowTextEditor(true)}>
          <Icon name="text-outline" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={saveMedia} style={styles.iconButton}>
          <Icon name="cloud-upload-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
      {textVisible && (
        <Animated.View
          style={[
            styles.textOverlay,
            {
              transform: pan.getTranslateTransform(),
              fontSize: textSize,
            },
          ]}
          {...panResponder.panHandlers}>
          <Text style={{color: textColor, fontSize: textSize}}>
            {textOverlay}
          </Text>
        </Animated.View>
      )}

      {showTextEditor && (
        <Modal
          transparent={true}
          visible={showTextEditor}
          onRequestClose={() => setShowTextEditor(false)}>
          <View style={styles.modalContainer}>
            <TextInput
              style={[styles.textInput, {fontSize: textSize, color: textColor}]}
              placeholder="Add Text..."
              placeholderTextColor="#fff"
              onChangeText={setTextOverlay}
              value={textOverlay}
            />

            <Slider
              style={styles.slider}
              minimumValue={10}
              maximumValue={100}
              value={textSize}
              onValueChange={setTextSize}
            />

            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={255}
              onValueChange={value =>
                setTextColor(`rgb(${value}, ${value}, ${value})`)
              }
            />

            <Button title="Close" onPress={() => setShowTextEditor(false)} />
          </View>
        </Modal>
      )}

      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={saveMedia} style={styles.iconButton}>
          <Icon name="cloud-upload-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  iconButton: {
    padding: 5,
  },
  mediaPreview: {
    flex: 1,
  },
  textOverlay: {
    position: 'absolute',
  },
  textInput: {
    position: 'absolute',
    bottom: 100,
    left: 10,
    right: 10,
    borderBottomWidth: 1,
    color: '#fff',
    fontSize: 18,
    padding: 5,
    textAlign: 'center',
  },
  colorPicker: {
    position: 'absolute',
    bottom: 80,
    left: 10,
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slider: {
    width: '100%',
    marginVertical: 10,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StoryCanvas;
