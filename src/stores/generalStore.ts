import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import {MMKVLoader} from 'react-native-mmkv-storage';
import {Goal, Note, User} from '@/types/common';

const MMKV = new MMKVLoader().initialize();

interface Alarm {
  id: string;
  time: string; // ISO string
  isActive: boolean;
  sleepHours: number;
}

interface State {
  balance: number;
  addBalance: (amount: number) => void;
  removeBalance: (amount: number) => void;

  user: User;
  setUser: (user: User) => void;

  purchasedBackgrounds: number[];
  addPurchasedBackground: (id: number) => void;

  currentBackground: number;
  setCurrentBackground: (id: number) => void;

  currentGoal: Partial<Goal> | null;
  setCurrentGoal: (goal: Partial<Goal>) => void;

  goals: Goal[];
  addGoal: (goal: Goal) => void;
  removeGoal: (id: string) => void;
  updateGoal: (id: string, goal: Partial<Goal>) => void;
  completedGoals: string[];
  addCompletedGoal: (id: string) => void;

  notes: Note[];
  addNote: (note: Note) => void;
  removeNote: (id: string) => void;
  updateNote: (id: string, note: Partial<Note>) => void;
  favoriteNotes: string[];
  toggleFavoriteNote: (id: string) => void;

  alarms: Alarm[];
  addAlarm: (alarm: Alarm) => void;
  removeAlarm: (id: string) => void;
  toggleAlarm: (id: string) => void;
  updateAlarm: (id: string, alarm: Partial<Alarm>) => void;
}

export const useGeneralStore = create(
  persist<State>(
    (set, get) => ({
      balance: 0,
      addBalance: amount => set(state => ({balance: state.balance + amount})),
      removeBalance: amount =>
        set(state => ({balance: state.balance - amount})),

      currentBackground: 0,
      setCurrentBackground: id => set({currentBackground: id}),

      user: {
        name: '',
        surname: '',
        email: '',
        imageUrl: '',
      },
      setUser: user => set({user}),

      purchasedBackgrounds: [],
      addPurchasedBackground: id =>
        set(state => ({
          purchasedBackgrounds: [...state.purchasedBackgrounds, id],
        })),

      currentGoal: null,
      setCurrentGoal: goal =>
        set({currentGoal: {...get().currentGoal, ...goal}}),

      goals: [],
      addGoal: goal => set(state => ({goals: [...state.goals, goal]})),
      removeGoal: id =>
        set(state => ({goals: state.goals.filter(goal => goal.id !== id)})),
      updateGoal: (id, goal) =>
        set(state => ({
          goals: state.goals.map(g => (g.id === id ? {...g, ...goal} : g)),
        })),
      completedGoals: [],
      addCompletedGoal: id =>
        set(state => ({
          completedGoals: [...state.completedGoals, id],
        })),

      notes: [],
      addNote: note => set(state => ({notes: [...state.notes, note]})),
      removeNote: id =>
        set(state => ({notes: state.notes.filter(note => note.id !== id)})),
      updateNote: (id, note) =>
        set(state => ({
          notes: state.notes.map(n => (n.id === id ? {...n, ...note} : n)),
        })),
      favoriteNotes: [],
      toggleFavoriteNote: id =>
        set(state => ({
          favoriteNotes: state.favoriteNotes.includes(id)
            ? state.favoriteNotes.filter(noteId => noteId !== id)
            : [...state.favoriteNotes, id],
        })),

      alarms: [],
      addAlarm: alarm => set(state => ({alarms: [...state.alarms, alarm]})),
      removeAlarm: id =>
        set(state => ({alarms: state.alarms.filter(alarm => alarm.id !== id)})),
      toggleAlarm: id =>
        set(state => ({
          alarms: state.alarms.map(alarm =>
            alarm.id === id ? {...alarm, isActive: !alarm.isActive} : alarm,
          ),
        })),
      updateAlarm: (id, alarm) =>
        set(state => ({
          alarms: state.alarms.map(a => (a.id === id ? {...a, ...alarm} : a)),
        })),
    }),
    {
      storage: {
        getItem: (key: string) => MMKV.getMap(key) ?? null,

        setItem: (key: string, value: any) => MMKV.setMap(key, value),
        removeItem: (key: string) => MMKV.removeItem(key),
      },
      name: 'general',
    },
  ),
);
