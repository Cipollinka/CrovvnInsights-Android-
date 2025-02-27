import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import dayjs from 'dayjs';
import {Subgoal} from '@/types/common';
import DeleteIcon from '@/assets/icons/delete.svg';
import TimeIcon from '@/assets/icons/time.svg';

interface SubGoalProps {
  goal: Subgoal;
  onDelete: (id: string) => void;
}
export default function SubGoal({goal, onDelete}: SubGoalProps) {
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
      <View className="py-5 px-5 w-full bg-primary rounded-3xl">
        <View className="w-full">
          <View className="flex-row justify-between items-start mt-1.5 w-full">
            <Text
              className="text-xl font-bold tracking-tighter leading-10 text-white flex-1"
              numberOfLines={1}
              ellipsizeMode="tail">
              {goal.title}
            </Text>

            <View className="text-center  bg-secondary rounded-3xl w-[81px] justify-center items-center">
              <Text className="text-lg font-bold tracking-tighter leading-10 text-yellow-400">
                {goal.priority}
              </Text>
            </View>
          </View>

          <View className="flex-row items-center mt-1.5">
            <TimeIcon />
            <Text className="ml-2.5 text-base text-white">
              {dayjs(goal.date).format('DD.MM.YYYY')}
            </Text>
          </View>
          <Text className="mt-1.5 text-base text-white">
            {goal.description}
          </Text>
        </View>
      </View>
    </Swipeable>
  );
}
