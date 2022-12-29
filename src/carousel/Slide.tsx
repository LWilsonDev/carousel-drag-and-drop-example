import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import React from 'react';

import DraggableList from './DraggableList';
import Animated from 'react-native-reanimated';

interface SlideProps {
  index: number;
  width: number;
}

const Slide: React.FC<SlideProps> = ({index, width}) => {
  const {height} = useWindowDimensions();
  return (
    <Animated.View style={[styles.wrap, {width, height: height * 0.8}]}>
      <View style={styles.slide}>
        <Text style={styles.text}>Slide {index + 1}</Text>
        <DraggableList />
      </View>
    </Animated.View>
  );
};

export default Slide;

const styles = StyleSheet.create({
  wrap: {paddingHorizontal: 5},
  text: {
    padding: 10,
    alignSelf: 'center',
    fontSize: 20,
  },
  slide: {
    backgroundColor: '#bad1f5',
    shadowColor: '#333333',
    shadowOffset: {width: 4, height: 5},
    shadowOpacity: 0.4,
    elevation: 7,
    padding: 10,
    borderRadius: 20,
  },
});
