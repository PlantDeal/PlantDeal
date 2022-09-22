import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../screens/Home';
import AuctionScreen from '../screens/Auction';
import ChattingListScreen from '../screens/ChattingList';
import ProfileScreen from '../screens/Profile';
import SearchScreen from '../screens/Search';
import CategoryScreen from '../screens/Category';
import LoginScreen from '../screens/Login';
import LocationScreen from '../screens/Location';
import SearchLocationScreen from '../screens/SearchLocation';

const LoginStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const AuctionStack = createNativeStackNavigator();
const ChattingStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

function NavLogin({navigation}: any) {
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
    </LoginStack.Navigator>
  );
}

function NavHome({navigation}: any) {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: true,
        animation: 'slide_from_right',
      }}>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="검색"
        component={SearchScreen}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="CategoryScreen"
        component={CategoryScreen}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="지역 설정하기"
        component={LocationScreen}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="지역 검색하기"
        component={SearchLocationScreen}
        options={{headerShown: false}}
      />
    </HomeStack.Navigator>
  );
}

function NavAuction() {
  return (
    <AuctionStack.Navigator
      screenOptions={{
        headerShown: true,
        animation: 'slide_from_right',
      }}>
      <AuctionStack.Screen
        name="AuctionScreen"
        component={AuctionScreen}
        options={{
          headerShown: false,
        }}
      />
    </AuctionStack.Navigator>
  );
}
function NavChatting() {
  return (
    <ChattingStack.Navigator
      screenOptions={{
        headerShown: true,
        animation: 'slide_from_right',
      }}>
      <ChattingStack.Screen
        name="ChattingListScreen"
        component={ChattingListScreen}
        options={{
          headerShown: false,
        }}
      />
    </ChattingStack.Navigator>
  );
}

function NavProfile({navigation, route}: any) {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: true,
        animation: 'slide_from_right',
      }}>
      <ProfileStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </ProfileStack.Navigator>
  );
}

export {NavLogin, NavHome, NavAuction, NavChatting, NavProfile};
