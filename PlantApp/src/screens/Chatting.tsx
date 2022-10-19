import React, {useCallback, useEffect, useRef, useState} from 'react';
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
  Modal,
  Alert,
} from 'react-native';

function ChattingTest({route, navigation}: any) {
  const [input, setInput] = useState<any>('');
  const [messages, setMessages] = useState<any | null>([]);
  const [userEmail, setEmail] = useState('');
  const [userNickname, setUserNickname] = useState('');
  const [disableSendBtn, setDisableSendBtn] = useState(true);
  const [messageLoadCheck, setMessageLoadCheck] = useState(true);
  const [showPLusTab, setShowPlusTab] = useState(false);

  const {receiver, receiverEmail} = route.params;

  const db = firebase.firestore();
  const date = new Date();

  const Item = ({text, messageOwner, createdAt}: any) => (
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
      <View
        style={{
          alignSelf: userNickname == messageOwner ? 'flex-end' : 'flex-start',
          alignItems: userNickname == messageOwner ? 'flex-end' : 'flex-start',
          paddingRight: userNickname == messageOwner ? 5 : 0,
          paddingLeft: userNickname == messageOwner ? 0 : 5,
          width: 85,
          marginTop: 5,
        }}>
        <Text style={{color: '#C6C6C6'}}></Text>
      </View>
    </View>
  );

  const getUserInfo = async () => {
    try {
      const email = (await AsyncStorage.getItem('id')) || 'empty email';
      const nickname =
        (await AsyncStorage.getItem('nickname')) || 'empty nickname';
      setEmail(email);
      setUserNickname(nickname);
      if (email !== null && nickname) {
        console.log('✅ Get user email :', email);
        console.log('✅ Get user nickName:', nickname);
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
      .doc(receiverEmail)
      .collection('messages')
      .orderBy('createdAt', 'asc');
    chattingRef.onSnapshot(data => {
      if (data.empty) {
        setMessageLoadCheck(false);
      } else {
        let messagesData = data.docs.map(doc => ({
          id: doc.id,
          message: doc.data(),
        }));
        db.collection('user')
          .doc(userEmail)
          .collection('chattingList')
          .doc(receiverEmail)
          .set({}, {merge: true});
        setMessages(messagesData);
      }
    });
  }

  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      getMessages();
    }
  }, [userEmail]);

  const renderItem = ({item}: any | null) => (
    <Item
      text={item.message.text}
      messageOwner={item.message.messageOwner}
      createdAt={item.message.createdAt}
    />
  );

  const changeText = (data: any) => {
    setInput(data);
  };

  const checkSpace = (data: any) => {
    if (input.trim().length >= 0) {
      setDisableSendBtn(false);
    } else {
      setDisableSendBtn(true);
    }
  };

  const sendInput = async () => {
    // 총 4번의 doc을 생성하거나 업데이트함. log 4개가 떠야 정상
    let inputText = input.trim();
    const date = firebase.firestore.FieldValue.serverTimestamp();

    db.collection('user')
      .doc(userEmail)
      .collection('chattingList')
      .doc(receiverEmail)
      .set(
        {
          recentMessage: inputText,
          updatedAt: date,
          owner1: receiver,
          owner2: userNickname,
        },
        {merge: true},
      );

    db.collection('user')
      .doc(receiverEmail)
      .collection('chattingList')
      .doc(userEmail)
      .set(
        {
          recentMessage: inputText,
          updatedAt: date,
          owner1: receiver,
          owner2: userNickname,
        },
        {merge: true},
      );
    const message = {
      text: inputText,
      messageOwner: userNickname,
      createdAt: date,
    };

    setInput('');

    db.collection('user')
      .doc(userEmail)
      .collection('chattingList')
      .doc(receiverEmail)
      .collection('messages')
      .doc()
      .set(message);
    db.collection('user')
      .doc(receiverEmail)
      .collection('chattingList')
      .doc(userEmail)
      .collection('messages')
      .doc()
      .set(message);
    setDisableSendBtn(true);
  };

  const [modalVisible, setModalVisible] = useState(false);

  const switchViewMore = () => {
    setModalVisible(e => !e);
  };

  const switchPlustBtn = () => {
    setShowPlusTab(e => !e);
    console.log('hi');
  };

  const PlusTabView = () => {
    return (
      <View>
        <View
          style={{
            paddingLeft: 22,
            backgroundColor: 'trasnparent',
            height: 40,
            justifyContent: 'flex-end',
          }}>
          <Text style={{paddingBottom: 10, color: '#000000'}}>메뉴</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'transparent',
            height: 86,
          }}>
          <Pressable style={{marginLeft: 20, alignItems: 'center'}}>
            <Image source={require('../assets/Image.png')} />
            <Text style={{marginTop: 8}}>사진</Text>
          </Pressable>
          <Pressable style={{marginLeft: 20, alignItems: 'center'}}>
            <Image source={require('../assets/Camera.png')} />
            <Text style={{marginTop: 8}}>카메라</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{backgroundColor: '#FFFFFF', flex: 1}}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <SafeAreaView
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(142,142,147,0.4)',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingBottom: Platform.OS == 'android' ? 20 : 40,
          }}>
          <View style={{width: 335, height: 204, alignItems: 'center'}}>
            <TouchableOpacity
              style={{
                backgroundColor: '#FFFFFF',
                width: 335,
                height: 44,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                switchViewMore();
              }}>
              <Text style={{color: '#000000', fontSize: 16}}>알람 끄기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#FFFFFF',
                width: 335,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                switchViewMore();
              }}>
              <Text style={{color: '#000000', fontSize: 16}}>차단 하기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#FFFFFF',
                width: 335,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                switchViewMore();
              }}>
              <Text style={{color: '#DA1E28', fontSize: 16}}>
                채팅방 나가기
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#16D66F',
                width: 335,
                height: 50,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
              }}
              onPress={() => {
                switchViewMore();
              }}>
              <Text style={{color: '#FFFFFF', fontSize: 16}}>취소</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
      <View style={styles.headerBar}>
        <View style={styles.headerBarSide}>
          <Pressable onPress={() => navigation.goBack()}>
            <Image source={require('../assets/BackBtn.png')} />
          </Pressable>
        </View>
        <View style={styles.headerBarTitleView}>
          <Text style={styles.headerBarTitleText}>{receiver}</Text>
        </View>
        <View style={styles.headerBarSide}>
          <TouchableOpacity onPress={() => switchViewMore()}>
            <Image source={require('../assets/ViewMore.png')} />
          </TouchableOpacity>
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
        <View
          style={{
            flexDirection: 'row',
            height: 50,
            width: '100%',
            backgroundColor: 'transparent',
          }}>
          <Pressable
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: 50,
            }}
            onPress={() => switchPlustBtn()}>
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
              alignSelf: 'center',
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
        </View>
        {showPLusTab && <PlusTabView />}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  inputToolBar: {
    felx: 1,
    marginBottom: Platform.OS == 'android' ? 10 : 0,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'yellow;',
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
  },
});

export default ChattingTest;
