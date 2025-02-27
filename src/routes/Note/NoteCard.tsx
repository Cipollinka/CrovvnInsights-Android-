import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Note} from '@/types/common';
import FavoriteIcon from '@/assets/icons/favorite.svg';
import EditIcon from '@/assets/icons/edit.svg';
import DeleteIcon from '@/assets/icons/delete.svg';

interface NoteCardProps {
  note: Note;
  isFavorite: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onFavorite: () => void;
}

export default function NoteCard({
  note,
  isFavorite,
  onEdit,
  onDelete,
  onFavorite,
}: NoteCardProps) {
  return (
    <View className="bg-primary rounded-2xl p-4 mb-4">
      <Text className="text-2xl font-bold text-white">{note.title}</Text>
      <Text className="mt-4 text-white">{note.description}</Text>

      <View className="ml-auto flex-row gap-2 mt-2">
        <TouchableOpacity
          className="w-[40px] h-[40px] rounded-full bg-[#292100] items-center justify-center"
          onPress={onFavorite}>
          <FavoriteIcon
            className="text-white"
            color={isFavorite ? '#FF0000' : '#292100'}
            stroke={isFavorite ? '#FF0000' : '#fff'}
            width={23}
            height={23}
          />
        </TouchableOpacity>

        <TouchableOpacity
          className="w-[40px] h-[40px] rounded-full bg-[#292100] items-center justify-center"
          onPress={onEdit}>
          <EditIcon color="#003CFF" />
        </TouchableOpacity>

        <TouchableOpacity
          className="w-[40px] h-[40px] rounded-full bg-[#292100] items-center justify-center"
          onPress={onDelete}>
          <DeleteIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
}
