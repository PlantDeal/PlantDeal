import React, {useEffect,useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';


function LocationScreen({navigation}: any) {
  
  


  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
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
        <Pressable style={styles.locationBox}>
          <Text style={styles.locationText}>수영구</Text>
        </Pressable>
        <Pressable
          style={styles.addBtn}
          onPress={() => navigation.navigate('지역 검색하기')}>
          <Text style={styles.addBtnText}>+</Text>
        </Pressable>
        <View>
          <Text style={{fontSize: 12, color: '#8E8E93'}}>
            지역은 최대 2곳까지 설정가능합니다.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  addBtnText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
  },
  addBtn: {
    width: 230,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F4F4F4',
    borderRadius: 8,
    marginBottom: 24,
  },
  locationText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  locationBox: {
    width: 230,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#16D66F',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
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
    alignItems: 'center',
    paddingTop: 40,
  },
});

export default LocationScreen;
