import React from 'react';
import {View, TouchableOpacity, Image, StyleSheet, Text} from 'react-native';

export default function ProfileHeaderBar({navigation, headerTitle}: any) {
  return (
    <View style={styles.headerBarView}>
      <View style={styles.sideBtnView}>
        <TouchableOpacity
          style={styles.btnView}
          onPress={() => navigation.goBack()}>
          <Image source={require('../assets/BackBtn.png')} />
        </TouchableOpacity>
      </View>
      <View style={styles.centerBtnView}>
        <Text style={styles.centerTitle}>{headerTitle}</Text>
      </View>
      <View style={styles.sideBtnView}>
        <TouchableOpacity style={styles.btnView}>
          <Image source={require('../assets/Alarm.png')} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerBarView: {
    height: '6%',
    flexDirection: 'row',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#F4F4F4',
  },
  sideBtnView: {
    flex: 1,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerBtnView: {
    flex: 3.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnView: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerTitle: {
    fontSize: 16,
    fontFamily: 'Noto Sans KR',
    fontWeight: '400',
    color: '#000000',
  },
});