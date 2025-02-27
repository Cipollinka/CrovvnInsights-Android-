import React from 'react';
import {View, StyleSheet} from 'react-native';
import * as Progress from 'react-native-progress';

interface CircularProgressProps {
  allTasks: number;
  completedTasks: number;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  allTasks,
  completedTasks,
}) => {
  const percentage = allTasks > 0 ? completedTasks / allTasks : 0;

  return (
    <View style={styles.container}>
      <Progress.Circle
        size={150}
        progress={percentage}
        thickness={26}
        color="#FFD000"
        unfilledColor="#000000"
        borderWidth={0}
        strokeCap="round"
        showsText={false}
        formatText={() => `${Math.round(percentage * 100)}%`}
        textStyle={styles.text}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  label: {
    marginTop: 10,
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
  },
});

export default CircularProgress;
