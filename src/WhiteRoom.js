import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppNavigator from '@/components/common/AppNavigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import React from 'react';
import '../global.css';

export default  function WhiteRoom () {
    return (<GestureHandlerRootView>
        <SafeAreaProvider>
            <AppNavigator />
        </SafeAreaProvider>
    </GestureHandlerRootView>);
}
