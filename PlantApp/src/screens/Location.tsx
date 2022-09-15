import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

function LocationScreen({navigation}: any) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.headerBarView}>
        <View style={styles.headerBarLeftView}>
          <Pressable onPress={() => navigation.goBack()}>
            <Image source={require('../assets/BackBtn.png')}></Image>
          </Pressable>
        </View>
        <View style={styles.headerBarCenterView}>
          <Text style={styles.headerBarTitle}>지역 설정하기</Text>
        </View>
        <View style={styles.headerBarRightView}></View>
      </View>
      <View style={styles.bodyView}>
        <Text />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerBarTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  headerBarRightView: {
    flex: 1,
  },
  headerBarCenterView: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerBarLeftView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerBarView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bodyView: {
    flex: 18,
  },
});

export default LocationScreen;