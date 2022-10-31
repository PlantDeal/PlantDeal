import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
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
import {useIsFocused} from '@react-navigation/native';

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
    readCheck,
  }: any) {
    const receiver = userNickname == owner1 ? owner2 : owner1;
    const hours = updatedAt.split(' ')[4].split(':')[0];
    const minutes = updatedAt.split(' ')[4].split(':')[1];
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
            backgroundColor: '#FFFFFF',
          }}>
          <Text style={styles.name}>{receiver}</Text>
          <Text style={styles.post}>{recentMessage}</Text>
        </View>
        <View
          style={{
            width: 60,
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#FFFFFF',
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              backgroundColor: '#FFFFFF',
            }}>
            <Text style={styles.time}>{hours + ':' + minutes}</Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 20,
              width: '100%',
              backgroundColor: '#FFFFFF',
              paddingLeft: 1,
            }}>
            <View
              style={{
                width: readCheck == false ? 12 : 0,
                height: 12,
                backgroundColor: '#16D66F',
                borderRadius: 10,
              }}
            />
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
          if (data.docs[0].metadata.hasPendingWrites == false) {
            let chattingListData = data.docs.map(doc => ({
              owner1: doc.data().owner1,
              owner2: doc.data().owner2,
              owner2Email: doc.data().owner2Email,
              recentMessage: doc.data().recentMessage,
              updatedAt: doc.data().updatedAt.toDate().toString(),
              readCheck: doc.data().readCheck,
            }));
            setChattingList(chattingListData);
          } else {
            let chattingListData = data.docs.map(doc => ({
              owner1: doc.data().owner1,
              owner2: doc.data().owner2,
              owner2Email: doc.data().owner2Email,
              recentMessage: doc.data().recentMessage,
              updatedAt: new Date().toString(),
              readCheck: doc.data().readCheck,
            }));
          }
        }
      });
    } catch {
      console.log('ERROR: getChattingList');
    }
  };

  const mounted = useRef(false);

  useLayoutEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      getChattingList();
    }
  }, [userEmail, useIsFocused()]);

  const renderItem = ({item}: any) => (
    <Item
      owner1={item.owner1}
      owner2={item.owner2}
      recentMessage={item.recentMessage}
      navigation={navigation}
      owner2Email={item.owner2Email}
      updatedAt={item.updatedAt}
      readCheck={item.readCheck}
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
    marginBottom: 0,
    paddingBottom: 0,
    height: 18,
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
