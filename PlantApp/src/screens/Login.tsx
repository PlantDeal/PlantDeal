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


function LoginScreen({navigation} : {navigation: any}) {  
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [loginColor, onChangeLoginColor] = useState('#BDE3CE');

  

  useEffect(() => {
    if(email.indexOf('@') !== -1  && password.length > 5){
      onChangeLoginColor('#16D66F')
    }
    else{
      onChangeLoginColor('#BDE3CE')
    }
  })

  const SignIn = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert('로그인 성공');
        navigation.navigate('NavHome');
      })
      .catch(error => {
        if (error.code === 'auth/user-not-found') {
          Alert.alert('아이디가 존재하지 않습니다.')
        }

        if (error.code === 'auth/wrong-password') {
          Alert.alert('비밀번호가 다릅니다.')
        }

        if(error.code === 'auth/invalid-email'){
          Alert.alert('아이디가 이메일 형식이 아닙니다.')
        }
      });
  };

  return (
    <SafeAreaView style={{flex: 1, alignItems: 'center', backgroundColor:'#FFFFFF'}}>
      <View style={{flex:0.5}}></View>
      <View style={{flex: 1.6, justifyContent: 'center',width:335}}>
          <Text style={{fontSize: 28 ,fontFamily:'NotoSansKR-Bold',includeFontPadding:false,color:'#000000'}}>로그인</Text>
      </View>
      <View style={{flex: 3.2, justifyContent: 'center'}}>
        <Text style={styles.id_text}>아이디</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeEmail}
          value={email}
          placeholder="아이디를 입력하세요"
          placeholderTextColor="#8E8E93"
          autoComplete="off"
          autoCapitalize="none"
          clearButtonMode='always'
        />
        <Text style={styles.id_text}>비밀번호</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangePassword}
          value={password}
          placeholder="비밀번호를 입력하세요"
          placeholderTextColor="#8E8E93"
          autoComplete="off"
          autoCapitalize="none"
          secureTextEntry={true}
          clearButtonMode='always'
        />
        <View>
          <Text style={{fontSize: 14, marginBottom:10}}>테스트</Text>
        </View>
      </View>
      <View style={{flex: 2.1, justifyContent: 'center'}}>
        <TouchableOpacity 
        disabled ={
          email.indexOf('@') !== -1  && password.length > 5 ? false : true
        }
        onPress={SignIn} 
        style={{height: 48,
                width: 335,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 10,
                backgroundColor: loginColor}}>
          <Text style={{color: 'white', fontSize:16, fontFamily:'NotoSansKR-Bold'}}>로그인</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.googlebox}>
          <Text style={{color: 'white', fontSize:16, fontFamily:'NotoSansKR-Bold'}}>페이스북으로 로그인</Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 0.7, justifyContent:'center'}}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity>
            <Text style={{fontFamily:'NotoSansKR-Medium',fontSize:12,color:'#8E8E93'}}>아이디 찾기</Text>
          </TouchableOpacity>
          <View style={styles.vertical_line}></View>
          <TouchableOpacity>
            <Text style={{fontFamily:'NotoSansKR-Medium',fontSize:12,color:'#8E8E93'}}>비밀번호 찾기</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flex: 0.6, justifyContent: 'center'}}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{marginRight:5, fontFamily:'NotoSansKR-Medium',color:'#8E8E93'}}>혹시 아직 회원이 아니신가요?</Text>
          <TouchableOpacity style={{marginLeft:5}}>
            <Text style= {{color:'#16D66F',fontFamily:'NotoSansKR-Medium'}}>회원가입</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flex: 1.2}}></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 46,
    width: 335,
    marginBottom: 10,
    paddingLeft: 20,
    fontSize: 16,
    backgroundColor: '#F4F4F4'
  },
  id_text: {
    fontSize: 14,
    marginBottom:10,
    fontFamily:'NotoSansKR-Regular',
    includeFontPadding:false,
    color:'#000000'
  },
  loginbox: {
    height: 48,
    width: 335,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#16D66F'
  },
  googlebox: {
    height: 48,
    width: 335,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#1B91FF',
  },
  verticalline: {
    width: '0.4%',
    backgroundColor: 'gray',
  },
  signup: {
    marginLeft: '3%',
    marginRight: '3%',
  },
  vertical_line: {
    borderLeftWidth: 2,
    marginLeft: 10, 
    marginRight: 10, 
    borderColor: '#D9D9D9',
  },
});

export default LoginScreen;