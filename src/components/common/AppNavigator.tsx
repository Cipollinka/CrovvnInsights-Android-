import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Pages, PagesRecord} from '@/types/navigation';
import Home from '@/routes/Home';
import TaskCreate from '@/routes/TaskCreate';
import TaskCreateInfoScreen from '@/routes/TaskCreate/TaskCreateInfo';
import TaskCreateSubgoalsScreen from '@/routes/TaskCreate/TaskCreateSubgoals';
import TaskDetailScreen from '@/routes/TaskDetail';
import NoteScreen from '@/routes/Note';
import NoteCreateScreen from '@/routes/NoteCreate';
import CompletedScreen from '@/routes/Home/Completed';
import AdviceScreen from '@/routes/Advice';
import AnalyticsScreen from '@/routes/Analitics';
import ProfileScreen from '@/routes/Profile';
import AlarmScreen from '@/routes/Alarm';
import ProfileDesign from '@/routes/Profile/ProfileDesign';
import AlarmCreateScreen from '@/routes/Alarm/AlarmCreate';

const Stack = createNativeStackNavigator<PagesRecord>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={Pages.Home}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name={Pages.Home} component={Home} />
        <Stack.Screen name={Pages.TaskCreate} component={TaskCreate} />
        <Stack.Screen
          name={Pages.TaskCreateInfo}
          component={TaskCreateInfoScreen}
        />
        <Stack.Screen
          name={Pages.TaskCreateSubgoals}
          component={TaskCreateSubgoalsScreen}
        />
        <Stack.Screen name={Pages.TaskDetail} component={TaskDetailScreen} />
        <Stack.Screen name={Pages.Completed} component={CompletedScreen} />

        <Stack.Screen name={Pages.Note} component={NoteScreen} />
        <Stack.Screen name={Pages.NoteCreate} component={NoteCreateScreen} />

        <Stack.Screen name={Pages.Advice} component={AdviceScreen} />

        <Stack.Screen name={Pages.Alarm} component={AlarmScreen} />
        <Stack.Screen name={Pages.AlarmCreate} component={AlarmCreateScreen} />

        <Stack.Screen name={Pages.Analytics} component={AnalyticsScreen} />

        <Stack.Screen name={Pages.Profile} component={ProfileScreen} />
        <Stack.Screen name={Pages.ProfileDesign} component={ProfileDesign} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
