import React from 'react';
import {View, Text, ScrollView, TouchableOpacity, Alert} from 'react-native';
import Wrapper from '@/components/Wrapper';
import TaskCard from './TaskCard';
import NavigationBar from '@/components/Navigation';
import CrownIcon from '@/assets/icons/crown.svg';
import PlusIcon from '@/assets/icons/plus.svg';
import {useNavigation} from '@react-navigation/native';
import {Pages} from '@/types/navigation';
import {useGeneralStore} from '@/stores/generalStore';
import clsx from 'clsx';
import TopBar from '@/components/TopBar';
import {Goal} from '@/types/common';

export default function CompletedScreen() {
  const goals = useGeneralStore(state => state.goals);
  const removeGoal = useGeneralStore(state => state.removeGoal);
  const completedGoals = useGeneralStore(state => state.completedGoals);

  const completedGoalsState = goals.filter(goal =>
    completedGoals.includes(goal.id),
  );

  const isEmpty = completedGoalsState.length === 0;

  const confirmDelete = (id: string) => {
    Alert.alert('Delete Goal', 'Are you sure you want to delete this goal?', [
      {text: 'Cancel', style: 'cancel'},
      {text: 'Delete', style: 'destructive', onPress: () => removeGoal(id)},
    ]);
  };

  return (
    <Wrapper>
      <TopBar title="Completed" actionText="Edit" isActionShown={false} />

      {!isEmpty && (
        <ScrollView className="mx-auto" showsVerticalScrollIndicator={false}>
          <View className="mt-6 max-w-full w-[350px] items-center">
            {completedGoalsState.map((goal, index) => (
              <View key={index} className={index > 0 ? 'mt-4' : ''}>
                <TaskCard
                  isCompleted={true}
                  goal={goal}
                  onPress={() => {}}
                  onDelete={confirmDelete}
                />
              </View>
            ))}
          </View>
        </ScrollView>
      )}

      {isEmpty && (
        <View className="mx-auto mt-[50%]">
          <Text className="text-white font-bold text-2xl">
            There are no completed goals yet.
          </Text>
        </View>
      )}
    </Wrapper>
  );
}
