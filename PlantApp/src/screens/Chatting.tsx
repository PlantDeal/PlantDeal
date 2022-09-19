import React from 'react';
import {View, Text, StyleSheet, Image, FlatList, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BottomTab from '../components/BottomTab';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: '김현우',
    post: '안녕하세요. 구매 문의 드립니다.',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    name: '최지인',
    post: '네!',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    name: '김걸휘',
    post: '궁금해서 연락드립니다.',
  },
];

const Item = ({name, post}: any) => (
  <Pressable style={styles.item}>
    <View style={{flex: 1}}>
      <Image source={require('../assets/TempProfileImage.png')} />
    </View>
    <View style={{flex: 4, justifyContent: 'space-between'}}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.post}>{post}</Text>
    </View>
    <View style={{flex: 1, justifyContent: 'space-between'}}>
      <View>
        <Text style={styles.time}>오후 12:21</Text>
      </View>
      <View style={{alignItems: 'center'}}>
        <Image source={require('../assets/ChattingAlarm.png')} />
      </View>
    </View>
  </Pressable>
);

function ChattingScreen({navigation}: any) {
  const renderItem = ({item}: any) => (
    <Item name={item.name} post={item.post} />
  );
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.headerBar}>
        <View style={styles.headerBarSide}></View>
        <View style={styles.headerBarTitleView}>
          <Text style={styles.headerBarTitleText}>채팅하기</Text>
        </View>
        <View style={styles.headerBarSide}>
          <Image source={require('../assets/Alarm.png')} />
        </View>
      </View>
      <View style={styles.bodyView}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <BottomTab style={styles.bottomTab} navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  post: {
    fontSize: 13,
    color: '#8E8E93',
  },
  time: {
    fontSize: 10,
    color: '#C6C6C6',
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    paddingVertical: 15,
    height: 72,
  },
  name: {
    fontSize: 14,
    cololr: '#000000',
  },
  headerBarTitleText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  headerBarTitleView: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerBarSide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerBar: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    borderBottomColor: '#F4F4F4',
    borderBottomWidth: 1,
  },
  bodyView: {
    flex: 17,
  },
  bottomTab: {
    flex: 1,
  },
});

export default ChattingScreen;
