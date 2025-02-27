import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import React, {useLayoutEffect, useMemo, useState} from 'react';
import Wrapper from '@/components/Wrapper';
import TopBar from '@/components/TopBar';
import {Pages, TPages} from '@/types/navigation';
import {useNavigation} from '@react-navigation/native';
import {Goal, Priority, Subgoal} from '@/types/common';
import uuid from 'react-native-uuid';
import Input from '@/components/common/Input';
import dayjs from 'dayjs';
import Button from '@/components/common/Button';
import clsx from 'clsx';

import DateIcon from '@/assets/icons/date.svg';
import DatePickerModal from '@/components/modals/DatePicker';
import DeleteIcon from '@/assets/icons/delete.svg';
import {useGeneralStore} from '@/stores/generalStore';
import Snackbar from 'react-native-snackbar';

export default function TaskCreateSubgoals({route}: {route: any}) {
  const goal = route?.params?.goal as Goal;
  const navigation = useNavigation<TPages>();

  const currentGoal = useGeneralStore(state => state.currentGoal);
  const addGoal = useGeneralStore(state => state.addGoal);
  const updateGoal = useGeneralStore(state => state.updateGoal);

  const [subgoals, setSubgoals] = useState<Subgoal[]>([]);
  const [currentSubgoalId, setCurrentSubgoalId] = useState<string | null>(null);

  const priorities = useMemo(() => Object.values(Priority), []);
  const isAddSubgoalDisabled =
    !!subgoals.length && subgoals.every(subgoal => !subgoal.title);

  useLayoutEffect(() => {
    if (goal) {
      setSubgoals(
        goal.subGoals.map(subgoal => ({
          ...subgoal,
          date: dayjs(subgoal.date),
        })),
      );
    }
  }, [goal]);

  const handleAddSubgoal = () => {
    setSubgoals([
      ...subgoals,

      {
        id: uuid.v4(),
        title: '',
        description: '',
        priority: Priority.MEDIUM,
        date: dayjs(),
      },
    ]);
  };

  const handleRemoveSubgoal = (id: string) => {
    setSubgoals(subgoals.filter(subgoal => subgoal.id !== id));
  };

  const handleChangeSubgoal = (
    id: string,
    key: keyof Subgoal,
    value: string,
  ) => {
    setSubgoals(
      subgoals.map(subgoal =>
        subgoal.id === id ? {...subgoal, [key]: value} : subgoal,
      ),
    );
  };

  const handleDonePress = () => {
    if (!currentGoal) return;

    const subGoals = subgoals.map(subgoal => ({
      ...subgoal,
      date: subgoal.date.toISOString(),
    }));

    if (goal) {
      updateGoal(goal.id, {
        ...goal,
        subGoals,
      });
    } else {
      addGoal({
        ...currentGoal,
        id: uuid.v4(),
        subGoals,
      });
    }

    Snackbar.show({
      text: `Goal ${goal ? 'updated' : 'created'} successfully`,
      backgroundColor: '#816801',
      duration: Snackbar.LENGTH_SHORT,
    });

    navigation.navigate(Pages.Home);
  };

  return (
    <Wrapper>
      <TopBar
        title="Create Goal"
        actionText="Done"
        isActionDisabled={isAddSubgoalDisabled}
        onActionPress={handleDonePress}
      />
      <ScrollView showsVerticalScrollIndicator={false} className="mt-2">
        <View className="my-2 justify-center items-center">
          <Image source={require('@/assets/image/crown-1.png')} />
        </View>

        {!!subgoals.length && (
          <Text className="text-white font-bold mb-4">Subgoals</Text>
        )}
        {!subgoals.length && (
          <Text className="text-white font-bold mb-4 justify-center text-center my-[100px] text-xl">
            Add your first subgoal
          </Text>
        )}

        <View className={'gap-6'}>
          {subgoals.map(data => {
            return (
              <View
                className="bg-primary rounded-2xl px-2 pb-4 relative"
                key={data.id}>
                {subgoals.length > 1 && (
                  <TouchableOpacity
                    onPress={() => handleRemoveSubgoal(data.id)}
                    className="flex-row-reverse z-10 mt-4">
                    <DeleteIcon width={20} height={20} />
                  </TouchableOpacity>
                )}

                <View className="gap-3 mt-4">
                  <Input
                    className="!bg-[#816801]"
                    placeholder="Title"
                    value={data.title}
                    onChangeText={value =>
                      handleChangeSubgoal(data.id, 'title', value)
                    }
                  />
                  <Input
                    className="!bg-[#816801]"
                    placeholder="Description"
                    multiline
                    value={data.description}
                    onChangeText={value =>
                      handleChangeSubgoal(data.id, 'description', value)
                    }
                  />

                  <TouchableOpacity
                    className="rounded-2xl bg-[#816801] p-4 flex-row items-center gap-2"
                    onPress={() => setCurrentSubgoalId(data.id)}>
                    <DateIcon />
                    <Text className="text-white font-bold">
                      {data.date
                        ? dayjs(data.date).format('MMM D, YYYY')
                        : 'Deadline'}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View className="gap-2 mt-4">
                  <Text className="text-white font-bold mb-2">Priority</Text>
                  {priorities.map(item => {
                    const isSelected = data.priority === item;
                    return (
                      <View
                        key={item}
                        className={clsx({
                          'border-4 border-yellow-400 rounded-3xl': isSelected,
                        })}>
                        <Button
                          title={item}
                          className="justify-center !bg-[#816801]"
                          onPress={() =>
                            handleChangeSubgoal(data.id, 'priority', item)
                          }
                        />
                      </View>
                    );
                  })}
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      <DatePickerModal
        isVisible={!!currentSubgoalId}
        setIsVisible={() => setCurrentSubgoalId(null)}
        selectedDate={
          currentSubgoalId
            ? subgoals.find(subgoal => subgoal.id === currentSubgoalId)?.date
            : null
        }
        setSelectedDate={date =>
          handleChangeSubgoal(currentSubgoalId, 'date', date)
        }
      />

      <Button
        className="mt-4 !bg-[#FFD000]"
        textClassName="!text-black"
        title="Add a Subgoal"
        onPress={handleAddSubgoal}
        isDisabled={isAddSubgoalDisabled}
      />
    </Wrapper>
  );
}
