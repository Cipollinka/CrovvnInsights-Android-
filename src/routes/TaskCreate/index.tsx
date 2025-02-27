import React, {useLayoutEffect, useState} from 'react';
import Wrapper from '@/components/Wrapper';
import TopBar from '@/components/TopBar';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import clsx from 'clsx';
import {Categories, Category, Goals} from '@/static/goals';
import {FC} from 'react';
import {SvgProps} from 'react-native-svg';
import {Pages, TPages} from '@/types/navigation';
import {useNavigation} from '@react-navigation/native';
import {useGeneralStore} from '@/stores/generalStore';
import {Goal} from '@/types/common';

interface GoalItemProps {
  title: string;
  Icon: FC<SvgProps>;

  isSelected: boolean;
  onPress: () => void;
}

const GoalItem = ({title, Icon, isSelected, onPress}: GoalItemProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={clsx(
        'rounded-2xl gap-4 justify-center items-center w-[170px] h-[156px] bg-primary',
        {
          'border-4 border-yellow-400': isSelected,
        },
      )}>
      <Icon />
      <Text className="text-white font-bold">{title}</Text>
    </TouchableOpacity>
  );
};

export default function TaskCreateScreen({route}: {route: any}) {
  const goal = route?.params?.goal as Goal;

  const navigation = useNavigation<TPages>();
  const [selectedCategory, setSelectedCategory] = useState<
    Category['value'] | null
  >(null);
  const setCurrentGoal = useGeneralStore(state => state.setCurrentGoal);

  useLayoutEffect(() => {
    if (goal) {
      setSelectedCategory(goal.category);
    }
  }, [goal]);

  const handleGoalPress = (goal: Category['value']) => {
    setSelectedCategory(goal);
  };

  const handleNextPress = () => {
    if (!selectedCategory) return;

    setCurrentGoal({category: selectedCategory});
    navigation.navigate(Pages.TaskCreateInfo, goal ? {goal} : undefined);
  };

  return (
    <Wrapper>
      <TopBar
        title="Create Goal"
        actionText="Next"
        isActionDisabled={!selectedCategory}
        onActionPress={handleNextPress}
      />
      <ScrollView className="my-4 mt-8" showsVerticalScrollIndicator={false}>
        <View className="gap-2 flex-row flex-wrap mx-auto w-full justify-center">
          {Categories.map(category => (
            <GoalItem
              key={category.id}
              {...category}
              isSelected={selectedCategory === category.value}
              onPress={() => handleGoalPress(category.value)}
            />
          ))}
        </View>
      </ScrollView>
    </Wrapper>
  );
}
