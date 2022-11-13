import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
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
  KeyboardAvoidingView,
  FlatList,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {useIsFocused, useRoute} from '@react-navigation/native';

function ChattingTest({route, navigation}: any) {
  const [input, setInput] = useState<any>('');
  const [messages, setMessages] = useState<any | null>([]);
  const [userEmail, setEmail] = useState('');
  const [userNickname, setUserNickname] = useState('');
  const [disableSendBtn, setDisableSendBtn] = useState(true);
  const [showPLusTab, setShowPlusTab] = useState(false);
  const {receiverEmail, unplug} = route.params;
  const [receiver, setReceiver] = useState('');
  const [checkBlockedUser, setCheckBlockedUser] = useState(false);
  const [checkBlock, setCheckBlock] = useState(0);
  const [amIBlocked, setAmIBlocked] = useState(false);
  const [checkIBlock, setCheckIBlock] = useState(0);
  const [checkCanInput, setCheckCanInput] = useState(true);
  const unplugMessageLoad = useRef(false);
  const date = firebase.firestore.FieldValue.serverTimestamp();

  const db = firebase.firestore();
  const Item = ({text, messageOwner, createdAt}: any) => (
    <View
      style={{
        marginBottom: 10,
        width: '100%',
        paddingRight: 10,
        paddingLeft: 10,
        marginTop: 5,
        flexDirection: 'row',
        justifyContent:
          userNickname == messageOwner ? 'flex-end' : 'flex-start',
        alignItems: 'flex-end',
      }}>
      <View
        style={{
          height: 20,
          width: userNickname == messageOwner ? 50 : 0,
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}>
        <Text style={{color: '#C6C6C6'}}>
          {createdAt.split(' ')[4].split(':')[0]}:
          {createdAt.split(' ')[4].split(':')[1]}
        </Text>
      </View>
      <View
        style={{
          borderRadius: 10,
          backgroundColor: userNickname == messageOwner ? '#16D66F' : '#F4F4F4',
          padding: 10,
          width: 'auto',
          maxWidth: '65%',
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
          height: 20,
          width: userNickname == messageOwner ? 0 : 50,
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}>
        <Text style={{color: '#C6C6C6'}}>
          {createdAt.split(' ')[4].split(':')[0]}:
          {createdAt.split(' ')[4].split(':')[1]}
        </Text>
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
      const receiverDB = (
        await db.collection('user').doc(receiverEmail).get()
      ).data();
      if (receiverDB) {
        setReceiver(receiverDB.nickname || '');
      } else {
        console.log('No receiver Data');
      }
      if (email !== null && nickname) {
        console.log('✅ Get user email :', email);
        console.log('✅ Get user nickName:', nickname);
        console.log('✅ Get user receiver:', receiver);
        console.log('✅ Get user receiverEmail:', receiverEmail);
        console.log('🚀 Ready to send message');
      }
    } catch (e) {
      console.log('❌ ERROR: get user info');
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const checkAmIBlocked = async () => {
    try {
      const amIblockedDoc = db
        .collection('user')
        .doc(receiverEmail)
        .collection('blockedUser');
      amIblockedDoc.onSnapshot(data => {
        if (data.empty) {
          console.log('❌ No amIblockedDoc data now.');
          setAmIBlocked(false);
        } else {
          let blockedUserList = data.docs.map(doc => ({
            id: doc.id,
          }));
          for (let i = 0; i < blockedUserList.length; i++) {
            console.log(userEmail, blockedUserList[i].id);
            if (blockedUserList[i].id == userEmail) {
              setAmIBlocked(true);
              break;
            } else {
              setCheckIBlock(e => e + 1);
            }
          }
          if (checkIBlock == blockedUserList.length) {
            setAmIBlocked(false);
          }
        }
      });
    } catch {}
  };

  useLayoutEffect(() => {
    if (userEmail != '') {
      checkAmIBlocked();
      console.log('sender', userEmail, 'is blocked?:', amIBlocked);
    }
  }, [amIBlocked, userEmail]);

  const checkUserIsBlocked = async () => {
    try {
      const blockedUserDoc = db
        .collection('user')
        .doc(userEmail)
        .collection('blockedUser');
      blockedUserDoc.onSnapshot(data => {
        if (data.empty) {
          console.log('❌ No blockedUser data now.');
          setCheckBlockedUser(false);
        } else {
          let blockedUserList = data.docs.map(doc => ({
            id: doc.id,
          }));
          for (let i = 0; i < blockedUserList.length; i++) {
            if (blockedUserList[i].id == receiverEmail) {
              setCheckBlockedUser(true);
              break;
            } else {
              setCheckBlock(e => e + 1);
            }
            if (checkBlock == blockedUserList.length) {
              setCheckBlockedUser(false);
            }
          }
        }
      });
    } catch {}
  };

  useLayoutEffect(() => {
    if (userEmail != '') {
      checkUserIsBlocked();
      console.log('receiver', receiverEmail, 'is blocked?:', checkBlockedUser);
    }
  }, [checkBlockedUser, checkBlock, userEmail]);

  // GET MESSAGES
  async function getMessages() {
    const chattingRef = db
      .collection('user')
      .doc(userEmail)
      .collection('chattingList')
      .doc(receiverEmail)
      .collection('messages')
      .orderBy('createdAt', 'desc');
    const loadMessage = chattingRef.onSnapshot(data => {
      if (data.metadata.hasPendingWrites == false) {
        if (data.empty) {
        } else {
          let messagesData = data.docs.map(doc => ({
            id: doc.id,
            text: doc.data().text,
            messageOwner: doc.data().messageOwner,
            createdAt: doc.data().createdAt,
          }));
          setMessages(messagesData);
        }
      }
    });
    if (unplugMessageLoad.current) {
      console.log('UNPLUGED!');
      loadMessage();
    }
  }

  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      getMessages();
    }
  }, [userEmail, unplugMessageLoad]);

  const renderItem = ({item}: any | null) => (
    <Item
      text={item.text}
      messageOwner={item.messageOwner}
      createdAt={item.createdAt.toDate().toString()}
    />
  );

  const changeText = (data: any) => {
    setInput(data);
  };

  useEffect(() => {
    if (input.trim().length > 0 && !checkBlockedUser && !amIBlocked) {
      setDisableSendBtn(false);
    } else {
      setDisableSendBtn(true);
    }
  }, [input]);

  useEffect(() => {
    if (!checkBlockedUser && !amIBlocked) {
      setCheckCanInput(e => true);
    } else {
      setCheckCanInput(e => false);
    }
  }, [checkBlockedUser, amIBlocked]);

  const sendInput = async () => {
    // 총 4번의 doc을 생성하거나 업데이트함. log 4개가 떠야 정상

    let inputText = input.trim();
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
      .set(
        {
          recentMessage: inputText,
          updatedAt: date,
          owner1: receiver,
          owner2: userNickname,
          owner2Email: receiverEmail,
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
          owner2Email: userEmail,
          readCheck: false,
        },
        {merge: true},
      );

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

  const blockUser = () => {
    if (checkBlockedUser == false) {
      try {
        db.collection('user')
          .doc(userEmail)
          .collection('blockedUser')
          .doc(receiverEmail)
          .set({createdAt: new Date()}, {merge: true});
        console.log('✅ block user: ', receiverEmail);
      } catch {
        console.log('❌ block failed!');
      }
    } else {
      try {
        db.collection('user')
          .doc(userEmail)
          .collection('blockedUser')
          .doc(receiverEmail)
          .delete();
        console.log('✅ cancel block!');
      } catch {
        console.log('❌ cancel failed!');
      }
    }
  };

  const unplugLoad = () => {
    console.log(unplugMessageLoad);
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
            <Pressable
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
            </Pressable>
            <Pressable
              style={{
                backgroundColor: '#FFFFFF',
                width: 335,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                blockUser();
                switchViewMore();
              }}>
              <View
                style={{
                  height: checkBlockedUser == true ? undefined : 0,
                }}>
                <Text style={{color: '#000000', fontSize: 16}}>차단 해제</Text>
              </View>
              <View
                style={{
                  height: checkBlockedUser == true ? 0 : undefined,
                }}>
                <Text style={{color: '#000000', fontSize: 16}}>차단 하기</Text>
              </View>
            </Pressable>
            <Pressable
              style={{
                backgroundColor: '#FFFFFF',
                width: 335,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
              }}
              onPress={() => {
                navigation.goBack();
                db.collection('user')
                  .doc(userEmail)
                  .collection('chattingList')
                  .doc(receiverEmail)
                  .delete();
              }}>
              <Text style={{color: '#DA1E28', fontSize: 16}}>
                채팅방 나가기
              </Text>
            </Pressable>
            <Pressable
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
            </Pressable>
          </View>
        </SafeAreaView>
      </Modal>
      <View style={styles.headerBar}>
        <View style={styles.headerBarSide}>
          <Pressable
            onPress={() => {
              unplugMessageLoad.current = true;
              getMessages();
              navigation.goBack();
            }}>
            <Image source={require('../assets/BackBtn.png')} />
          </Pressable>
        </View>
        <View style={styles.headerBarTitleView}>
          <Text style={styles.headerBarTitleText}>{receiver}</Text>
        </View>
        <View style={styles.headerBarSide}>
          <Pressable onPress={() => switchViewMore()}>
            <Image source={require('../assets/ViewMore.png')} />
          </Pressable>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          height: checkBlockedUser == true ? 40 : 0,
          backgroundColor: '#FFFFFF',
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: 'red',
            width: '95%',
            height: '100%',
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 12, color: '#FFFFFF', fontWeight: 'bold'}}>
            이 대화 상대는 차단되었습니다.
          </Text>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          height: amIBlocked == true ? 40 : 0,
          backgroundColor: '#FFFFFF',
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: '#ffd400',
            width: '95%',
            height: '100%',
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 12, color: '#000000', fontWeight: 'bold'}}>
            이 채팅방은 더 이상 사용할 수 없습니다.
          </Text>
        </View>
      </View>
      <View style={styles.chatView}>
        <FlatList
          data={[...messages]}
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
              width: checkCanInput == false ? 50 : 0,
            }}>
            <Image
              style={{height: 20}}
              source={
                checkCanInput == false
                  ? require('../assets/DisabledPlus.png')
                  : undefined
              }
            />
          </Pressable>
          <Pressable
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: checkCanInput == true ? 50 : 0,
            }}
            onPress={() => {
              switchPlustBtn();
            }}>
            <Image
              style={{height: 20}}
              source={
                checkCanInput == true
                  ? require('../assets/plus.png')
                  : undefined
              }
            />
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
              }}
              placeholder="채팅 입력"
              defaultValue=""
              editable={checkCanInput == true ? true : false}
              selectTextOnFocus={checkCanInput == true ? true : false}
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
            <Image
              style={{height: checkCanInput == true ? 25 : 0}}
              source={require('../assets/Send.png')}
            />
            <Image
              style={{height: checkCanInput == false ? 25 : 0}}
              source={require('../assets/DisabledSend.png')}
            />
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
