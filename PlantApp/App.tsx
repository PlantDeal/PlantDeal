import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  NavHome,
  NavAuction,
  NavChatting,
  NavProfile,
  NavLogin
} from './src/stack/NavStack';
import RNBootSplash from "react-native-bootsplash";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer onReady={() => RNBootSplash.hide()}>
      <Stack.Navigator
        initialRouteName="NavLogin"
        screenOptions={{animation: 'none', gestureEnabled: false}}>
        <Stack.Screen
          options={{headerShown: false}}
          name="NavLogin"
          component={NavLogin}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="NavHome"
          component={NavHome}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="NavAuction"
          component={NavAuction}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="NavChatting"
          component={NavChatting}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="NavProfile"
          component={NavProfile}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
