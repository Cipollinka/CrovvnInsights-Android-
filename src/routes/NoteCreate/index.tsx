import React, {useState, useLayoutEffect} from 'react';
import Wrapper from '@/components/Wrapper';
import TopBar from '@/components/TopBar';
import Input from '@/components/common/Input';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from 'react-native';
import {MediaItem, Note, SubNote} from '@/types/common';
import uuid from 'react-native-uuid';
import Checkbox from 'react-native-bouncy-checkbox';
import CrossIcon from '@/assets/icons/cross.svg';
import PlusIcon from '@/assets/icons/plus.svg';
import clsx from 'clsx';
import PhotoPlaceholderIcon from '@/assets/icons/photoPlaceholder.svg';
import VideoPlaceholderIcon from '@/assets/icons/videoPlaceholder.svg';
import {launchImageLibrary} from 'react-native-image-picker';
import {Pages, TPages} from '@/types/navigation';
import {useNavigation} from '@react-navigation/native';
import {useGeneralStore} from '@/stores/generalStore';
import Snackbar from 'react-native-snackbar';

export default function NoteCreateScreen({route}: {route: any}) {
  const note = route?.params?.note as Note;
  const navigation = useNavigation<TPages>();

  const [subNote, setSubNote] = useState<SubNote[]>([]);
  const [checkedSubNote, setCheckedSubNote] = useState<SubNote['id'][]>([]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [currentNoteTitle, setCurrentNoteTitle] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const addNote = useGeneralStore(state => state.addNote);
  const updateNote = useGeneralStore(state => state.updateNote);

  const handleDonePress = () => {
    const newNote = {
      id: note?.id ?? uuid.v4(),
      title,
      description,
      subNote,
      completedSubTasks: checkedSubNote,
      imageUrl,
      videoUrl,
    };
    if (note) {
      updateNote(note.id, {
        ...note,
        ...newNote,
      });
    } else {
      addNote(newNote);
    }

    Snackbar.show({
      text: `Note ${note ? 'updated' : 'created'} successfully`,
      backgroundColor: '#816801',
      duration: Snackbar.LENGTH_SHORT,
    });

    navigation.navigate(Pages.Note);
  };

  const isDoneDisabled = !title || !description;

  useLayoutEffect(() => {
    if (note) {
      setSubNote(note.subNote);
      setTitle(note.title);
      setDescription(note.description ?? '');
      setImageUrl(note.imageUrl ?? null);
      setCheckedSubNote(note.completedSubTasks);
      setVideoUrl(note.videoUrl ?? null);
    }
  }, [note]);

  const handleAddSubNote = (title: string) => {
    setSubNote([...subNote, {id: uuid.v4(), title}]);
    setCurrentNoteTitle('');
  };

  const handleDeleteSubNote = (id: SubNote['id']) => {
    setSubNote(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckSubNote = (id: SubNote['id'], isChecked: boolean) => {
    if (isChecked) {
      setCheckedSubNote(prev => prev.filter(item => item !== id));
    } else {
      setCheckedSubNote(prev => [...prev, id]);
    }
  };

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

  return (
    <Wrapper>
      <TopBar
        title="Create Note"
        actionText="Done"
        isActionDisabled={isDoneDisabled}
        onActionPress={handleDonePress}
      />
      <ScrollView>
        <View className="mt-8 flex-row gap-2">
          <TouchableOpacity
            className="bg-primary rounded-2xl flex-1 h-[150px] justify-center items-center"
            onPress={() => !imageUrl && handleAddImage()}
            onLongPress={() =>
              imageUrl &&
              handleLongPress({id: '1', uri: imageUrl, type: 'photo'})
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
              videoUrl &&
              handleLongPress({id: '1', uri: videoUrl, type: 'video'})
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

        <View className="mt-4 gap-2">
          <Input placeholder="Title" value={title} onChangeText={setTitle} />
          <Input
            placeholder="Enter the text..."
            className="min-h-[100px]"
            value={description}
            onChangeText={setDescription}
          />
        </View>

        <Text className="text-white font-bold text-2xl mt-4">Subtasks</Text>

        <View className="bg-primary rounded-2xl p-4 mt-2 gap-4">
          <View className="gap-2">
            {subNote.map(note => {
              const isChecked = checkedSubNote.includes(note.id);

              return (
                <View
                  className="flex-row items-center gap-2 justify-between"
                  key={note.id}>
                  <View className="flex-row items-center gap-2">
                    <View className="w-5">
                      <Checkbox
                        size={20}
                        fillColor="#816801"
                        isChecked={isChecked}
                        onPress={() => handleCheckSubNote(note.id, isChecked)}
                      />
                    </View>
                    <Text
                      className="text-white font-bold"
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      {note.title}
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => handleDeleteSubNote(note.id)}>
                    <CrossIcon />
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>

          <View className="relative">
            <Input
              placeholder="Enter the text..."
              className="min-h-[70px] !bg-[#816801] pr-14"
              verticalAlign="top"
              value={currentNoteTitle}
              onChangeText={setCurrentNoteTitle}
            />

            <TouchableOpacity
              disabled={!currentNoteTitle}
              onPress={() => handleAddSubNote(currentNoteTitle)}
              className={clsx(
                'absolute right-2 top-4 p-2 bg-[#FFD000] rounded-full',
                !currentNoteTitle && 'opacity-50',
              )}>
              <PlusIcon width={20} height={20} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Wrapper>
  );
}
