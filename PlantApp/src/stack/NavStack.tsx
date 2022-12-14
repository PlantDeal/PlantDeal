import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../screens/Home';
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
import UpdateProfileScreen from '../screens/UpdateProfile';
import SellListScreen from '../screens/SelllList';
import AttentionScreen from '../screens/Attention';
import AverageScreen from '../screens/Average';
import BoardScreen from '../screens/Board';
import RegistBoardScreen from '../screens/RegistBoard';
import RecommendScreen from '../screens/Recommend';
import CommunityScreen from '../screens/Community';
import {useRoute} from '@react-navigation/native';

const LoginStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const CommunityStack = createNativeStackNavigator();
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
        options={{headerShown: false}}
      />
      <LoginStack.Screen
        name="RegistInfoScreen"
        component={RegistInfoScreen}
        options={{headerShown: false}}
      />
      <LoginStack.Screen
        name="CompleteRegistScreen"
        component={CompleteRegistScreen}
        options={{headerShown: false}}
      />
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
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="??????"
        component={SearchScreen}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="CategoryScreen"
        component={CategoryScreen}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="?????? ????????????"
        component={LocationScreen}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="RegistSellScreen"
        component={RegistSellScreen}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="?????? ????????????"
        component={SearchLocationScreen}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="DetailScreen"
        component={DetailScreen}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="AverageScreen"
        component={AverageScreen}
        options={{headerShown: false}}
      />
    </HomeStack.Navigator>
  );
}

function NavCommunity() {
  return (
    <CommunityStack.Navigator
      screenOptions={{
        headerShown: true,
        animation: 'slide_from_right',
      }}>
      <CommunityStack.Screen
        name="BoardScreen"
        component={BoardScreen}
        options={{
          headerShown: false,
        }}
      />
      <CommunityStack.Screen
        name="RegistBoardScreen"
        component={RegistBoardScreen}
        options={{
          headerShown: false,
        }}
      />
      <CommunityStack.Screen
        name="RecommendScreen"
        component={RecommendScreen}
        options={{
          headerShown: false,
        }}
      />
      <CommunityStack.Screen
        name="CommunityScreen"
        component={CommunityScreen}
        options={{
          headerShown: false,
        }}
      />
    </CommunityStack.Navigator>
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
      <ProfileStack.Screen
        name="UpdateProfileScreen"
        component={UpdateProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <ProfileStack.Screen
        name="SellListScreen"
        component={SellListScreen}
        options={{
          headerShown: false,
        }}
      />
      <ProfileStack.Screen
        name="AttentionScreen"
        component={AttentionScreen}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="DetailScreen"
        component={DetailScreen}
        options={{headerShown: false}}
      />
    </ProfileStack.Navigator>
  );
}

export {NavLogin, NavHome, NavCommunity, NavChatting, NavProfile};
