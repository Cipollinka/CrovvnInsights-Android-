import {TextInput, TextInputProps} from 'react-native';
import React from 'react';
import clsx from 'clsx';

interface InputProps extends TextInputProps {}

export default function Input({className, ...props}: InputProps) {
  return (
    <TextInput
      placeholderTextColor={'#ffffff50'}
      {...props}
      className={clsx(
        // className,
        'rounded-2xl p-2 bg-primary pl-4 py-4 text-white',
        className,
      )}
    />
  );
}
