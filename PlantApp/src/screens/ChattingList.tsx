import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, FlatList, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BottomTab from '../components/BottomTab';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {firebase} from '@react-native-firebase/analytics';

function ChattingListScreen({navigation}: any) {
  const [userEmail, setEmail] = useState('');
  const [userNickname, setUserNickname] = useState('');
  const [chattingList, setChattingList] = useState<any>([]);
  const [chattingListData, setChattingListData] = useState();
  const [loadOrNot, setLoadOrNot] = useState(false);
  const [initLoad, setInitLoad] = useState(false);

  function Item({owner1, owner2, recentMessage, updatedAt, navigation}: any) {
    return (
      <Pressable
        style={styles.item}
        onPress={() => navigation.navigate('ChattingScreen')}>
        <View style={{flex: 1}}>
          <Image source={require('../assets/TempProfileImage.png')} />
        </View>
        <View style={{flex: 4, justifyContent: 'space-between'}}>
          <Text style={styles.name}>
            {userNickname == owner1 ? owner2 : owner1}
          </Text>
          <Text style={styles.post}>{recentMessage}</Text>
        </View>
        <View style={{flex: 1, justifyContent: 'space-between'}}>
          <View>
            <Text style={styles.time}>{updatedAt}</Text>
          </View>
          <View style={{alignItems: 'center'}}></View>
        </View>
      </Pressable>
    );
  }

  const getChattingList = async () => {
    // get userInfo
    try {
      const email = (await AsyncStorage.getItem('userEmail')) || 'empty email';
      const nickname =
        (await AsyncStorage.getItem('userNickname')) || 'empty nickname';
      setEmail(email);
      setUserNickname(nickname);
      if (email !== null && nickname) {
        console.log('1 get user email :', email);
        console.log('2 get user nickName:', nickname);
      }
    } catch (e) {
      console.log('no value**');
    }

    // get chatting list
    try {
      const db = firebase.firestore();
      const chattingRef = db
        .collection('user')
        .doc(userEmail)
        .collection('chattingList');
      chattingRef.onSnapshot(data => {
        if (data.empty) {
          console.log('empty data');
        } else {
          let chattingListData = data.docs.map(doc => ({
            id: doc.id,
            chatting: doc.data(),
          }));
          setChattingList(chattingListData);
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
  }, []);

  const renderItem = ({item}: any) => (
    <Item
      owner1={item.chatting.owner1}
      owner2={item.chatting.owner2}
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
