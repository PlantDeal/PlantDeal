import React, {useEffect,useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/firestore';

import HomeScreen from '../screens/Home';
import AuctionScreen from '../screens/Auction';
import ChattingListScreen from '../screens/ChattingList';
import ChattingScreen from '../screens/Chatting';
import ProfileScreen from '../screens/Profile';
import SearchScreen from '../screens/Search';
import CategoryScreen from '../screens/Category';
import LoginScreen from '../screens/Login';
import RegistScreen from '../screens/Regist';
import RegistInfoScreen from '../screens/RegistInfo';
import CompleteRegistScreen from '../screens/CompleteRegist';
import LocationScreen from '../screens/Location';
import RegistSellScreen from '../screens/RegistSell';
import SearchLocationScreen from '../screens/SearchLocation';
import SetLocationScreen from '../screens/SetLocation';
import DetailScreen from '../screens/Detail';

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
      <LoginStack.Screen
        name="RegistScreen"
        component={RegistScreen}
        options={{headerShown: false}}/>
      <LoginStack.Screen
        name="RegistInfoScreen"
        component={RegistInfoScreen}
        options={{headerShown: false}}
      />
      <LoginStack.Screen
        name="CompleteRegistScreen"
        component={CompleteRegistScreen}
        options={{headerShown: false}}/>
      <LoginStack.Screen
        name="SetLocationScreen"
        component={SetLocationScreen}
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
        options={{headerShown: false}
        }
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
        name="RegistSellScreen"
        component={RegistSellScreen}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="지역 검색하기"
        component={SearchLocationScreen}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="DetailScreen"
        component={DetailScreen}
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
      <ChattingStack.Screen
        name="ChattingScreen"
        component={ChattingScreen}
        options={{
          headerShown: false,
        }}
      />
    </ChattingStack.Navigator>
  );
}

function NavProfile({navigation}: any) {
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
