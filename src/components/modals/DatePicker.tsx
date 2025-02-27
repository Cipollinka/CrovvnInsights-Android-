import {View, Text, Modal, TouchableOpacity} from 'react-native';
import React from 'react';
import dayjs from 'dayjs';
import DatePicker, {DateType} from 'react-native-ui-datepicker';

export default function DatePickerModal({
  isVisible,
  setIsVisible,
  selectedDate,
  setSelectedDate,
}: {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
  selectedDate: DateType;
  setSelectedDate: (date: DateType) => void;
}) {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setIsVisible(false)}>
      <View className="flex-1 bg-black/50 justify-center items-center">
        <View className="bg-primary p-4 rounded-2xl w-[90%]">
          <DatePicker
            date={selectedDate}
            onChange={({date}) => setSelectedDate(dayjs(date))}
            selectedItemColor="#FFD000"
            mode="single"
            disabledDates={(date: DateType) =>
              !dayjs().isSame(dayjs(date), 'day') &&
              dayjs().isAfter(dayjs(date))
            }
            // minimumDate={dayjs().toDate()}
            calendarTextStyle={{color: 'white'}}
            headerTextStyle={{color: 'white'}}
            weekDaysTextStyle={{color: 'white'}}
            headerButtonColor="#FFD000"
          />
          <View className="flex-row justify-end mt-4 gap-4">
            <TouchableOpacity
              onPress={() => setIsVisible(false)}
              className="px-4 py-2">
              <Text className="text-white font-bold">Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setIsVisible(false);
              }}
              className="px-4 py-2">
              <Text className="text-white font-bold">Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
