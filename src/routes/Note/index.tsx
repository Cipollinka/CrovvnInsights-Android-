import {View, Text, FlatList, TouchableOpacity, Alert} from 'react-native';
import React, {useState} from 'react';
import Wrapper from '@/components/Wrapper';
import {useGeneralStore} from '@/stores/generalStore';
import NoteCard from './NoteCard';
import {Note} from '@/types/common';
import NavigationBar from '@/components/Navigation';
import clsx from 'clsx';
import {Pages, TPages} from '@/types/navigation';
import {useNavigation} from '@react-navigation/native';
import PlusIcon from '@/assets/icons/plus.svg';

export default function NoteScreen() {
  const navigation = useNavigation<TPages>();

  const [currentTab, setCurrentTab] = useState<'all' | 'favorites'>('all');

  const notes = useGeneralStore(state => state.notes);
  const removeNote = useGeneralStore(state => state.removeNote);
  const favoriteNotes = useGeneralStore(state => state.favoriteNotes);
  const toggleFavoriteNote = useGeneralStore(state => state.toggleFavoriteNote);

  const favoriteNotesState = notes.filter(note =>
    favoriteNotes.includes(note.id),
  );

  const accessorNotes = currentTab === 'all' ? notes : favoriteNotesState;
  const isEmpty = accessorNotes.length === 0;

  const confirmDelete = (id: string) => {
    Alert.alert('Delete Goal', 'Are you sure you want to delete this goal?', [
      {text: 'Cancel', style: 'cancel'},
      {text: 'Delete', style: 'destructive', onPress: () => removeNote(id)},
    ]);
  };

  const handleEditNote = (note: Note) => {
    navigation.navigate(Pages.NoteCreate, {note});
  };

  const handleFavoriteNote = (note: Note) => {
    toggleFavoriteNote(note.id);
  };

  return (
    <Wrapper>
      <Text className="text-2xl font-bold text-white mx-auto">Notes</Text>

      <View className="flex-row items-center gap-2 mt-4">
        <TouchableOpacity
          className={clsx(
            'w-[100px] h-[40px] rounded-full bg-secondary justify-center items-center',
            {
              'bg-secondary-50': currentTab === 'all',
              'bg-secondary': currentTab !== 'all',
            },
          )}
          onPress={() => setCurrentTab('all')}>
          <Text
            className={clsx(' font-bold', {
              'text-black': currentTab === 'all',
              'text-white': currentTab !== 'all',
            })}>
            All
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={clsx(
            'w-[100px] h-[40px] rounded-full bg-secondary justify-center items-center',
            {
              'bg-secondary-50': currentTab === 'favorites',
              'bg-secondary': currentTab !== 'favorites',
            },
          )}
          onPress={() => setCurrentTab('favorites')}>
          <Text
            className={clsx(' font-bold', {
              'text-black': currentTab === 'favorites',
              'text-white': currentTab !== 'favorites',
            })}>
            Favorites
          </Text>
        </TouchableOpacity>
      </View>

      {isEmpty ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-white font-bold text-2xl">No notes found</Text>
        </View>
      ) : (
        <FlatList
          data={accessorNotes}
          className="mt-4"
          renderItem={({item}) => (
            <NoteCard
              note={item}
              isFavorite={favoriteNotes.includes(item.id)}
              onDelete={() => confirmDelete(item.id)}
              onEdit={() => handleEditNote(item)}
              onFavorite={() => handleFavoriteNote(item)}
            />
          )}
          keyExtractor={item => item.id}
        />
      )}

      <View className="mt-auto">
        <TouchableOpacity
          className={
            'w-[75px] h-[75px] bg-secondary rounded-full items-center justify-center my-4 mx-auto'
          }
          onPress={() => navigation.navigate(Pages.NoteCreate)}>
          <PlusIcon />
        </TouchableOpacity>

        <NavigationBar />
      </View>
    </Wrapper>
  );
}
