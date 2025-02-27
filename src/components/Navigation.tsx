import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {View, TouchableOpacity} from 'react-native';

import HomeIcon from '@/assets/icons/nav/home.svg';
import AlarmIcon from '@/assets/icons/nav/alarm.svg';
import AnalyticsIcon from '@/assets/icons/nav/analytics.svg';
import NoteIcon from '@/assets/icons/nav/note.svg';
import ProfileIcon from '@/assets/icons/nav/user.svg';

import {Pages, TPages} from '@/types/navigation';

import clsx from 'clsx';

const navigationItems = [
  {
    Icon: HomeIcon,
    value: Pages.Home,
  },
  {
    Icon: AlarmIcon,
    value: Pages.Note,
  },
  {
    Icon: NoteIcon,
    value: Pages.Alarm,
  },
  {
    Icon: AnalyticsIcon,
    value: Pages.Analytics,
  },

  {
    Icon: ProfileIcon,
    value: Pages.Profile,
  },
];

export default function NavigationBar() {
  const navigation = useNavigation<TPages>();
  const route = useRoute();
  const currentRoute = route.name;

  const isActive = (value: Pages) => currentRoute === value;

  return (
    <View className="flex-row items-center justify-between rounded-full bg-secondary py-2.5 px-4">
      {navigationItems.map(({Icon, value}, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => navigation.navigate(value)}
          className={clsx(
            'w-[54px] h-[54px] rounded-full justify-center items-center',
            {
              'bg-black': isActive(value),
            },
          )}>
          <Icon />
        </TouchableOpacity>
      ))}
    </View>
  );
}
