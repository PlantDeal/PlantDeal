import React, {useState,useEffect} from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import BottomTab from '../components/BottomTab';
import auth from '@react-native-firebase/auth';


function AuctionScreen({navigation}: any) {
  
  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <View
        style={{
          flex: 17,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
        }}>
        <Text>Auction</Text>
      </View>
      <BottomTab style={{flex: 1}} navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default AuctionScreen;

