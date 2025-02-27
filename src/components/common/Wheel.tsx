import React from 'react';
import {View, Text, ScrollView, Dimensions} from 'react-native';

interface WheelProps<T> {
  data: T[];
  selectedIndex: number;
  onChange: (index: number) => void;
  renderItem: (item: T) => React.ReactNode;
}

const ITEM_HEIGHT = 50;
const VISIBLE_ITEMS = 3;

export default function Wheel<T>({
  data,
  selectedIndex,
  onChange,
  renderItem,
}: WheelProps<T>) {
  const scrollRef = React.useRef<ScrollView>(null);

  React.useEffect(() => {
    scrollRef.current?.scrollTo({
      y: selectedIndex * ITEM_HEIGHT,
      animated: true,
    });
  }, [selectedIndex]);

  const handleScroll = (event: any) => {
    const y = event.nativeEvent.contentOffset.y;
    const index = Math.round(y / ITEM_HEIGHT);
    if (index !== selectedIndex) {
      onChange(index);
    }
  };

  return (
    <View className="h-[150px] overflow-hidden">
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        onMomentumScrollEnd={handleScroll}
        decelerationRate="fast">
        <View style={{height: ITEM_HEIGHT * 2}} />
        {data.map((item, index) => (
          <View key={index} className="h-[50px] items-center justify-center">
            {renderItem(item)}
          </View>
        ))}
        <View style={{height: ITEM_HEIGHT * 2}} />
      </ScrollView>
    </View>
  );
}
