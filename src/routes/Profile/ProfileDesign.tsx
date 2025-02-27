import Wrapper from '@/components/Wrapper';
import NavigationBar from '@/components/Navigation';
import React, {useState} from 'react';
import TopBar from '@/components/TopBar';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {useGeneralStore} from '@/stores/generalStore';
import CrownIcon from '@/assets/icons/crown.svg';
import clsx from 'clsx';
import {PROFILE_BG_DATA} from '@/static/profileDesign';
import Snackbar from 'react-native-snackbar';

export default function ProfileDesign() {
  const [currentTab, setCurrentTab] = useState('non-purchased');

  const balance = useGeneralStore(state => state.balance);
  const removeBalance = useGeneralStore(state => state.removeBalance);
  const addBalance = useGeneralStore(state => state.addBalance);

  const currentBackground = useGeneralStore(state => state.currentBackground);
  const setCurrentBackground = useGeneralStore(
    state => state.setCurrentBackground,
  );

  const purchasedBackgrounds = useGeneralStore(
    state => state.purchasedBackgrounds,
  );
  const addPurchasedBackground = useGeneralStore(
    state => state.addPurchasedBackground,
  );

  const isPurchasedTab = currentTab === 'purchased';
  const accessorData =
    currentTab === 'non-purchased'
      ? PROFILE_BG_DATA.filter(data => !purchasedBackgrounds.includes(data.id))
      : PROFILE_BG_DATA.filter(data => purchasedBackgrounds.includes(data.id));

  const handleBuyItem = (data: any) => {
    // addBalance(1000);
    if (balance < data.price) {
      Snackbar.show({
        text: 'You do not have enough balance',
        backgroundColor: 'red',
        textColor: 'white',
      });
      return;
    }
    addPurchasedBackground(data.id);
    removeBalance(data.price);
    setCurrentBackground(data.id);
  };

  return (
    <Wrapper>
      <View className="absolute top-0 left-0 right-0 bottom-[80%] bg-primary" />

      <TopBar title="Profile Design" actionText="Save" isActionShown={false} />

      <View className="flex-row items-center mx-auto gap-6 mt-10">
        <Text className="text-white text-[45px] font-bold">{balance}</Text>
        <CrownIcon />
      </View>

      <View className="flex-row items-center gap-2 mt-10 mx-auto">
        <TouchableOpacity
          className={clsx(
            'w-[110px] h-[40px] rounded-full bg-secondary justify-center items-center',
            {
              'bg-secondary-50': currentTab === 'non-purchased',
              'bg-secondary': currentTab !== 'non-purchased',
            },
          )}
          onPress={() => setCurrentTab('non-purchased')}>
          <Text
            className={clsx(' font-bold', {
              'text-black': currentTab === 'non-purchased',
              'text-white': currentTab !== 'non-purchased',
            })}>
            Non-Purchased
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={clsx(
            'w-[110px] h-[40px] rounded-full bg-secondary justify-center items-center',
            {
              'bg-secondary-50': currentTab === 'purchased',
              'bg-secondary': currentTab !== 'purchased',
            },
          )}
          onPress={() => setCurrentTab('purchased')}>
          <Text
            className={clsx(' font-bold', {
              'text-black': currentTab === 'purchased',
              'text-white': currentTab !== 'purchased',
            })}>
            Purchased
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView className="mb-4 mt-2" showsVerticalScrollIndicator={false}>
        <View className="flex-row flex-wrap gap-4 mt-8">
          {accessorData.map(data => {
            const isCurrent = data.id === currentBackground;
            return (
              <View
                key={data.id}
                className="bg-primary rounded-xl p-4 gap-2 w-[47%] items-center">
                <Image source={data.image} />
                {!isPurchasedTab && (
                  <View className="flex-row items-center justify-center gap-2">
                    <Text className="text-white font-bold text-lg">
                      {data.price}
                    </Text>
                    <CrownIcon width={20} height={20} />
                  </View>
                )}
                <TouchableOpacity
                  className={clsx(
                    ' rounded-full p-2 justify-between items-center w-1/2 mt-auto',
                    {
                      'bg-secondary-50': !isCurrent,
                      'bg-green-500': isCurrent,
                    },
                  )}
                  onPress={() =>
                    isPurchasedTab
                      ? setCurrentBackground(data.id)
                      : handleBuyItem(data)
                  }>
                  <Text className={clsx('font-bold')}>
                    {isPurchasedTab ? (isCurrent ? 'Current' : 'Set') : 'Buy'}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </ScrollView>

      <View className="mt-auto">
        <NavigationBar />
      </View>
    </Wrapper>
  );
}
