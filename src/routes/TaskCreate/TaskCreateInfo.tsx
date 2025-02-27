import {View, Text, TouchableOpacity, Image, Alert, Modal} from 'react-native';
import React, {useLayoutEffect, useMemo, useState} from 'react';
import Wrapper from '@/components/Wrapper';
import TopBar from '@/components/TopBar';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import {Goal, Priority} from '@/types/common';
import clsx from 'clsx';
import DateIcon from '@/assets/icons/date.svg';
import PhotoPlaceholderIcon from '@/assets/icons/photoPlaceholder.svg';
import VideoPlaceholderIcon from '@/assets/icons/videoPlaceholder.svg';
import {launchImageLibrary} from 'react-native-image-picker';
import dayjs from 'dayjs';
import {Pages, TPages} from '@/types/navigation';
import {useNavigation} from '@react-navigation/native';
import DatePickerModal from '@/components/modals/DatePicker';
import {useGeneralStore} from '@/stores/generalStore';

type MediaItem = {
  id: string;
  uri: string;
  type: 'photo' | 'video';
};

export default function TaskCreateInfoScreen({route}: {route: any}) {
  const goal = route?.params?.goal as Goal;
  const navigation = useNavigation<TPages>();

  const setCurrentGoal = useGeneralStore(state => state.setCurrentGoal);
  const currentGoal = useGeneralStore(state => state.currentGoal);

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [selectedPriority, setSelectedPriority] = useState<Priority | null>(
    null,
  );
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const priorities = useMemo(() => Object.values(Priority), []);

  const isDisabled =
    !selectedDate || !selectedPriority || !title || !description;

  useLayoutEffect(() => {
    if (goal) {
      setTitle(goal.title);
      setDescription(goal.description ?? '');
      setSelectedDate(dayjs(goal.date));
      setSelectedPriority(goal.priority);
      setImageUrl(goal.imageUrl ?? null);
      setVideoUrl(goal.videoUrl ?? null);
    }
  }, [goal]);

  const handleAddImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
      });

      if (result.assets && result.assets[0]) {
        const newImage: MediaItem = {
          id: Date.now().toString(),
          uri: result.assets[0].uri!,
          type: 'photo',
        };
        setImageUrl(newImage.uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const handleAddVideo = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'video',
        quality: 0.8,
      });

      if (result.assets && result.assets[0]) {
        const newVideo: MediaItem = {
          id: Date.now().toString(),
          uri: result.assets[0].uri!,
          type: 'video',
        };
        setVideoUrl(newVideo.uri);
      }
    } catch (error) {
      console.error('Error picking video:', error);
    }
  };

  const handleLongPress = (item: MediaItem) => {
    Alert.alert('Delete Media', `Do you want to delete this ${item.type}?`, [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          if (item.type === 'photo') {
            setImageUrl(null);
          } else {
            setVideoUrl(null);
          }
        },
      },
    ]);
  };

  const handleDonePress = () => {
    if (!title || !selectedPriority) return;

    setCurrentGoal({
      ...currentGoal,
      title,
      description,
      priority: selectedPriority,
      date: selectedDate.toISOString(),
      imageUrl: imageUrl ?? undefined,
      videoUrl: videoUrl ?? undefined,
    });

    navigation.navigate(Pages.TaskCreateSubgoals, goal ? {goal} : undefined);
  };

  return (
    <Wrapper>
      <TopBar
        title="Create Goal"
        actionText="Next"
        isActionDisabled={isDisabled}
        onActionPress={handleDonePress}
      />

      <View className="mt-8 flex-row gap-2">
        <TouchableOpacity
          className="bg-primary rounded-2xl flex-1 h-[150px] justify-center items-center"
          onPress={() => !imageUrl && handleAddImage()}
          onLongPress={() =>
            imageUrl && handleLongPress({id: '1', uri: imageUrl, type: 'photo'})
          }>
          {!imageUrl ? (
            <PhotoPlaceholderIcon />
          ) : (
            <Image
              source={{uri: imageUrl}}
              className="w-full h-full rounded-2xl"
              resizeMode="cover"
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-primary rounded-2xl flex-1 h-[150px] justify-center items-center relative"
          onPress={() => !videoUrl && handleAddVideo()}
          onLongPress={() =>
            videoUrl && handleLongPress({id: '1', uri: videoUrl, type: 'video'})
          }>
          {!videoUrl ? (
            <VideoPlaceholderIcon />
          ) : (
            <Image
              source={{uri: videoUrl}}
              className="w-full h-full rounded-2xl z-10"
              resizeMode="cover"
            />
          )}

          {videoUrl && (
            <View className="absolute z-10">
              <VideoPlaceholderIcon />
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View className="gap-3 mt-4">
        <Input placeholder="Title" value={title} onChangeText={setTitle} />
        <Input
          placeholder="Description"
          multiline
          value={description}
          onChangeText={setDescription}
        />
        <TouchableOpacity
          className="rounded-2xl bg-primary p-4 flex-row items-center gap-2"
          onPress={() => setIsDatePickerVisible(true)}>
          <DateIcon />
          <Text className="text-white font-bold">
            {selectedDate
              ? dayjs(selectedDate).format('MMM D, YYYY')
              : 'Deadline'}
          </Text>
        </TouchableOpacity>
      </View>

      <View className="gap-2 mt-4">
        <Text className="text-white font-bold mb-2">Priority</Text>
        {priorities.map(item => {
          const isSelected = selectedPriority === item;
          return (
            <View
              key={item}
              className={clsx({
                'border-4 border-yellow-400 rounded-3xl': isSelected,
              })}>
              <Button
                title={item}
                className="justify-center"
                onPress={() => setSelectedPriority(item)}
              />
            </View>
          );
        })}
      </View>

      <DatePickerModal
        isVisible={isDatePickerVisible}
        setIsVisible={setIsDatePickerVisible}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
    </Wrapper>
  );
}
