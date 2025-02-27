import React from 'react';
import {View, Text} from 'react-native';

interface AdviceCardProps {
  title: string;
  description: string;
}

const AdviceCard: React.FC<AdviceCardProps> = ({title, description}) => {
  return (
    <View className="p-5 w-full bg-primary rounded-3xl">
      <Text className="self-start text-xl font-extrabold leading-loose text-center text-white">
        {title}
      </Text>
      <Text className="mt-2 leading-5 text-white">{description}</Text>
    </View>
  );
};

export default AdviceCard;
