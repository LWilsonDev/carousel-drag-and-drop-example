import {StyleSheet} from 'react-native';
import React from 'react';
import Slide from './Slide';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {useCarouselValues} from './context/CarouselContext';
import {snapPoint} from 'react-native-redash';

const ScrollableView = () => {
  const {
    panRef,
    minimumTouchCheck,
    translationX,
    prevSnap,
    currentSnap,
    nextSnap,
    swipe,
    sideSpace,
    slideWidth,
    slideData,
  } = useCarouselValues();

  const offsetX = useSharedValue<number>(0); // the internal context of the gesture

  const panGesture = Gesture.Pan()
    .onBegin((e) => {
      offsetX.value = translationX.value;
    })
    .onUpdate((e) => {
      if (minimumTouchCheck(translationX.value, e.translationX)) {
        translationX.value = offsetX.value + e.translationX;
      }
    })
    .onEnd((e) => {
      const snapPoints = [prevSnap.value, currentSnap.value, nextSnap.value];
      const dest = snapPoint(translationX.value, e.velocityX, snapPoints);
      const direction = e.velocityX < 0 ? 'left' : 'right';

      swipe(translationX, dest, 5, direction);
    })
    .withRef(panRef); // IMPORTANT - this is where the pan gesture ref is set

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translationX.value}],
    };
  });

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View
        style={[
          styles.view,
          {
            marginStart: sideSpace,
          },
          animatedStyle,
        ]}
      >
        {slideData.map((item) => (
          <Slide width={slideWidth} key={item} index={item} />
        ))}
      </Animated.View>
    </GestureDetector>
  );
};

export default ScrollableView;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignContent: 'center',
    flexDirection: 'row',
  },
});
