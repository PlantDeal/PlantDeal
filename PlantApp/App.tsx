import React,{useState,useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import {
  NavHome,
  NavAuction,
  NavChatting,
  NavProfile,
  NavLogin
} from './src/stack/NavStack';
import RNBootSplash from "react-native-bootsplash";
import { LogBox } from 'react-native';

const Stack = createNativeStackNavigator();

LogBox.ignoreLogs(['Did not receive response to shouldStartLoad in time, defaulting to YES']);

export default function App() {
  

  const [initializing, setInitializing] = useState(true);
  const [user,setUser] = useState('');

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; 
  });

  function onAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

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
