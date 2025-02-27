import React from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import Wrapper from '@/components/Wrapper';
import TopBar from '@/components/TopBar';
import {useGeneralStore} from '@/stores/generalStore';
import dayjs from 'dayjs';
import {Pages} from '@/types/navigation';
import {useNavigation} from '@react-navigation/native';
import Button from '@/components/common/Button';
import NavigationBar from '@/components/Navigation';

export default function AlarmScreen() {
  const navigation = useNavigation();
  const alarms = useGeneralStore(state => state.alarms);
  const toggleAlarm = useGeneralStore(state => state.toggleAlarm);

  return (
    <Wrapper>
      <TopBar
        title="Alarms"
        actionText="Create"
        onActionPress={() => navigation.navigate(Pages.AlarmCreate)}
        isBackShown={false}
      />
      <ScrollView className="flex-1">
        <View className="mt-8 mb-4">
          {alarms.length === 0 ? (
            <View className="items-center justify-center py-8">
              <Text className="text-white opacity-60 text-lg mb-4">
                No alarms set
              </Text>
              <Button
                title="Create Alarm"
                onPress={() => navigation.navigate(Pages.AlarmCreate)}
              />
            </View>
          ) : (
            <View className="gap-2">
              {alarms.map(alarm => (
                <TouchableOpacity
                  key={alarm.id}
                  className="bg-primary p-4 rounded-xl mb-2 flex-row justify-between items-center"
                  onPress={() => toggleAlarm(alarm.id)}
                  onLongPress={() =>
                    navigation.navigate(Pages.AlarmCreate, {alarm})
                  }>
                  <View>
                    <Text className="text-white text-xl">
                      {dayjs(alarm.time).format('HH:mm')}
                    </Text>
                    <Text className="text-white opacity-60">
                      {alarm.sleepHours}h sleep
                    </Text>
                  </View>
                  <View
                    className={`w-3 h-3 rounded-full ${
                      alarm.isActive ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  />
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      <NavigationBar />
    </Wrapper>
  );
}
