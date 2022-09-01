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

function LoginScreen({navigation} : {navigation: any}) {  
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');

  const SignIn = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert('로그인 성공');
        navigation.navigate('NavHome');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const test = () => {
    navigation.navigate('NavHome');
  }

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
          <TouchableOpacity onPress={SignIn} style={styles.loginbox}>
            <Text style={{color: 'white'}}>로그인</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={test} style={styles.googlebox}>
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

export default LoginScreen;