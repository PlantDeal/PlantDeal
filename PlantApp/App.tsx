import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {RFPercentage} from 'react-native-responsive-fontsize';

function App() {
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');

  const SignUp = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('이미 가입한 이메일 입니다.');
        }

        if (error.code === 'auth/invalid-email') {
          Alert.alert('이메일 형식이 아닙니다.');
        }
        if (error.code === 'auth/weak-password') {
          Alert.alert('비밀번호 형식이 올바르지 않습니다');
        }

        console.error(error);
      });
  };
  const SignIn = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert('로그인 성공');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const SignOut = () => {
    auth()
      .signOut()
      .then(() => {
        Alert.alert('로그아웃 성공');
        console.log('User signed out!');
      });
  };

  return (
    <SafeAreaView style={{flex: 1, padding: '3%'}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text
          style={{
            fontSize: RFPercentage(6),
            color: 'black',
            fontWeight: 'bold',
          }}>
          POCKET
        </Text>
        <Text
          style={{
            fontSize: RFPercentage(6),
            color: 'black',
            fontWeight: 'bold',
          }}>
          PLANT
        </Text>
      </View>
      <View style={{flex: 2}}>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={onChangeEmail}
            value={email}
            placeholder="이메일"
            autoComplete="off"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangePassword}
            value={password}
            placeholder="비밀번호"
            autoComplete="off"
            autoCapitalize="none"
            secureTextEntry={true}
          />
          <TouchableOpacity onPress={SignUp} style={styles.loginbox}>
            <Text style={{color: 'white'}}>회원가입</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={SignIn} style={styles.googlebox}>
            <Text>구글로 시작하기</Text>
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              marginBottom: '1%',
            }}>
            <TouchableOpacity style={styles.signup} onPress={SignIn}>
              <Text style={{fontSize: RFPercentage(1.5)}}>회원가입</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.signup} onPress={SignIn}>
              <Text style={{fontSize: RFPercentage(1.5)}}>아이디 찾기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.signup} onPress={SignIn}>
              <Text style={{fontSize: RFPercentage(1.5)}}>비밀번호 찾기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: '15%',
    width: '100%',
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: '3%',
    paddingLeft: 25,
  },
  loginbox: {
    height: '15%',
    width: '100%',
    borderWidth: 1,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10%',
    marginBottom: '3%',
    backgroundColor: '#5F7464',
  },
  googlebox: {
    height: '15%',
    width: '100%',
    borderWidth: 1,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '5%',
  },
  verticalline: {
    width: '0.4%',
    backgroundColor: 'gray',
  },
  signup: {
    marginLeft: '3%',
    marginRight: '3%',
  },
});

export default App;