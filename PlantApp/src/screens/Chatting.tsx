import React, {useCallback, useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {firebase} from '@react-native-firebase/auth';
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

const Item = ({text, from, loggedInUserEmail}: any) => (
  <View
    style={{
      marginBottom: 24,
      width: '100%',
      paddingRight: 10,
      paddingLeft: 10,
      marginTop: 10,
    }}>
    <View
      style={{
        borderRadius: 10,
        backgroundColor: from === loggedInUserEmail ? '#16D66F' : '#F4F4F4',
        padding: 10,
        width: 'auto',
        maxWidth: '65%',
        justifyContent: 'center',
        alignSelf: 'flex-end',
      }}>
      <Text
        style={{
          fontSize: 14,
          color: from === loggedInUserEmail ? '#FFFFFF' : '#00000',
        }}>
        {text} from: {loggedInUserEmail}
      </Text>
    </View>
  </View>
);

function ChattingTest({route, navigation}: any) {
  const [loggedInUserEmail, setLoggedInUserEmail] = useState<any | null>('');
  const [input, setInput] = useState<any>('');
  const [messages, setMessages] = useState<any | null>([]);
  const {reciever} = route.params;

  useEffect(() => {
    try {
      const token = firebase.auth().currentUser;
      const loggedInUserEmail = token?.email;
      setLoggedInUserEmail(loggedInUserEmail);
      console.log('user email:', loggedInUserEmail);
    } catch {
      console.log('error: loadCurrentUser ');
    }
  }, []);

  async function loadMessages() {
    firestore()
      .collection('user')
      .doc(loggedInUserEmail)
      .collection('messages')
      .doc('toTestUser')
      .collection('messageLog')
      .orderBy('createdAt')
      .onSnapshot(snapshot => {
        setMessages(
          snapshot.docs.map(doc => ({id: doc.id, messages: doc.data()})),
        );
        console.log(messages[0]);
      });
  }
  useEffect(() => {
    loadMessages();
  }, []);

  useEffect(() => {
    try {
      const token = firebase.auth().currentUser;
      const loggedInUserEmail = token?.email;
      setLoggedInUserEmail(loggedInUserEmail);
      console.log('user email:', loggedInUserEmail);
    } catch {
      console.log('error: loadCurrentUser ');
    }
  }, []);

  const renderItem = ({item, loggedInUserEmail}: any | null) => (
    <Item text={item.messages.text || ''} from={item.messages.from} />
  );

  const changeText = (data: any) => {
    setInput(data);
  };

  const sendInput = async () => {
    console.log('✅ ' + input + ': send Input!');
    setInput('');
    let data = {
      text: input,
      createdAt: new Date().toString(),
      from: loggedInUserEmail,
      to: 'temp to ',
    };
    setMessages((e: any) => [...e, data]);
    try {
      const res = await firestore()
        .collection(`user`)
        .doc(loggedInUserEmail)
        .collection('messages')
        .doc('toTestUser')
        .collection('messageLog')
        .add(data);
    } catch {
      console.log('error: firebase store');
    }
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
          <Pressable>
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
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
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
            onChangeText={data => changeText(data)}
            placeholder="채팅 입력"
          />
        </View>
        <TouchableOpacity
          onPress={sendInput}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: 50,
          }}>
          <Image source={require('../assets/Send.png')} />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  inputToolBar: {
    Height: 45,
    flexDirection: 'row',
    marginBottom: 5,
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
