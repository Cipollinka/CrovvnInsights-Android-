import {View, Text} from 'react-native';
import React from 'react';
import Wrapper from '@/components/Wrapper';
import {useGeneralStore} from '@/stores/generalStore';
import CircularProgress from './CircularProgress';
import NavigationBar from '@/components/Navigation';

export default function AnalyticsScreen() {
  const goalsCount = useGeneralStore(state => state.goals.length);
  const completedGoalsCount = useGeneralStore(
    state => state.completedGoals.length,
  );

  return (
    <Wrapper>
      <View className="mx-auto">
        <Text className="text-3xl font-bold text-white">Analytics</Text>
      </View>

      <View className="bg-primary rounded-2xl p-4 mt-10">
        <View className="mx-auto">
          <Text className="text-white text-lg font-bold">
            Percentage of completion
          </Text>
        </View>

        <CircularProgress
          allTasks={goalsCount}
          completedTasks={completedGoalsCount}
        />

        <View className="gap-2 mt-4">
          <View className="flex-row gap-4 items-center">
            <View className="bg-secondary-50 w-6 h-6 rounded-full" />
            <Text className="text-white text-lg font-bold">Completed</Text>
          </View>

          <View className="flex-row gap-4 items-center">
            <View className="bg-black w-6 h-6 rounded-full" />
            <Text className="text-white text-lg font-bold">Unfinished</Text>
          </View>
        </View>
      </View>

      <View className="mt-auto">
        <NavigationBar />
      </View>
    </Wrapper>
  );
}
