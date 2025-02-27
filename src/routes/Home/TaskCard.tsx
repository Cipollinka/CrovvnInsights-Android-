import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import TimeIcon from '@/assets/icons/time.svg';
import {Goal} from '@/types/common';
import dayjs from 'dayjs';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import DeleteIcon from '@/assets/icons/delete.svg';
import CrownIcon from '@/assets/icons/crown.svg';

interface TaskCardProps {
  goal: Goal;
  isCompleted?: boolean;
  onPress: (goal: Goal) => void;
  onDelete: (id: string) => void;
}

export default function TaskCard({
  goal,
  onPress,
  onDelete,
  isCompleted,
}: TaskCardProps) {
  const {title, priority, date, description, imageUrl} = goal;

  const renderRightActions = () => {
    return (
      <TouchableOpacity
        onPress={() => onDelete(goal.id)}
        className="bg-red-500 w-[70px] h-full justify-center items-center">
        <DeleteIcon />
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions} rightThreshold={40}>
      <TouchableOpacity disabled={isCompleted} onPress={() => onPress(goal)}>
        <View className="py-5 pr-2 pl-5 w-full bg-primary rounded-3xl">
          <View className="w-full max-w-[322px]">
            {imageUrl && (
              <Image
                source={{uri: imageUrl}}
                className="object-contain rounded-full aspect-square w-[90px]"
              />
            )}

            <View className="flex-row justify-between items-start mt-1.5 w-full gap-2">
              <Text
                className="text-xl font-bold tracking-tighter leading-10 text-white flex-1"
                numberOfLines={1}
                ellipsizeMode="tail">
                {title}
              </Text>

              <View className="text-center  bg-secondary rounded-3xl w-[81px] justify-center items-center">
                <Text className="text-lg font-bold tracking-tighter leading-10 text-yellow-400">
                  {priority}
                </Text>
              </View>
            </View>

            <View className="flex-row items-center mt-1.5">
              <TimeIcon />
              <Text className="ml-2.5 text-base text-white">
                {dayjs(date).format('DD.MM.YYYY')}
              </Text>
            </View>
            <Text className="mt-1.5 text-base text-white">{description}</Text>
          </View>

          {isCompleted && (
            <View className="flex-row items-center gap-2 mt-4">
              <Text className="text-white font-bold text-2xl">+30</Text>
              <CrownIcon width={30} height={30} />
            </View>
          )}
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
}
