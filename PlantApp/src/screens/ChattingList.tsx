import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, FlatList, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BottomTab from '../components/BottomTab';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {firebase} from '@react-native-firebase/analytics';

function Item({owner, reciever, recentMessage, updatedAt, navigation}: any) {
  return (
    <Pressable
      style={styles.item}
      onPress={() => navigation.navigate('ChattingScreen')}>
      <View style={{flex: 1}}>
        <Image source={require('../assets/TempProfileImage.png')} />
      </View>
      <View style={{flex: 4, justifyContent: 'space-between'}}>
        <Text style={styles.name}>{}</Text>
        <Text style={styles.post}>{}</Text>
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
}

function ChattingListScreen({navigation}: any) {
  const [userEmail, setEmail] = useState('');
  const [userNickname, setUserNickname] = useState('');
  const [chattingList, setChattingList] = useState<any>([]);
  const [loadOrNot, setLoadOrNot] = useState(false);

  const getUserInfo = async () => {
    try {
      const email = (await AsyncStorage.getItem('userEmail')) || 'empty email';
      const nickname =
        (await AsyncStorage.getItem('userNickname')) || 'empty nickname';
      setEmail(userEmail);
      setUserNickname(nickname);
      if (email !== null && nickname) {
        console.log('✅ get user email :', email);
        console.log('✅ get user nickName:', nickname);
      }
    } catch (e) {
      console.log('no value**');
    }
  };

  const getChattingList = async () => {
    try {
      const db = firebase.firestore();
      const chattingRef = db.collection('chatting').orderBy('updatedAt');
      chattingRef.onSnapshot(data => {
        setChattingList(
          data.docs.map(doc => ({
            id: doc.id,
            chatting: doc.data(),
          })),
        );
      });
      if (chattingList[0] === undefined) {
        console.log(
          '--- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ',
        );
        console.log('❌ chatting list load faild');
      } else {
        console.log('✅ load completed! : ', chattingList);
      }
    } catch {
      console.log('ERROR: getChattingList');
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    getChattingList();
  }, []);

  const renderItem = ({item}: any) => (
    <Item
      owner={item.chatting.owner}
      reciever={item.chatting.reciever}
      recentMessage={item.chatting.recentMessage}
      updatedAt={item.chatting.updatedAt}
    />
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
          data={chattingList}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
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
    color: '#000000',
    fontWeight: '400',
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

export default ChattingListScreen;
