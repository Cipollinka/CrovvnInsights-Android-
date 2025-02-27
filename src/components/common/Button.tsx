import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import clsx from 'clsx';

interface Props {
  title: string;
  onPress: () => void;
  isDisabled?: boolean;
  variant?: 'primary' | 'danger';
  className?: string;
  textClassName?: string;
}

export default function Button({
  title,
  onPress,
  isDisabled,
  variant = 'primary',
  className,
  textClassName,
}: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      className={clsx(
        'px-10 py-4 rounded-2xl shadow-sm min-h-[52px] justify-center items-center',
        className,
        {
          'bg-primary': variant === 'primary',
          'bg-red': variant === 'danger',
          'opacity-50': isDisabled,
        },
      )}
      accessibilityRole="button"
      accessibilityLabel="Next step">
      <Text
        className={clsx(
          'text-lg text-white text-opacity-90 font-bold',
          textClassName,
        )}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
