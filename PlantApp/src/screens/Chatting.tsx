import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BottomTab from '../components/BottomTab';

function ChattingScreen() {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.headerBar}></View>
      <View style={styles.bodyView}></View>
      <BottomTab style={styles.bottomTab} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerBar: {
    flex: 1,
  },
  bodyView: {
    flex: 17,
  },
  bottomTab: {
    flex: 1,
  },
});

export default ChattingScreen;
