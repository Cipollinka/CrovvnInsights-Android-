import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {Goal, Subgoal} from '@/types/common';
import Wrapper from '@/components/Wrapper';
import TopBar from '@/components/TopBar';
import Video from 'react-native-video';

import TimeIcon from '@/assets/icons/time.svg';
import dayjs from 'dayjs';
import SubGoal from './SubGoal';
import {useGeneralStore} from '@/stores/generalStore';

import DeleteIcon from '@/assets/icons/delete.svg';
import EditIcon from '@/assets/icons/edit.svg';
import CheckIcon from '@/assets/icons/check.svg';
import PlayIcon from '@/assets/icons/play.svg';
import PauseIcon from '@/assets/icons/pause.svg';
import CloseIcon from '@/assets/icons/close.svg';

import {useNavigation} from '@react-navigation/native';
import {Pages, TPages} from '@/types/navigation';
import Snackbar from 'react-native-snackbar';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

export default function TaskDetailScreen({route}: {route: any}) {
  const navigation = useNavigation<TPages>();
  const goal = route.params.goal as Goal;

  const [subGoals, setSubGoals] = useState<Subgoal[]>(goal.subGoals);
  const [isVideoModalVisible, setIsVideoModalVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoProgress, setVideoProgress] = useState(0);

  const updateGoal = useGeneralStore(state => state.updateGoal);
  const removeGoal = useGeneralStore(state => state.removeGoal);
  const completedGoals = useGeneralStore(state => state.completedGoals);
  const addCompletedGoal = useGeneralStore(state => state.addCompletedGoal);
  const addBalance = useGeneralStore(state => state.addBalance);

  const isCompleted = completedGoals.includes(goal.id);
  const isSubGoalExist = subGoals.length > 0;

  const handleEditPress = () => {
    navigation.navigate(Pages.TaskCreate, {goal});
  };

  const confirmDelete = () => {
    Alert.alert('Delete Goal', 'Are you sure you want to delete this goal?', [
      {text: 'Cancel', style: 'cancel'},
      {text: 'Delete', style: 'destructive', onPress: () => handleDelete()},
    ]);
  };

  const handleDelete = () => {
    removeGoal(goal.id);

    Snackbar.show({
      text: 'Goal deleted successfully',
      backgroundColor: '#816801',
      duration: Snackbar.LENGTH_SHORT,
    });

    navigation.navigate(Pages.Home);
  };

  const handleDeleteSubGoal = (id: string) => {
    const subGoals = goal.subGoals.filter(subgoal => subgoal.id !== id);
    setSubGoals(subGoals);
    updateGoal(goal.id, {subGoals});
  };

  const addCompletedGoalHandler = () => {
    addCompletedGoal(goal.id);

    Snackbar.show({
      text: `Goal ${isCompleted ? 'uncompleted' : 'completed'} successfully`,
      backgroundColor: '#816801',
      duration: Snackbar.LENGTH_SHORT,
    });

    addBalance(30);
  };

  const handleVideoPress = () => {
    if (goal?.videoUrl) {
      setIsVideoModalVisible(true);
    }
  };

  const handleVideoError = (error: any) => {
    console.error('Video playback error:', error);
    Alert.alert('Error', 'Failed to play video');
    setIsVideoModalVisible(false);
  };

  const handleVideoProgress = (progress: any) => {
    setVideoProgress(progress.currentTime / progress.seekableDuration);
  };

  return (
    <Wrapper>
      <TopBar title={goal.title} actionText="Edit" isActionShown={false} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-row gap-3 mt-4">
          {goal?.imageUrl && (
            <Image
              source={{uri: goal.imageUrl}}
              className="flex-1 h-[150px] rounded-xl"
            />
          )}

          {goal?.videoUrl && (
            <TouchableOpacity
              onPress={handleVideoPress}
              className="flex-1 h-[150px] relative">
              <Image
                source={{uri: goal.videoUrl}}
                className="flex-1 h-[150px] rounded-xl"
              />
              <View className="absolute inset-0 justify-center items-center">
                <PlayIcon width={40} height={40} color="#FFF" />
              </View>
            </TouchableOpacity>
          )}
        </View>

        <Text className="text-white text-2xl font-bold mt-6">{goal.title}</Text>

        <View className="flex-row items-center gap-2">
          <TimeIcon className="opacity-50" />
          <Text className="text-white-50">
            {dayjs(goal.date).format('DD.MM.YYYY')}
          </Text>
        </View>

        <Text className="text-white mt-4 text-lg">{goal.description}</Text>

        <View className="flex-row gap-2 mt-2">
          <View className="text-center  bg-secondary rounded-3xl w-[81px] justify-center items-center">
            <Text className="text-lg font-bold tracking-tighter leading-10 text-yellow-400">
              {goal.priority}
            </Text>
          </View>

          <View className="text-center  bg-secondary rounded-3xl w-[81px] justify-center items-center">
            <Text className="text-lg font-bold tracking-tighter leading-10 text-yellow-400">
              {goal.category}
            </Text>
          </View>
        </View>

        <Text className="text-white text-lg font-bold mt-6">Subgoals</Text>

        {isSubGoalExist && (
          <View className="gap-2 mt-4">
            {subGoals.map(subgoal => (
              <SubGoal
                goal={subgoal}
                key={subgoal.id}
                onDelete={() => handleDeleteSubGoal(subgoal.id)}
              />
            ))}
          </View>
        )}

        {!isSubGoalExist && (
          <View className="mt-10 mx-auto">
            <Text className="text-white text-lg font-bold">
              No subgoals found
            </Text>
          </View>
        )}
      </ScrollView>

      <View className="flex-row gap-6 justify-center items-center mt-auto pt-2">
        <TouchableOpacity
          onPress={confirmDelete}
          className="bg-primary rounded-full w-[75px] h-[75px] justify-center items-center">
          <DeleteIcon />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleEditPress}
          className="bg-primary rounded-full w-[75px] h-[75px] justify-center items-center">
          <EditIcon width={30} height={30} color="#003CFF" />
        </TouchableOpacity>

        {!isCompleted && (
          <TouchableOpacity
            onPress={() => addCompletedGoalHandler()}
            className="bg-primary rounded-full w-[75px] h-[75px] justify-center items-center">
            <CheckIcon width={30} height={30} color="#000" />
          </TouchableOpacity>
        )}
      </View>

      {goal?.videoUrl && (
        <Modal
          visible={isVideoModalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setIsVideoModalVisible(false)}>
          <View className="flex-1 bg-black/90 justify-center items-center">
            <TouchableOpacity
              onPress={() => {
                setIsVideoModalVisible(false);
                setIsPlaying(false);
              }}
              className="p-2 bg-primary rounded-full absolute top-10 right-5 z-20">
              <CloseIcon width={24} height={24} color="#FFF" />
            </TouchableOpacity>

            <View className="w-full">
              <Video
                source={{uri: goal?.videoUrl}}
                style={{
                  width: SCREEN_WIDTH,
                  height: SCREEN_WIDTH * (9 / 16),
                }}
                resizeMode="contain"
                paused={!isPlaying}
                onError={handleVideoError}
                onProgress={handleVideoProgress}
                repeat
              />

              <View className="absolute inset-0 justify-center items-center">
                {!isPlaying && (
                  <TouchableOpacity
                    onPress={() => setIsPlaying(true)}
                    className="bg-black/50 rounded-full p-4">
                    <PlayIcon width={30} height={30} color="#FFF" />
                  </TouchableOpacity>
                )}
              </View>

              <View className="h-1 bg-gray-700 w-full">
                <View
                  className="h-full bg-yellow-400"
                  style={{width: `${videoProgress * 100}%`}}
                />
              </View>
            </View>
          </View>
        </Modal>
      )}
    </Wrapper>
  );
}
