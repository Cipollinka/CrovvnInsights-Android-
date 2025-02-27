import React from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import Wrapper from '@/components/Wrapper';
import AdviceCard from './Card';
import TopBar from '@/components/TopBar';

const adviceData = [
  {
    title: 'Create a cozy environment',
    description:
      'Ensure a calm and comfortable atmosphere in your bedroom. Temperature, lighting, and noise levels should be set for optimal sleep',
  },
  {
    title: 'Establish a sleep routine',
    description:
      'Try to go to bed and wake up at the same time every day, even on weekends. A consistent sleep schedule can help improve sleep quality',
  },
  {
    title: 'Avoid late dinners',
    description:
      'Eating heavy meals before bedtime can make it difficult to fall asleep. Try to have a light dinner at least 2-3 hours before bedtime',
  },
  {
    title: 'Relaxing bedtime ritual',
    description:
      'Spend time on relaxing activities before bed, such as reading a book, meditation, or taking a hot shower. This can help reduce stress and prepare your body for sleep',
  },
  {
    title: 'Limit screen time',
    description:
      'Avoid using smartphones, tablets, and computers before bed, as the blue light from screens can disrupt the production of melatonin, the sleep hormone',
  },
  {
    title: 'Moderate physical activity',
    description:
      'Regular moderate physical exercise can help improve sleep quality. However, avoid intense workouts before bedtime',
  },
  {
    title: 'Establish a bedtime routine',
    description:
      "Set a bedtime routine that signals to your body that it's time to wind down. For example, have a warm glass of milk or read a few pages of a book before bed",
  },
  {
    title: 'Avoid long daytime naps',
    description:
      'Long daytime naps can disrupt your nighttime sleep. If you need to take a nap during the day, try to do it for no more than 20-30 minutes',
  },
  {
    title: 'Maintain a regular daily routine',
    description:
      'Try to maintain a regular daily routine, which includes time for sleep, food, work and rest. Regularity helps to improve the quality and duration of sleep',
  },
];

const AdviceScreen: React.FC = () => {
  return (
    <Wrapper>
      <TopBar title="Advice" actionText="Back" isActionShown={false} />

      <ScrollView
        className="pb-2 mt-4 mx-auto w-full rounded-[32px]"
        showsVerticalScrollIndicator={false}>
        <View className="mt-4 gap-2">
          {adviceData.map((advice, index) => (
            <AdviceCard
              key={index}
              title={advice.title}
              description={advice.description}
            />
          ))}
        </View>
      </ScrollView>
    </Wrapper>
  );
};

export default AdviceScreen;
