import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import BackBtn from '@/components/BackBtn';
import clsx from 'clsx';

interface TopBarProps {
  onPress?: () => void;
  title: string;
  actionText: string;
  isActionShown?: boolean;
  onActionPress?: () => void;
  isActionDisabled?: boolean;
  isBackShown?: boolean;
}

export default function TopBar({
  onPress,
  title,
  actionText,
  isActionShown = true,
  onActionPress,
  isActionDisabled,
  isBackShown = true,
}: TopBarProps) {
  return (
    <View className="flex-row items-center justify-between gap-4">
      {isBackShown ? (
        <View className="ml-4">
          <BackBtn onPress={onPress} />
        </View>
      ) : (
        <View className="w-10" />
      )}

      <Text className="text-white text-2xl font-bold">{title}</Text>

      {isActionShown && (
        <TouchableOpacity onPress={onActionPress} disabled={isActionDisabled}>
          <Text
            className={clsx('text-text font-bold', {
              'opacity-50': isActionDisabled,
            })}>
            {actionText}
          </Text>
        </TouchableOpacity>
      )}

      {!isActionShown && <View />}
    </View>
  );
}
