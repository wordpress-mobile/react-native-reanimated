import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  getViewProp,
} from 'react-native-reanimated';
import { View, Button, findNodeHandle } from 'react-native';
import React, { useRef, useEffect } from 'react';

export default function AnimatedStyleUpdateExample(props) {
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      const viewTag = findNodeHandle(ref.current);
      getViewProp(viewTag, 'sample', propValue => {
        console.log('here');
        console.log(propValue === 'myval' ? 'success' : 'fail');
      });
    }
  });

  const randomWidth = useSharedValue(10);

  const config = {
    duration: 500,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const style = useAnimatedStyle(() => {
    return {
      width: withTiming(randomWidth.value, config),
    };
  });

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
      }}>
      <Animated.View
        style={[
          { width: 100, height: 80, backgroundColor: 'black', margin: 30 },
          style,
        ]}
      />
      <Button
        title="toggle"
        onPress={() => {
          randomWidth.value = Math.random() * 350;
        }}
      />
      <View sample="myval" ref={ref} />
    </View>
  );
}
