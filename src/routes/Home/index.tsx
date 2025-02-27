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
import {Goal} from '@/types/common';

export default function HomeScreen() {
  const navigation = useNavigation();

  const goals = useGeneralStore(state => state.goals);
  const removeGoal = useGeneralStore(state => state.removeGoal);
  const completedGoals = useGeneralStore(state => state.completedGoals);
  const balance = useGeneralStore(state => state.balance);

  const uncompletedGoalsState = goals.filter(
    goal => !completedGoals.includes(goal.id),
  );

  const isEmpty = uncompletedGoalsState.length === 0;

  const onPress = (goal: Goal) => {
    navigation.navigate(Pages.TaskDetail, {goal});
  };

  const confirmDelete = (id: string) => {
    Alert.alert('Delete Goal', 'Are you sure you want to delete this goal?', [
      {text: 'Cancel', style: 'cancel'},
      {text: 'Delete', style: 'destructive', onPress: () => removeGoal(id)},
    ]);
  };

  return (
    <Wrapper>
      <View className="items-center ">
        <View className="self-stretch pb-4 w-full text-center">
          <View className="items-center self-center w-full flex-row justify-between">
            <View className="w-[70px]" />
            <Text className="text-3xl font-extrabold text-white">Home</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(Pages.Completed)}>
              <Text className="text-base font-bold leading-10 text-yellow-500">
                Completed
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex-row items-center gap-6 mt-4">
          <Text className="text-5xl font-extrabold text-white pt-2">
            {balance}
          </Text>
          <CrownIcon />
        </View>
      </View>

      {!isEmpty && (
        <ScrollView className="mx-auto" showsVerticalScrollIndicator={false}>
          <View className="mt-6 max-w-full w-[350px] items-center">
            {uncompletedGoalsState.map((goal, index) => (
              <View key={index} className={index > 0 ? 'mt-4' : ''}>
                <TaskCard
                  goal={goal}
                  onPress={onPress}
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
            There are no goals yet.
          </Text>
        </View>
      )}

      <TouchableOpacity
        className={
          'w-[75px] h-[75px] bg-secondary rounded-full items-center justify-center my-4 mt-auto mx-auto'
        }
        onPress={() => navigation.navigate(Pages.TaskCreate)}>
        <PlusIcon />
      </TouchableOpacity>

      <View className="mt-2 w-full">
        <NavigationBar />
      </View>
    </Wrapper>
  );
}
