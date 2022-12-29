import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import CarouselContextProvider from './src/carousel/context/CarouselContext';
import ScrollableView from './src/carousel/ScrollableView';

export default function App() {
  const slideData = [...Array(5).keys()]; // hard coded for this example.

  return (
    <SafeAreaView style={styles.container}>
      <CarouselContextProvider data={slideData}>
        <ScrollableView />
      </CarouselContextProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
