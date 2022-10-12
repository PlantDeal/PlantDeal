import React, {useCallback, useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {firebase} from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Image,
  SafeAreaView,
  Pressable,
  StyleSheet,
  Text,
  View,
  Platform,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  FlatList,
} from 'react-native';

function ChattingTest({route, navigation}: any) {
  const [input, setInput] = useState<any>('');
  const [messages, setMessages] = useState<any | null>([]);
  const {reciever, recieverEmail} = route.params;
  const [userEmail, setEmail] = useState('');
  const [userNickname, setUserNickname] = useState('');
  const [disableSendBtn, setDisableSendBtn] = useState(true);
  const db = firebase.firestore();
  const date = new Date();

  const Item = ({text, messageOwner}: any) => (
    <View
      style={{
        marginBottom: 24,
        width: '100%',
        paddingRight: 10,
        paddingLeft: 10,
        marginTop: 5,
      }}>
      <View
        style={{
          borderRadius: 10,
          backgroundColor: userNickname == messageOwner ? '#16D66F' : '#F4F4F4',
          padding: 10,
          width: 'auto',
          maxWidth: '65%',
          justifyContent: 'center',
          alignSelf: userNickname == messageOwner ? 'flex-end' : 'flex-start',
        }}>
        <Text
          style={{
            fontSize: 14,
            color: userNickname == messageOwner ? '#FFFFFF' : '#000000',
          }}>
          {text}
        </Text>
      </View>
    </View>
  );

  const getUserInfo = async () => {
    try {
      const email = (await AsyncStorage.getItem('userEmail')) || 'empty email';
      const nickname =
        (await AsyncStorage.getItem('userNickname')) || 'empty nickname';
      setEmail(email);
      setUserNickname(nickname);
      if (email !== null && nickname) {
        console.log('✅ get user email :', email);
        console.log('✅ get user nickName:', nickname);
        console.log('🚀 Ready to send message');
      }
    } catch (e) {
      console.log('❌ ERROR: get user info');
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  async function getMessages() {
    const chattingRef = db
      .collection('user')
      .doc(userEmail)
      .collection('chattingList')
      .doc(reciever)
      .collection('messages')
      .orderBy('createdAt', 'asc');
    chattingRef.onSnapshot(data => {
      if (data.empty) {
        console.log('empty data');
      } else {
        let messagesData = data.docs.map(doc => ({
          id: doc.id,
          message: doc.data(),
        }));
        setMessages(messagesData);
      }
    });
  }

  useEffect(() => {
    getMessages();
  }, [userEmail]);

  const renderItem = ({item}: any | null) => (
    <Item text={item.message.text} messageOwner={item.message.messageOwner} />
  );

  const changeText = (data: any) => {
    setInput(data);
  };

  const checkSpace = (data: any) => {
    if (input.trim() !== '') {
      setDisableSendBtn(false);
    } else {
      setDisableSendBtn(true);
    }
  };

  const sendInput = async () => {
    // 총 4번의 doc을 생성하거나 업데이트함. log 4개가 떠야 정상
    let inputText = input.trim();
    console.log(inputText);
    db.collection('user')
      .doc(userEmail)
      .collection('chattingList')
      .doc(reciever)
      .set(
        {
          recentMessage: inputText,
          updatedAt:
            (date.getMonth() + 1).toString() +
            '월 ' +
            date.getDay().toString() +
            '일 ' +
            date.getHours() +
            '시 ' +
            date.getMinutes() +
            '분',
        },
        {merge: true},
      );
    db.collection('user')
      .doc(recieverEmail)
      .collection('chattingList')
      .doc(userNickname)
      .set(
        {
          recentMessage: inputText,
          updatedAt:
            (date.getMonth() + 1).toString() +
            '월 ' +
            date.getDay().toString() +
            '일 ' +
            date.getHours() +
            '시 ' +
            date.getMinutes() +
            '분',
          owner1: reciever,
          owner2: userNickname,
        },
        {merge: true},
      );
    const message = {
      text: inputText,
      messageOwner: userNickname,
      createdAt:
        (date.getMonth() + 1).toString() +
        '월 ' +
        date.getDay().toString() +
        '일 ' +
        date.getHours() +
        '시 ' +
        date.getMinutes() +
        '분',
    };
    setInput('');
    db.collection('user')
      .doc(userEmail)
      .collection('chattingList')
      .doc(reciever)
      .collection('messages')
      .doc()
      .set(message);
    db.collection('user')
      .doc(recieverEmail)
      .collection('chattingList')
      .doc(userNickname)
      .collection('messages')
      .doc()
      .set(message);
    setDisableSendBtn(true);
  };

  const openViewMore = () => {
    console.log('hi');
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.headerBar}>
        <View style={styles.headerBarSide}>
          <Pressable onPress={() => navigation.goBack()}>
            <Image source={require('../assets/BackBtn.png')} />
          </Pressable>
        </View>
        <View style={styles.headerBarTitleView}>
          <Text style={styles.headerBarTitleText}>{reciever}</Text>
        </View>
        <View style={styles.headerBarSide}>
          <Pressable onPress={() => openViewMore()}>
            <Image source={require('../assets/ViewMore.png')} />
          </Pressable>
        </View>
      </View>
      <View style={styles.chatView}>
        <FlatList
          data={[...messages].reverse()}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          style={{width: '100%'}}
          inverted
        />
      </View>
      <KeyboardAvoidingView
        style={styles.inputToolBar}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={10}>
        <Pressable
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: 50,
          }}>
          <Image source={require('../assets/plus.png')} />
        </Pressable>
        <View
          style={{
            backgroundColor: '#F4F4F4',
            flex: 1,
            height: 40,
            borderRadius: 10,
            paddingLeft: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TextInput
            style={{
              width: '100%',
              flex: 1,
              fontSize: 16,
              textAlignVertical: 'center',
            }}
            value={input}
            onChangeText={data => {
              changeText(data);
              checkSpace(data);
            }}
            placeholder="채팅 입력"
            defaultValue=""
          />
        </View>
        <TouchableOpacity
          onPress={sendInput}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: 50,
          }}
          disabled={disableSendBtn}>
          <Image source={require('../assets/Send.png')} />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  inputToolBar: {
    felx: 1,
    flexDirection: 'row',
    marginBottom: Platform.OS == 'android' ? 10 : 0,
    alignContent: 'center',
    justifyContent: 'center',
  },
  chatView: {
    flex: 16,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  headerBar: {
    flexDirection: 'row',
    width: '100%',
    borderBottomColor: '#F4F4F4',
    borderBottomWidth: 1,
    height: Platform.OS === 'android' ? 60 : 50,
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
});

export default ChattingTest;
