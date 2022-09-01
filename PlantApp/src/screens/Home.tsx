import React from 'react';
import {View, Text} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomTab from '../components/BottomTab';
import HomeHeaderBar from '../components/HomeHeaderBar';

function HomeScreen(navigation: any) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <HomeHeaderBar style={{flex: 1}} navigation={navigation}/>
      <View
      style={{
        flex: 17,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
      }}>
      <Text>Content!</Text>
      
    </View>
    <BottomTab style={{flex: 1}} navigation={navigation}/>

    </SafeAreaView>
    
  );
}

export default HomeScreen;
