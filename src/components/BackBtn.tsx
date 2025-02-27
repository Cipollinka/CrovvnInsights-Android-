import {TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import ArrowIcon from '@/assets/icons/chevron.svg';

interface BackBtnProps {
  onPress?: () => void;
}

export default function BackBtn({onPress}: BackBtnProps) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => onPress || navigation.goBack()}>
      <ArrowIcon />
    </TouchableOpacity>
  );
}
