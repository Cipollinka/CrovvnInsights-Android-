import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Goal, Note as NoteType} from './common';

export enum Pages {
  Home = 'Home',
  TaskDetail = 'TaskDetail',
  TaskCreate = 'TaskCreate',
  TaskCreateInfo = 'TaskCreateInfo',
  TaskCreateSubgoals = 'TaskCreateSubgoals',
  Completed = 'Completed',

  Note = 'Note',
  NoteCreate = 'NoteCreate',

  Advice = 'Advice',

  Analytics = 'Analytics',

  Alarm = 'Alarm',
  AlarmCreate = 'AlarmCreate',

  Profile = 'Profile',
  ProfileDesign = 'ProfileDesign',
}

export type PagesRecord = {
  [Pages.Home]: undefined;
  [Pages.TaskDetail]: {goal: Goal};
  [Pages.TaskCreate]: {goal?: Goal} | undefined;
  [Pages.TaskCreateInfo]: {goal?: Goal} | undefined;
  [Pages.TaskCreateSubgoals]: {goal?: Goal} | undefined;
  [Pages.Completed]: undefined;

  [Pages.Note]: undefined;
  [Pages.NoteCreate]: {note?: NoteType} | undefined;

  [Pages.Advice]: undefined;

  [Pages.Analytics]: undefined;

  [Pages.Alarm]: undefined;
  [Pages.AlarmCreate]: undefined;

  [Pages.Profile]: undefined;
  [Pages.ProfileDesign]: undefined;
};

export type TPages = NativeStackNavigationProp<PagesRecord>;
