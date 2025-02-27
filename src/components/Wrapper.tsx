import {SafeAreaView, View} from 'react-native';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

export default function Wrapper({children}: Props) {
  return (
    <SafeAreaView className="flex-1 bg-bg relative">
      <View className="flex-1 p-4">{children}</View>
    </SafeAreaView>
  );
}
