import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet, Animated, PanResponder, Text} from 'react-native';

const RangeSlider = ({min, max, step, onValueChange, label}) => {
  const [sliderWidth, setSliderWidth] = useState(0);
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);
  const minThumbX = useRef(new Animated.Value(0)).current;
  const maxThumbX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    minThumbX.setValue(((minValue - min) / (max - min)) * sliderWidth);
    maxThumbX.setValue(((maxValue - min) / (max - min)) * sliderWidth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [max, min, minValue, maxValue, sliderWidth]);

  const panResponderMin = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gestureState) => {
      const newValue = Math.round(
        ((gestureState.dx + minThumbX.__getValue()) / sliderWidth) *
          (max - min) +
          min,
      );
      if (newValue >= min && newValue <= maxValue) {
        setMinValue(newValue);
        onValueChange([newValue, maxValue]);
        minThumbX.setValue(((newValue - min) / (max - min)) * sliderWidth);
      }
    },
    onPanResponderRelease: () => {
      // Handle release
    },
  });

  const panResponderMax = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gestureState) => {
      const newValue = Math.round(
        ((gestureState.dx + maxThumbX.__getValue()) / sliderWidth) *
          (max - min) +
          min,
      );
      if (newValue <= max && newValue >= minValue) {
        setMaxValue(newValue);
        onValueChange([minValue, newValue]);
        maxThumbX.setValue(((newValue - min) / (max - min)) * sliderWidth);
      }
    },
    onPanResponderRelease: () => {
      // Handle release
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.valuesContainer}>
        <Text style={styles.valueText}>{minValue}</Text>
        <Text>-</Text>
        <Text style={styles.valueText}>{maxValue}</Text>
        <Text style={styles.valueText}>{label}</Text>
      </View>
      <View
        style={styles.track}
        onLayout={event => setSliderWidth(event.nativeEvent.layout.width)}>
        <Animated.View
          style={[
            styles.thumb,
            {
              left: minThumbX.interpolate({
                inputRange: [0, sliderWidth],
                outputRange: [0, sliderWidth - 25], // Thumb width subtracted
                extrapolate: 'clamp',
              }),
            },
          ]}
          {...panResponderMin.panHandlers}
        />
        <Animated.View
          style={[
            styles.thumb,
            {
              left: maxThumbX.interpolate({
                inputRange: [0, sliderWidth],
                outputRange: [0, sliderWidth - 25], // Thumb width subtracted
                extrapolate: 'clamp',
              }),
            },
          ]}
          {...panResponderMax.panHandlers}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
  },
  track: {
    height: 4,
    backgroundColor: '#FFE0ED',
    borderRadius: 2,
    position: 'relative',
  },
  thumb: {
    position: 'absolute',
    width: 25,
    height: 25,
    borderRadius: 100,
    backgroundColor: '#FF3A8E',
    top: -10,
  },
  valuesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
    gap: 4,
  },
  valueText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default RangeSlider;
