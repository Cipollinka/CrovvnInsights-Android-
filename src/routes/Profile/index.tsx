import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  Linking,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Wrapper from '@/components/Wrapper';
import NavigationBar from '@/components/Navigation';
import EditIcon from '@/assets/icons/edit.svg';
import PhotoPlaceholderIcon from '@/assets/icons/photoPlaceholder.svg';
import {launchImageLibrary} from 'react-native-image-picker';
import {MediaItem} from '@/types/common';
import CrownIcon from '@/assets/icons/crown.svg';
import {useGeneralStore} from '@/stores/generalStore';
import ArrowIcon from '@/assets/icons/chevron.svg';
import CheckIcon from '@/assets/icons/check.svg';
import {Pages, TPages} from '@/types/navigation';
import {useNavigation} from '@react-navigation/native';
import Input from '@/components/common/Input';
import clsx from 'clsx';
import {
  PROFILE_BG_DATA,
  PROFILE_BG_IMAGES,
  PROFILE_BG_STYLES,
} from '@/static/profileDesign';

const profileOptions = [
  {
    title: 'Developer Website',
    value: 'https://www.termsfeed.com/live/c1a644c4-3b89-4dba-a5d2-e3a86de04ff6',
  },
  {
    title: 'Privacy Policy',
    value: 'https://www.termsfeed.com/live/c1a644c4-3b89-4dba-a5d2-e3a86de04ff6',
  },
  {
    title: 'Terms of Use',
    value: 'https://www.termsfeed.com/live/c1a644c4-3b89-4dba-a5d2-e3a86de04ff6',
  },
];

export default function ProfileScreen() {
  const navigation = useNavigation<TPages>();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');

  const balance = useGeneralStore(state => state.balance);

  const currentBackground = useGeneralStore(state => state.currentBackground);

  const user = useGeneralStore(state => state.user);
  const setUser = useGeneralStore(state => state.setUser);

  const isCheckDisabled = (!name || !surname || !email) && isEditing;

  useEffect(() => {
    setName(user.name);
    setSurname(user.surname);
    setEmail(user.email);
    setImageUrl(user.image);
  }, [user]);

  const handleAddImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
      });

      if (result.assets && result.assets[0]) {
        const newImage: MediaItem = {
          id: Date.now().toString(),
          uri: result.assets[0].uri!,
          type: 'photo',
        };
        setImageUrl(newImage.uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const handleLongPress = (item: MediaItem) => {
    Alert.alert('Delete Media', `Do you want to delete this ${item.type}?`, [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          if (item.type === 'photo') {
            setImageUrl(null);
          }
        },
      },
    ]);
  };

  const handleCheckPress = () => {
    if (isCheckDisabled) return;

    setUser({
      ...user,
      name,
      surname,
      email,
      image: imageUrl,
    });

    setIsEditing(prev => !prev);
  };

  const handleOptionPress = (value: string) => {
    Linking.openURL(value);
  };

  return (
    <Wrapper>
      <View className="absolute -top-4 -left-4 -right-4 bottom-[80%] bg-primary" />
      <ScrollView showsVerticalScrollIndicator={false} className="mb-2">
        <View className="flex-1 px-2">
          <Text className="text-white text-3xl font-bold mx-auto">Profile</Text>

          <View className="flex-row justify-between mt-[50px]">
            <TouchableOpacity
              className="bg-[#816801] rounded-full w-[150px] h-[150px] justify-center items-center"
              onPress={() => !imageUrl && handleAddImage()}
              onLongPress={() =>
                imageUrl &&
                handleLongPress({id: '1', uri: imageUrl, type: 'photo'})
              }>
              {!imageUrl ? (
                <PhotoPlaceholderIcon />
              ) : (
                <View className="relative rounded-full w-[150px] h-[150px]">
                  <Image
                    source={{uri: imageUrl}}
                    className="w-full h-full rounded-full z-20"
                    resizeMode="cover"
                  />
                  <View
                    style={{
                      position: 'absolute',
                      zIndex: 10,
                      width: '100%',
                      height: '100%',
                    }}>
                    <Image
                      source={PROFILE_BG_DATA[currentBackground].image}
                      className="w-full h-full"
                      resizeMode="cover"
                    />
                  </View>
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleCheckPress()}
              disabled={isCheckDisabled}
              className={clsx(
                'bg-[#816801] rounded-full justify-center items-center w-[62px] h-[62px]',
                isCheckDisabled && 'opacity-30',
              )}>
              {isEditing ? (
                <CheckIcon width={28} height={28} color="#FFD000" />
              ) : (
                <EditIcon color="#FFD000" />
              )}
            </TouchableOpacity>
          </View>

          {!isEditing && (
            <View>
              {(name || surname) && (
                <Text className="mt-4 text-white font-bold text-2xl">
                  {name} {surname}
                </Text>
              )}
              <Text className="mt-4 text-white-50">{email}</Text>
              <View className="flex-row gap-6 items-center">
                <Text className="text-white font-bold text-[45px] ">
                  {balance}
                </Text>
                <CrownIcon />
              </View>
            </View>
          )}

          {!isEditing && (
            <View className="mt-6 gap-3">
              <TouchableOpacity
                onPress={() => navigation.navigate(Pages.ProfileDesign)}
                className="bg-primary rounded-2xl p-4 flex-row justify-between items-center">
                <Text className="text-white font-bold text-lg">
                  Profile design
                </Text>
                <ArrowIcon
                  style={{transform: [{rotate: '180deg'}]}}
                  width={9}
                  height={15}
                />
              </TouchableOpacity>

              {profileOptions.map(item => (
                <TouchableOpacity
                  key={item.title}
                  onPress={() => handleOptionPress(item.value)}
                  className="bg-primary rounded-2xl p-4 flex-row justify-between items-center">
                  <Text className="text-white font-bold text-lg">
                    {item.title}
                  </Text>
                  <ArrowIcon
                    style={{transform: [{rotate: '180deg'}]}}
                    width={9}
                    height={15}
                  />
                </TouchableOpacity>
              ))}
            </View>
          )}

          {isEditing && (
            <View className="gap-4 mt-6">
              <Input placeholder="Name" value={name} onChangeText={setName} />
              <Input
                placeholder="Surname"
                value={surname}
                onChangeText={setSurname}
              />
              <Input
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
              />
            </View>
          )}
        </View>
      </ScrollView>

      <View className="mt-auto">
        <NavigationBar />
      </View>
    </Wrapper>
  );
}
