import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, FlatList, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BottomTab from '../components/BottomTab';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {firebase} from '@react-native-firebase/auth';

function Item({from, post, navigation}: any) {
  return (
    <Pressable
      style={styles.item}
      onPress={() => navigation.navigate('ChattingScreen')}>
      <View style={{flex: 1}}>
        <Image source={require('../assets/TempProfileImage.png')} />
      </View>
      <View style={{flex: 4, justifyContent: 'space-between'}}>
        <Text style={styles.name}>{from}</Text>
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
}

function ChattingListScreen({navigation}: any) {
  const [email, setEmail] = useState('');
  const [chattingList, setChattingList] = useState<any>([]);
  const [loadOrNot, setLoadOrNot] = useState(false);
  const getUserEmail = async () => {
    try {
      const email = (await AsyncStorage.getItem('userEmail')) || 'empty';
      setEmail(email);
      if (email !== null) {
        console.log('✅ get user email :', email);
      }
    } catch (e) {
      console.log('no value**');
    }
  };

  const getChattingList = async () => {
    try {
      if (email !== 'empty') {
        const db = firebase.firestore();
        db.collection('user')
          .doc(email)
          .collection('messages')
          .orderBy('createdAt')
          .onSnapshot(d => {
            setChattingList(
              d.docs.map(doc => ({id: doc.id, chatting: doc.data().from})),
            );
            if (chattingList !== undefined) {
              setLoadOrNot(true);
            }
          });
      }
    } catch {}
  };

  useEffect(() => {
    getUserEmail();
  }, []);

  useEffect(() => {
    getChattingList();
  }, [loadOrNot]);

  const renderItem = ({item}: any) => <Item from={item.chatting} />;

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
