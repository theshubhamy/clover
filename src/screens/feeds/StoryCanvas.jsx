import {BlurView} from '@react-native-community/blur';
import React, {useEffect, useRef, useState, useMemo} from 'react';
import {
  Animated,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  StatusBar,
} from 'react-native';
import {
  PanGestureHandler,
  PinchGestureHandler,
  RotationGestureHandler,
  State,
  TextInput,
} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useKeyboardStatus} from '../../hooks/useKeyboardStatus';
import {emojiList} from '../../_mock/emojiList';
import {textColors} from '../../_mock/textColors';

const StoryCanvas = ({route, navigation}) => {
  const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
  const STATUS_BAR_HEIGHT = StatusBar.currentHeight || 0;
  const {mediaUri, mediaType} = route.params;
  let images = mediaUri;
  const keyboard = useKeyboardStatus();
  const [states, setState] = useState({});
  const [currentImageIndex, setCurrentIndex] = useState(0);
  const [text, setText] = useState('');
  const [draggingLabel, setDraggingLabel] = useState(false);
  const [showLabelOptions, setShowLabelOptions] = useState(false);
  const [textColor, setTextColor] = useState('#fff');
  const [textAlign, setTextAlign] = useState('center');
  const [textBg, setTextBg] = useState(false);
  const _animRatioTrashCan = useMemo(() => new Animated.Value(1), []);
  const _hScrollRef = useRef(null);

  const [mode, setMode] = useState(1); // 1: general, 2: TextEdit, 3: Mention Label, 4: Hashtag Label

  const _labeLWrapperYAnim = useMemo(() => new Animated.Value(0), []);
  console.log(images);

  const [enableGesture, setEnableGesture] = useState(true);
  const ref = useRef({
    processImages: {
      base64: images.base64,
      extension: images.extension,
      uri: images.path,
      width: images.width,
      height: images.height,
      ratio: SCREEN_WIDTH / images.width,
      translateX: 0,
      translateY: 0,
      rotateDeg: 0,
      texts: [],
      labels: [],
    },
    textWidth: 0,
    textHeight: 0,
    trashCanX: (SCREEN_WIDTH - 44) / 2,
    trashCanY: SCREEN_HEIGHT - 62,
    zoomTrashCan: false,
    labelContainerY: 0,
  });

  useEffect(() => {
    _hScrollRef.current?.scrollTo({
      x: SCREEN_WIDTH * currentImageIndex,
      y: 0,
      animated: true,
    });
  }, [currentImageIndex, SCREEN_WIDTH]);

  useEffect(() => {
    if (!keyboard) {
      setMode(1);
    }
  }, [keyboard]);

  const _onEndDrag = ({
    nativeEvent: {
      contentOffset: {x},
    },
  }) => {
    const tabIndex = Math.floor(x / SCREEN_WIDTH);
    const percentOffset = (x - tabIndex * SCREEN_WIDTH) / SCREEN_WIDTH;
    let nextTabIndex = percentOffset > 0.5 ? tabIndex + 1 : tabIndex;
    _hScrollRef.current?.scrollTo({
      x: nextTabIndex * SCREEN_WIDTH,
      y: 0,
      animated: true,
    });
    setCurrentIndex(nextTabIndex);
  };

  const _onTranslateStateChange = ({
    nativeEvent: {translationX, translationY, state},
  }) => {
    if (state === State.END) {
      ref.current.processImages[currentImageIndex].translateX += translationX;
      ref.current.processImages[currentImageIndex].translateY += translationY;
    }
  };

  const _onZoomStateChange = ({nativeEvent: {scale, state}}) => {
    if (state === State.END) {
      ref.current.processImages[currentImageIndex].ratio *= scale;
    }
  };

  const _onRotateStateChange = ({nativeEvent: {rotation, state}}) => {
    if (state === State.END) {
      ref.current.processImages[currentImageIndex].rotateDeg += rotation;
    }
  };

  const _onText = () => {
    setMode(2);
    refreshTextState();
  };

  const refreshTextState = () => {
    setText('');
    setTextAlign('center');
    setTextBg(false);
    setTextColor('#fff');
  };

  const _onChangeTextAlign = () => {
    setTextAlign(
      textAlign === 'center'
        ? 'flex-start'
        : textAlign === 'flex-start'
        ? 'flex-end'
        : 'center',
    );
  };

  const _onDoneText = () => {
    if (text.length > 0) {
      const offsetX =
        textAlign === 'center'
          ? (SCREEN_WIDTH - ref.current.textWidth) / 2
          : textAlign === 'flex-start'
          ? 15
          : SCREEN_WIDTH - ref.current.textWidth - 15;
      const textZindexList = ref.current.processImages[
        currentImageIndex
      ].texts.map(x => x.zIndex);
      const labelZindexList = ref.current.processImages[
        currentImageIndex
      ].labels.map(x => x.zIndex);
      let maxlabelZindex = Math.max(...textZindexList.concat(labelZindexList));
      maxlabelZindex = maxlabelZindex !== -Infinity ? maxlabelZindex : 0;
      const storyText = {
        zIndex: maxlabelZindex + 1,
        color: textColor,
        fontSize: 40,
        text,
        textAlign,
        textBg,
        x: offsetX,
        y: (SCREEN_HEIGHT - ref.current.textHeight) / 2,
        animX: new Animated.Value(offsetX),
        animY: new Animated.Value((SCREEN_HEIGHT - ref.current.textHeight) / 2),
        height: ref.current.textHeight,
        width: ref.current.textWidth,
        ratio: 1,
        animRatio: new Animated.Value(1),
      };
      ref.current.processImages[currentImageIndex].texts.push(storyText);
    }
    setMode(1);
  };

  const _onTextLabelTranslateHandler = (
    index,
    {nativeEvent: {translationX, translationY}},
  ) => {
    if (!draggingLabel) {
      setDraggingLabel(true);
    }
    const label = ref.current.processImages[currentImageIndex].texts[index];

    if (
      Math.abs(
        (label.y + translationY + label.height) * label.ratio -
          ref.current.trashCanY,
      ) < 50
    ) {
      if (!ref.current.zoomTrashCan) {
        Animated.spring(_animRatioTrashCan, {
          toValue: 1.5,
          useNativeDriver: true,
        }).start(() => (ref.current.zoomTrashCan = true));
      }
    } else {
      if (ref.current.zoomTrashCan) {
        Animated.spring(_animRatioTrashCan, {
          toValue: 1,
          useNativeDriver: true,
        }).start(() => (ref.current.zoomTrashCan = false));
      }
    }
    label.animX.setValue((label.x + translationX) * label.ratio);
    label.animY.setValue((label.y + translationY) * label.ratio);
  };

  const _onTextLabelTranslateChangeState = (
    index,
    {nativeEvent: {translationX, translationY, state}},
  ) => {
    setDraggingLabel(false);
    if (state === State.END) {
      const label = ref.current.processImages[currentImageIndex].texts[index];
      label.x += translationX;
      label.y += translationY;
      if (
        Math.abs(
          (label.y + label.height) * label.ratio - ref.current.trashCanY,
        ) < 50
      ) {
        ref.current.processImages[currentImageIndex].texts.splice(index, 1);
        setState({});
      }
      ref.current.zoomTrashCan = false;
    }
  };

  const _onTextLabelZoomHandler = (index, {nativeEvent: {scale}}) => {
    const label = ref.current.processImages[currentImageIndex].texts[index];
    label.animRatio.setValue(label.ratio * scale);
  };

  const _onTextLabelZoomChangeState = (
    index,
    {nativeEvent: {scale, state}},
  ) => {
    if (state === State.END) {
      const label = ref.current.processImages[currentImageIndex].texts[index];
      label.ratio *= scale;
    }
  };

  const _onLabelOptionsContainerTranslate = ({nativeEvent: {translationY}}) => {
    if (mode !== 1) {
      return;
    }
    if (
      ref.current.labelContainerY + translationY <
        -(SCREEN_HEIGHT - STATUS_BAR_HEIGHT - 50) ||
      ref.current.labelContainerY + translationY > 0
    ) {
      return;
    }
    _labeLWrapperYAnim.setValue(ref.current.labelContainerY + translationY);
  };

  const _onLabelOptionsContainerTranslateStateChange = ({
    nativeEvent: {translationY, state},
  }) => {
    if (mode !== 1) {
      return;
    }
    if (state === State.END) {
      ref.current.labelContainerY += translationY;
    }
  };

  const _toggleLabelOptions = () => {
    if (showLabelOptions) {
      Animated.timing(_labeLWrapperYAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setShowLabelOptions(false);
        ref.current.labelContainerY = 0;
      });
    } else {
      setShowLabelOptions(true);
      Animated.timing(_labeLWrapperYAnim, {
        toValue: -(SCREEN_HEIGHT - STATUS_BAR_HEIGHT - 50),
        duration: 500,
        useNativeDriver: true,
      }).start(
        () =>
          (ref.current.labelContainerY = -(
            SCREEN_HEIGHT -
            STATUS_BAR_HEIGHT -
            50
          )),
      );
    }
  };
  const _onLabelOptionsContainerTranslateChangeState = ({
    nativeEvent: {translationY, state},
  }) => {
    if (state === State.END) {
      if (
        ref.current.labelContainerY + translationY <
        -(SCREEN_HEIGHT - STATUS_BAR_HEIGHT - 50) / 2
      ) {
        Animated.timing(_labeLWrapperYAnim, {
          duration: 250,
          toValue: -(SCREEN_HEIGHT - STATUS_BAR_HEIGHT - 50),
          useNativeDriver: true,
        }).start();
        ref.current.labelContainerY = -(SCREEN_HEIGHT - STATUS_BAR_HEIGHT - 50);
      } else {
        Animated.timing(_labeLWrapperYAnim, {
          duration: 250,
          toValue: 0,
          useNativeDriver: true,
        }).start(() => setShowLabelOptions(false));
        ref.current.labelContainerY = 0;
        Keyboard.dismiss();
      }
    }
  };

  const _showLabelOptionsContainer = () => {
    setShowLabelOptions(true);
    Animated.timing(_labeLWrapperYAnim, {
      duration: 250,
      toValue: -(SCREEN_HEIGHT - STATUS_BAR_HEIGHT - 50),
      useNativeDriver: true,
    }).start();
    ref.current.labelContainerY = -(SCREEN_HEIGHT - STATUS_BAR_HEIGHT - 50);
  };

  const _hideLabelOptionsContainer = () => {
    Animated.timing(_labeLWrapperYAnim, {
      duration: 250,
      toValue: 0,
      useNativeDriver: true,
    }).start(() => setShowLabelOptions(false));
    ref.current.labelContainerY = 0;
    Keyboard.dismiss();
  };

  // Label processor
  const _onLabelTranslateHandler = (
    index,
    {nativeEvent: {translationX, translationY}},
  ) => {
    if (!draggingLabel) {
      setDraggingLabel(true);
    }
    const label = ref.current.processImages[currentImageIndex].labels[index];

    if (
      Math.abs(
        (label.y + translationY + label.height) * label.ratio -
          ref.current.trashCanY,
      ) < 50
    ) {
      if (!ref.current.zoomTrashCan) {
        Animated.spring(_animRatioTrashCan, {
          toValue: 1.5,
          useNativeDriver: true,
        }).start(() => (ref.current.zoomTrashCan = true));
      }
    } else {
      if (ref.current.zoomTrashCan) {
        Animated.spring(_animRatioTrashCan, {
          toValue: 1,
          useNativeDriver: true,
        }).start(() => (ref.current.zoomTrashCan = false));
      }
    }
    label.animX.setValue((label.x + translationX) * label.ratio);
    label.animY.setValue((label.y + translationY) * label.ratio);
  };

  const _onLabelTranslateChangeState = (
    index,
    {nativeEvent: {translationX, translationY, state}},
  ) => {
    setDraggingLabel(false);
    if (state === State.END) {
      const label = ref.current.processImages[currentImageIndex].labels[index];
      label.x += translationX;
      label.y += translationY;
      if (
        Math.abs(
          (label.y + label.height) * label.ratio - ref.current.trashCanY,
        ) < 50
      ) {
        ref.current.processImages[currentImageIndex].labels.splice(index, 1);
        setState({}); // Updated to match the previous change
      }
      ref.current.zoomTrashCan = false;
    }
  };

  // Label zoom processor
  const _onLabelZoomHandler = (index, {nativeEvent: {scale}}) => {
    const label = ref.current.processImages[currentImageIndex].labels[index];
    label.animRatio.setValue(label.ratio * scale);
  };

  const _onLabelZoomChangeState = (index, {nativeEvent: {scale, state}}) => {
    if (state === State.END) {
      const label = ref.current.processImages[currentImageIndex].labels[index];
      label.ratio *= scale;
    }
  };

  const _onSelectedEmoji = emoji => {
    const textZindexList = ref.current.processImages[
      currentImageIndex
    ].texts.map(x => x.zIndex);
    const labelZindexList = ref.current.processImages[
      currentImageIndex
    ].labels.map(x => x.zIndex);
    let maxlabelZindex =
      Math.max(...textZindexList.concat(labelZindexList)) || 0;
    maxlabelZindex = maxlabelZindex !== -Infinity ? maxlabelZindex : 0;
    const emojiLabel = {
      zIndex: maxlabelZindex + 1,
      animRatio: new Animated.Value(1),
      animX: new Animated.Value((SCREEN_WIDTH - 55) / 2),
      animY: new Animated.Value((SCREEN_HEIGHT - 55) / 2),
      x: (SCREEN_WIDTH - 55) / 2,
      y: (SCREEN_HEIGHT - 55) / 2,
      fontSize: 40,
      height: 55,
      width: 55,
      ratio: 1,
      text: emoji,
      type: 'emoji',
    };
    ref.current.processImages[currentImageIndex].labels.push(emojiLabel);
    setState({}); // Updated to match the previous change
  };

  const _onDoneLabel = () => {
    if (text.length < 2) {
      return setMode(1);
    }
    const textZindexList = ref.current.processImages[
      currentImageIndex
    ].texts.map(x => x.zIndex);
    const labelZindexList = ref.current.processImages[
      currentImageIndex
    ].labels.map(x => x.zIndex);
    let maxlabelZindex =
      Math.max(...textZindexList.concat(labelZindexList)) || 0;
    maxlabelZindex = maxlabelZindex !== -Infinity ? maxlabelZindex : 0;
    const label = {
      zIndex: maxlabelZindex + 1,
      animRatio: new Animated.Value(1),
      animX: new Animated.Value(
        (SCREEN_WIDTH - (ref.current.textWidth + 10)) / 2,
      ),
      animY: new Animated.Value((SCREEN_HEIGHT - 64) / 2),
      x: (SCREEN_WIDTH - (ref.current.textWidth + 10)) / 2,
      y: (SCREEN_HEIGHT - 64) / 2,
      fontSize: 40,
      height: 64,
      width: ref.current.textWidth + 10,
      ratio: 1,
      text,
      type: 'people',
    };
    if (mode === 4) {
      label.type = 'hashtag';
    }
    ref.current.processImages[currentImageIndex].labels.push(label);
    setMode(1);
  };

  const _onSelectLabel = (type, value) => {
    switch (type) {
      case 'address':
        break;
      case 'people':
        refreshTextState();
        setMode(3);
        break;
      case 'hashtag':
        refreshTextState();
        setMode(4);
        break;
      case 'emoji':
        _onSelectedEmoji(value);
        break;
      default:
        throw new Error();
    }
    _hideLabelOptionsContainer();
  };

  const _validateLabelText = txt => {
    if (txt[0]) {
      if (mode === 3 && txt[0] !== '@') {
        return setText('@' + txt);
      }
      if (mode === 4 && txt[0] !== '#') {
        return setText('#' + txt);
      }
    }
    if (mode === 3 && /^((\@(\w|\.)+)|\@)$/g.test(txt)) {
      setText(txt);
    }
    if (mode === 4 && /^((\#\w+)|\#)$/g.test(txt)) {
      setText(txt);
    }
  };

  return (
    <PanGestureHandler
      onHandlerStateChange={_onLabelOptionsContainerTranslateChangeState}
      onGestureEvent={_onLabelOptionsContainerTranslate}>
      <View>
        {mode === 1 && !draggingLabel && !showLabelOptions && (
          <View style={styles.topOptionsWrapper}>
            <TouchableOpacity
              onPress={navigation.goBack}
              style={styles.btnTopOption}>
              <Text
                style={{
                  fontSize: 30,
                  color: '#fff',
                }}>
                ✕
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={_showLabelOptionsContainer}
              style={styles.btnTopOption}>
              <Icon name="sticker-emoji" size={30} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={_onText} style={styles.btnTopOption}>
              <Icon name="alpha-a-box" size={30} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
        {mode === 2 && (
          <KeyboardAvoidingView
            behavior="height"
            style={styles.textToolWrapper}>
            <View style={styles.textTopOptions}>
              <TouchableOpacity
                onPress={_onChangeTextAlign}
                style={styles.btnTopOption}>
                <Icon
                  name={
                    textAlign === 'center'
                      ? 'format-align-center'
                      : textAlign === 'flex-start'
                      ? 'format-align-left'
                      : 'format-align-right'
                  }
                  size={30}
                  color="#fff"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={setTextBg.bind(null, !textBg)}
                style={styles.btnTopOption}>
                <Icon
                  name={textBg ? 'alpha-a-box' : 'alpha-a'}
                  size={30}
                  color="#fff"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={_onDoneText}
                style={{
                  ...styles.btnTopOption,
                  width: 60,
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: '#fff',
                    fontSize: 18,
                  }}>
                  Done
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                ...styles.textWrapper,
                justifyContent: textAlign,
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor:
                    textBg === true ? textColor : 'rgba(0,0,0,0)',
                  padding: 5,
                  borderRadius: 5,
                }}>
                <TextInput
                  onContentSizeChange={e => {
                    ref.current.textHeight = e.nativeEvent.contentSize.height;
                    ref.current.textWidth = e.nativeEvent.contentSize.width;
                  }}
                  multiline={true}
                  autoFocus={true}
                  autoCapitalize="none"
                  value={text}
                  onChangeText={setText}
                  style={{
                    textAlign:
                      textAlign === 'flex-start'
                        ? 'left'
                        : textAlign === 'flex-end'
                        ? 'right'
                        : 'center',
                    fontSize: 40,
                    fontWeight: '800',
                    color: textBg ? '#000' : textColor,
                    maxWidth: SCREEN_WIDTH - 30,
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.textBottompOptions}>
              <View
                style={{
                  ...styles.circleSelectedColor,
                  backgroundColor: textColor,
                }}>
                <Icon
                  name="eyedropper-variant"
                  size={20}
                  color={textColor === '#fff' ? '#000' : '#fff'}
                />
              </View>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                style={{
                  width: SCREEN_WIDTH - 50,
                }}
                keyboardShouldPersistTaps="always"
                horizontal={true}>
                {textColors.map((tColor, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setTextColor(tColor)}
                    style={{
                      ...styles.circleTextColor,
                      backgroundColor: tColor,
                    }}></TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
        )}
        {(mode === 3 || mode === 4) && (
          <KeyboardAvoidingView
            behavior="height"
            style={{
              ...styles.textToolWrapper,
            }}>
            <View
              style={{
                ...styles.textTopOptions,
                justifyContent: 'flex-end',
              }}>
              <TouchableOpacity
                onPress={_onDoneLabel}
                style={{
                  ...styles.btnTopOption,
                  width: 60,
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: '#fff',
                    fontSize: 18,
                  }}>
                  Done
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                ...styles.textWrapper,
                justifyContent: 'center',
              }}>
              <View
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 5,
                  padding: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 64,
                }}>
                <TextInput
                  onSubmitEditing={_onDoneLabel}
                  onContentSizeChange={e => {
                    ref.current.textHeight = e.nativeEvent.contentSize.height;
                    ref.current.textWidth = e.nativeEvent.contentSize.width;
                  }}
                  autoFocus={true}
                  autoCapitalize="none"
                  value={text}
                  onChangeText={txt => {
                    _validateLabelText(txt);
                  }}
                  style={{
                    opacity: 0,
                    fontSize: 40,
                    fontWeight: '800',
                    maxWidth: SCREEN_WIDTH - 30,
                  }}
                />
                <View
                  style={{
                    position: 'absolute',
                    left: 5,
                    top: 5,
                    width: '100%',
                    height: '100%',
                    zIndex: -1,
                    alignItems: 'center',
                  }}>
                  <Text
                    text={text}
                    style={{
                      fontSize: 40,
                      opacity: text.length === 0 ? 0.5 : 1,
                    }}
                  />
                </View>
              </View>
            </View>
            <View />
          </KeyboardAvoidingView>
        )}
        <ImageBackground
          style={styles.backgroundContainer}
          source={{
            uri: ref.current.processImages.uri,
          }}
          blurRadius={10}>
          {ref.current.processImages.texts.map((txtLabel, labelIndex) => (
            <PanGestureHandler
              key={labelIndex}
              onGestureEvent={e => {
                _onTextLabelTranslateHandler(labelIndex, e);
              }}
              onHandlerStateChange={e => {
                _onTextLabelTranslateChangeState(labelIndex, e);
              }}>
              <PinchGestureHandler
                onGestureEvent={e => {
                  _onTextLabelZoomHandler(labelIndex, e);
                }}
                onHandlerStateChange={e => {
                  _onTextLabelZoomChangeState(labelIndex, e);
                }}>
                <Animated.View
                  style={{
                    zIndex: txtLabel.zIndex,
                    backgroundColor: txtLabel.textBg
                      ? txtLabel.color
                      : 'rgba(0,0,0,0)',
                    padding: 5,
                    borderRadius: 5,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    transform: [
                      {
                        translateX: txtLabel.animX,
                      },
                      {
                        translateY: txtLabel.animY,
                      },
                      {
                        scale: txtLabel.animRatio,
                      },
                    ],
                  }}>
                  <Text
                    style={{
                      width: txtLabel.width,
                      height: txtLabel.height + 5,
                      textAlign:
                        txtLabel.textAlign === 'flex-start'
                          ? 'left'
                          : txtLabel.textAlign === 'flex-end'
                          ? 'right'
                          : 'center',
                      fontSize: 40,
                      fontWeight: '800',
                      color: txtLabel.textBg ? '#000' : txtLabel.color,
                    }}>
                    {txtLabel.text}
                  </Text>
                </Animated.View>
              </PinchGestureHandler>
            </PanGestureHandler>
          ))}
          {ref.current.processImages.labels.map((label, labelIndex) => (
            <PanGestureHandler
              key={labelIndex}
              onGestureEvent={e => {
                _onLabelTranslateHandler(labelIndex, e);
              }}
              onHandlerStateChange={e => {
                _onLabelTranslateChangeState(labelIndex, e);
              }}>
              <PinchGestureHandler
                onGestureEvent={e => {
                  _onLabelZoomHandler(labelIndex, e);
                }}
                onHandlerStateChange={e => {
                  _onLabelZoomChangeState(labelIndex, e);
                }}>
                <Animated.View
                  style={{
                    zIndex: label.zIndex,
                    backgroundColor:
                      label.type === 'emoji' ? 'rgba(0,0,0,0)' : '#fff',
                    borderRadius: 5,
                    position: 'absolute',
                    width: label.width,
                    height: label.height,
                    justifyContent: 'center',
                    alignItems: 'center',
                    top: 0,
                    left: 0,
                    transform: [
                      {
                        translateX: label.animX,
                      },
                      {
                        translateY: label.animY,
                      },
                      {
                        scale: label.animRatio,
                      },
                    ],
                  }}>
                  {label.type === 'emoji' ? (
                    <Text style={{fontSize: 60}}>{label.text}</Text>
                  ) : label.type === 'gif' ? (
                    <FastImage
                      source={{
                        uri: label.uri,
                      }}
                      resizeMode={FastImage.resizeMode.cover}
                      style={{
                        width: label.width,
                        height: label.height,
                      }}
                    />
                  ) : (
                    <FastImage
                      source={{
                        uri: label.uri,
                      }}
                      resizeMode={FastImage.resizeMode.cover}
                      style={{
                        width: label.width,
                        height: label.height,
                      }}
                    />
                  )}
                </Animated.View>
              </PinchGestureHandler>
            </PanGestureHandler>
          ))}
        </ImageBackground>
      </View>
    </PanGestureHandler>
  );
};
const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
const STATUS_BAR_HEIGHT = StatusBar.currentHeight || 0;
const styles = StyleSheet.create({
  backgroundContainer: {
    overflow: 'hidden',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  topOptionsWrapper: {
    height: 50 + STATUS_BAR_HEIGHT,
    paddingTop: STATUS_BAR_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
    zIndex: 1,
    width: '100%',
  },
  bottomOptionsWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 15,
  },
  bottomOption: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
  },
  textToolWrapper: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'space-between',
  },
  textTopOptions: {
    flexDirection: 'row',
    height: 50 + STATUS_BAR_HEIGHT,
    paddingTop: STATUS_BAR_HEIGHT,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textWrapper: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textBottompOptions: {
    minHeight: 36,
    marginVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  circleSelectedColor: {
    width: 36,
    marginHorizontal: 5,
    height: 36,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleTextColor: {
    height: 24,
    width: 24,
    borderRadius: 24,
    borderColor: '#fff',
    borderWidth: 2,
    marginHorizontal: 5,
  },
  btnTopOption: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedImageWrapper: {
    paddingHorizontal: 5,
    bottom: 0,
    left: 0,
    position: 'absolute',
    width: '100%',
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
    zIndex: 10,
  },
  previewImageWrapper: {
    marginHorizontal: 5,
    borderRadius: 5,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    height: 54,
    width: 32,
  },
  previewMultiImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 5,
  },
  btnNext: {
    marginRight: 10,
    width: 80,
    height: 44,
    backgroundColor: '#fff',
    borderRadius: 44,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  labelOptionsWrapper: {
    width: '100%',
    height: SCREEN_HEIGHT - STATUS_BAR_HEIGHT - 50,
    position: 'absolute',
    top: '100%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    overflow: 'hidden',
    left: 0,
  },
  labelOptionsTitleWrapper: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dragBar: {
    marginTop: 15,
    width: 50,
    height: 3,
    borderRadius: 1,
    backgroundColor: '#fff',
  },
  labelOptionsSearchWrapper: {
    height: 44,
    flexDirection: 'row',
    width: SCREEN_WIDTH - 30,
    marginHorizontal: 15,
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  labelOptionsSearch: {
    fontSize: 16,
    color: '#fff',
    width: SCREEN_WIDTH - 30 - 44,
  },
  searchIcon: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelItemWrapper: {
    width: SCREEN_WIDTH / 3,
    height: SCREEN_WIDTH / 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainLabel: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    height: 36,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});
export default StoryCanvas;
