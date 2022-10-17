import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Pressable,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BottomTab from '../components/BottomTab';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {firebase} from '@react-native-firebase/analytics';

function ChattingListScreen({navigation}: any) {
  const [userEmail, setEmail] = useState('');
  const [userNickname, setUserNickname] = useState('');
  const [chattingList, setChattingList] = useState<any>([]);
  const [chattingListLoad, setChattingListLoad] = useState(false);

  function Item({
    owner1,
    owner2,
    owner2Email,
    recentMessage,
    updatedAt,
    navigation,
  }: any) {
    const receiver = userNickname == owner1 ? owner2 : owner1;
    return (
      <Pressable
        style={styles.item}
        onPress={() =>
          navigation.navigate('ChattingScreen', {
            receiver: receiver,
            receiverEmail: owner2Email,
          })
        }>
        <View style={{width: 55}}>
          <Image source={require('../assets/TempProfileImage.png')} />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
          }}>
          <Text style={styles.name}>{receiver}</Text>
          <Text style={styles.post}>{recentMessage}</Text>
        </View>
        <View
          style={{
            width: 90,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View>
            <Text style={styles.time}>
              {updatedAt.split(' ')[2] +
                ' ' +
                updatedAt
                  .split(' ')[3]
                  .substr(0, updatedAt.split(' ')[3].indexOf('분') + 1) +
                ' ' +
                updatedAt
                  .split(' ')[3]
                  .substr(updatedAt.split(' ')[3].indexOf('분') + 1)}
            </Text>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text>" "</Text>
            </View>
          </View>
          <View style={{alignItems: 'center'}}></View>
        </View>
      </Pressable>
    );
  }

  const getUserInfo = async () => {
    try {
      const email = (await AsyncStorage.getItem('id')) || 'empty email';
      const nickname =
        (await AsyncStorage.getItem('nickname')) || 'empty nickname';
      setEmail(email);
      setUserNickname(nickname);
      if (email !== null && nickname) {
        console.log('1. userEmail:', email);
        console.log('2. userNickname:', nickname);
      }
    } catch (e) {
      console.log('ERROR: get user info');
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const getChattingList = async () => {
    try {
      const db = firebase.firestore();
      const chattingRef = db
        .collection('user')
        .doc(userEmail)
        .collection('chattingList')
        .orderBy('updatedAt', 'desc');
      chattingRef.onSnapshot(data => {
        if (data.empty) {
          setChattingListLoad(true);
        } else {
          let chattingListData = data.docs.map(doc => ({
            chatting: doc.data(),
          }));
          setChattingList(chattingListData);
          console.log(chattingListData[0]);
        }
      });
      if (chattingList[0] != undefined) {
        console.log(chattingList);
      }
    } catch {
      console.log('ERROR: getChattingList');
    }
  };

  useEffect(() => {
    getChattingList();
  }, [chattingListLoad]);

  const renderItem = ({item}: any) => (
    <Item
      owner1={item.chatting.owner1}
      owner2={item.chatting.owner2}
      recentMessage={item.chatting.recentMessage}
      updatedAt={item.chatting.updatedAt}
      navigation={navigation}
      owner2Email={item.chatting.owner2Email}
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
    marginBottom: 3,
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
    height: Platform.OS == 'android' ? 60 : 45,
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
