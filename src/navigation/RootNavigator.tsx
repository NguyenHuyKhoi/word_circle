import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LevelScreen, PlayScreen} from '@screens';
import React from 'react';
import {APP_SCREEN, RootStackParamList} from './ScreenTypes';
const RootStack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigation = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name={APP_SCREEN.LEVEL}
        component={LevelScreen}
        options={{gestureEnabled: false, headerShown: false}}
      />
      <RootStack.Screen
        name={APP_SCREEN.PLAY}
        component={PlayScreen}
        options={{gestureEnabled: false, headerShown: false}}
      />
    </RootStack.Navigator>
  );
};
