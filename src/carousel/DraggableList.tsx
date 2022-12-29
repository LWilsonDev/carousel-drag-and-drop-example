import React, {useState} from 'react';
import {StyleSheet, Text, Pressable} from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import {useCarouselValues} from './context/CarouselContext';

const NUM_ITEMS = 10;

// taken from drag and drop library example
function getColor(i: number) {
  const multiplier = 255 / (NUM_ITEMS - 1);
  const colorVal = i * multiplier;
  return `rgb(${colorVal}, ${Math.abs(128 - colorVal)}, ${255 - colorVal})`;
}

type Item = {
  key: string;
  label: string;
  height: number;
  width: number;
  backgroundColor: string;
};

// taken from drag and drop library example
const initialData: Item[] = [...Array(NUM_ITEMS)].map((d, index) => {
  const backgroundColor = getColor(index);
  return {
    key: `item-${index}`,
    label: String(index) + '',
    height: 100,
    width: 60 + Math.random() * 40,
    backgroundColor,
  };
});

export default function DraggableList() {
  const [data, setData] = useState(initialData);
  const {panRef} = useCarouselValues(); // our pan gesture ref that we stored in the carousel context

  const handleDragEnd = (data: Item[]) => {
    setData(data);
  };

  const renderItem = ({item, drag, isActive}: RenderItemParams<Item>) => {
    return (
      <ScaleDecorator>
        <Pressable
          onLongPress={drag}
          disabled={isActive}
          style={[
            styles.rowItem,
            {backgroundColor: isActive ? 'red' : item.backgroundColor},
          ]}
          // accessibility considerations needed here - perhaps an alternative to drag and drop?
        >
          <Text style={styles.text}>{item.label}</Text>
        </Pressable>
      </ScaleDecorator>
    );
  };

  return (
    <DraggableFlatList
      simultaneousHandlers={panRef} // this is the key to allowing the pan gesture for the carousel as well as the drag and drop
      data={data}
      onDragEnd={({data}) => handleDragEnd(data)}
      keyExtractor={(item) => item.key}
      renderItem={renderItem}
      containerStyle={{paddingBottom: 50}}
    />
  );
}

const styles = StyleSheet.create({
  rowItem: {
    flex: 1,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
