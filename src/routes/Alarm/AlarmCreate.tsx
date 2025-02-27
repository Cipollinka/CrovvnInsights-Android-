import React, {useState, useMemo, useLayoutEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';
import Wrapper from '@/components/Wrapper';
import TopBar from '@/components/TopBar';
import Input from '@/components/common/Input';
import {useGeneralStore} from '@/stores/generalStore';
import uuid from 'react-native-uuid';
import dayjs from 'dayjs';
import Wheel from '@/components/common/Wheel';
import Snackbar from 'react-native-snackbar';
import {useNavigation} from '@react-navigation/native';
import {Pages} from '@/types/navigation';

const calculateSleepCycles = (
  sleepHours: string,
  selectedHour: number,
  selectedMinute: number,
) => {
  const cycleLength = 90; // 90 minutes per sleep cycle
  const cycles = Math.floor((Number(sleepHours) * 60) / cycleLength);
  const wakeTime = dayjs()
    .set('hour', selectedHour)
    .set('minute', selectedMinute);

  return Array.from({length: 3}, (_, i) => {
    const cycleCount = cycles - i;
    return wakeTime.subtract(cycleCount * cycleLength, 'minute');
  });
};

export default function AlarmCreateScreen({route}: {route: any}) {
  const navigation = useNavigation();
  const alarm = route?.params?.alarm;

  const addAlarm = useGeneralStore(state => state.addAlarm);
  const updateAlarm = useGeneralStore(state => state.updateAlarm);

  const [sleepHours, setSleepHours] = useState('8');
  const [selectedHour, setSelectedHour] = useState(7);

  const [selectedMinute, setSelectedMinute] = useState(0);

  useLayoutEffect(() => {
    if (alarm) {
      const time = dayjs(alarm.time);
      setSelectedHour(time.hour());
      setSelectedMinute(time.minute());
      setSleepHours(alarm.sleepHours.toString());
    }
  }, [alarm]);

  const hours = useMemo(() => Array.from({length: 24}, (_, i) => i), []);
  const minutes = useMemo(() => Array.from({length: 60}, (_, i) => i), []);

  const suggestedTimes = useMemo(
    () => calculateSleepCycles(sleepHours, selectedHour, selectedMinute),
    [sleepHours, selectedHour, selectedMinute],
  );

  const handleSave = () => {
    const newAlarm = {
      id: alarm?.id ?? uuid.v4().toString(),
      time: dayjs()
        .set('hour', selectedHour)
        .set('minute', selectedMinute)
        .toISOString(),
      isActive: true,
      sleepHours: Number(sleepHours),
    };

    if (alarm) {
      updateAlarm(alarm.id, newAlarm);
    } else {
      addAlarm(newAlarm);
    }

    Snackbar.show({
      text: `Alarm ${alarm ? 'updated' : 'created'} successfully`,
      backgroundColor: '#816801',
      duration: Snackbar.LENGTH_SHORT,
    });

    navigation.navigate(Pages.Alarm);
  };

  return (
    <Wrapper>
      <TopBar
        title={alarm ? 'Edit Alarm' : 'Create Alarm'}
        actionText="Save"
        onActionPress={handleSave}
      />
      <ScrollView className="flex-1">
        <View className="mt-8">
          <Text className="text-white font-bold text-lg mb-2">
            How many hours do you sleep?
          </Text>
          <Input
            placeholder="Hours"
            value={sleepHours}
            onChangeText={setSleepHours}
            keyboardType="numeric"
            maxLength={2}
          />
        </View>

        <View className="mt-8">
          <Text className="text-white font-bold text-lg mb-4">
            Set Alarm Time
          </Text>
          <View className="flex-row justify-center gap-4">
            <Wheel
              data={hours}
              selectedIndex={selectedHour}
              onChange={setSelectedHour}
              renderItem={item => (
                <Text className="text-white text-xl">
                  {item.toString().padStart(2, '0')}
                </Text>
              )}
            />
            <Text className="text-white text-xl self-center">:</Text>
            <Wheel
              data={minutes}
              selectedIndex={selectedMinute}
              onChange={setSelectedMinute}
              renderItem={item => (
                <Text className="text-white text-xl">
                  {item.toString().padStart(2, '0')}
                </Text>
              )}
            />
          </View>
        </View>

        <View className="mt-8">
          <Text className="text-white font-bold text-lg mb-2">
            Suggested Bedtimes
          </Text>
          <View className="gap-2">
            {suggestedTimes.map((time, index) => (
              <View key={index} className="bg-primary p-4 rounded-xl">
                <Text className="text-white">
                  {time.format('HH:mm')} ({index + 4} sleep cycles)
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </Wrapper>
  );
}
