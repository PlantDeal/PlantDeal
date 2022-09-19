import React from 'react';
import {View, Image, StyleSheet, Text, Pressable} from 'react-native';

export default function HomeHeaderBar({navigation}: any) {
  return (
    <View style={styles.headerBarView}>
      <View style={styles.leftBtnView}>
        <Pressable onPress={() => navigation.navigate('검색')}>
          <View style={styles.leftImageView}>
            <Image source={require('../assets/Search.png')} />
          </View>
        </Pressable>
      </View>
      <View style={styles.centerBtnView}>
        <Pressable
          style={{flexDirection: 'row'}}
          onPress={() => navigation.navigate('지역 설정하기')}>
          <View>
            <Text style={styles.locationTitle}>수영구</Text>
          </View>
          <View style={styles.locationDownArrow}>
            <Image source={require('../assets/DownArrow.png')} />
          </View>
        </Pressable>
      </View>
      <View style={styles.rightBtnView}>
        <Pressable>
          <View style={styles.rightImageView}>
            <Image source={require('../assets/Alarm.png')} />
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  locationDownArrow: {
    alignContent: 'center',
    justifyContent: 'center',
    marginLeft: 5,
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  leftImageView: {},
  rightImageView: {},
  headerBarView: {
    height: '6%',
    flexDirection: 'row',
    width: '100%',
    borderBottomWidth: 0,
    borderBottomColor: '#C3C3C3',
  },
  leftBtnView: {
    flex: 1,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerBtnView: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightBtnView: {
    flex: 1,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
