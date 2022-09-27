import React, {Fragment, useCallback, useEffect, useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  Pressable,
  StyleSheet,
  Text,
  View,
  Platform,
  Dimensions,
} from 'react-native';
import {Bubble, GiftedChat, InputToolbar, Send} from 'react-native-gifted-chat';

function ChattingScreen({route, navigation}: any) {
  const {name} = route.params;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  const renderBubble = (props: any) => {
    return (
      <Bubble
        {...props}
        textStyle={{
          right: {
            color: '#FFFFFF',
          },
        }}
        wrapperStyle={{
          right: {
            backgroundColor: '#16D66F',
          },
          left: {
            backgroundColor: '#F4F4F4',
          },
        }}
      />
    );
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
          <Text style={styles.headerBarTitleText}>{name.name}</Text>
        </View>
        <View style={styles.headerBarSide}>
          <Pressable>
            <Image source={require('../assets/ViewMore.png')} />
          </Pressable>
        </View>
      </View>
      <View style={styles.bodyView}>
        <GiftedChat
          messages={messages}
          onSend={messages => onSend(messages)}
          alwaysShowSend={true}
          placeholder="채팅 입력"
          renderBubble={renderBubble}
          renderInputToolbar={props => {
            return (
              <InputToolbar
                {...props}
                containerStyle={{
                  height: 50,
                  justifyContent: 'center',
                  backgroundColor: '#F4F4F4',
                  borderRadius: 10,
                }}
              />
            );
          }}
          renderSend={props => {
            return (
              <Send {...props}>
                <View style={{marginRight: 10}}>
                  <Image source={require('../assets/Send.png')} />
                </View>
              </Send>
            );
          }}
          user={{
            _id: 1,
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textInput: {},
  chatBubbleDate: {
    justifyContent: 'flex-end',
  },
  chatBubbleText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  chatBubble: {
    backgroundColor: '#16D66F',
    borderRadius: 10,
    height: 38,
    justifyContent: 'center',
    padding: 10,
  },
  chatView: {
    flexDirection: 'row',
    marginTop: 24,
    justifyContent: 'flex-end',
    margin: 20,
  },
  bodyView: {
    flex: 1,
  },
  headerBar: {
    flexDirection: 'row',
    width: '100%',
    borderBottomColor: '#F4F4F4',
    borderBottomWidth: 1,
    height: Platform.OS == 'android' ? 50 : 40,
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

export default ChattingScreen;
