import React, {useState,useEffect} from 'react';
import {View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, TextInput, Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';



function RegistScreen({navigation}: any) {
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [passwordcheck, onChangePasswordCheck] = useState('');
  const [underlinecolorid,onChangeUnderlineColorId] = useState('#8E8E93');
  const [underlinecolorpw,onChangeUnderlineColorPw] = useState('#8E8E93');
  const [underlinecolorpwcheck,onChangeUnderlineColorPwCheck] = useState('#8E8E93');
  const [mentionid,onchangeMentionId] = useState('');
  const [mentionpw,onchangeMentionPw] = useState('');
  const [loginColor, onChangeLoginColor] = useState('#BDE3CE');

  const emailcheck = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
  const pwcheck = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,15}/

  useEffect(() => {
    if(passwordcheck === ''){
      onChangeUnderlineColorPwCheck('#8E8E93')
      onchangeMentionPw('')
    }
    else if(password !== passwordcheck){
      onChangeUnderlineColorPwCheck('#DA1E28')
      onchangeMentionPw('비밀번호가 일치하지 않습니다.')
    }
    else{
      onChangeUnderlineColorPwCheck('#16D66F')
      onchangeMentionPw('비밀번호가 일치합니다')
    }
  },[passwordcheck]);

  useEffect(()=> {
    if(password === ''){
      onChangeUnderlineColorPw('#8E8E93')
    }
    else if(pwcheck.test(password)){
      onChangeUnderlineColorPw('#16D66F')
    }
    else{
      onChangeUnderlineColorPw('#DA1E28')
    }
  },[password])

  useEffect(() => {
    if(email === ''){
      onChangeUnderlineColorId('#8E8E93')
      onchangeMentionId('')
    }
    else if(emailcheck.test(email)){
      onChangeUnderlineColorId('#8E8E93')
      onchangeMentionId('')
    }
    else{
      onChangeUnderlineColorId('#DA1E28')
      onchangeMentionId('이메일 형식이 아닙니다.')
    }
  },[email])

  useEffect(()=> {
    if(underlinecolorid === '#16D66F' && underlinecolorpw === '#16D66F'){
      onChangeLoginColor('#16D66F')
    }
    else{
      onChangeLoginColor('#BDE3CE')
    }
  })

  async function idcheck(){
    await firestore()
    .collection('user')
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        if(email === documentSnapshot.id){
          onChangeUnderlineColorId('#DA1E28')
          onchangeMentionId('중복된 아이디 입니다.')
        }
        else{
          onChangeUnderlineColorId('#16D66F')
          onchangeMentionId('사용 가능한 아이디 입니다.')
        }
      });
    })
  }
  
  async function Signup(){
    await auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      navigation.navigate('RegistInfoScreen',{id:email})
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
    })
    
  }

  
  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <View style={{flex: 0.7, flexDirection:'row',borderBottomColor:'#F4F4F4',borderBottomWidth:1}}>
        <View style={{flex: 2.0}}>
          <TouchableOpacity
            style={styles.btnView}
            onPress={() => navigation.goBack()}>
            <Image source={require('../assets/BackBtn.png')} />
          </TouchableOpacity>
        </View>
        <View style={{flex:6.5}}></View>
        <View style={{flex: 1.7}}></View>
      </View>
      <View style={{flex: 1, justifyContent:'center',width:335}}>
        <Text style={{fontSize:24,fontFamily:'NotoSansKR-Bold',includeFontPadding:false,color:'#000000'}}>아이디.비밀번호</Text>
      </View>
      <View style= {{flex: 1.8, justifyContent:'center',width:335}}>
        <View style={{flexDirection:'row'}}>
          <View style={{flex:2.3,justifyContent:'center',paddingLeft:1}}>
            <Text style={styles.id_text}>아이디</Text>
          </View>
          <View style={{flex:5}}></View>
          <View style={{flex:2.6, alignItems:'flex-end',justifyContent:'center'}}>
            <TouchableOpacity onPress={idcheck}>
              <Text style={{fontSize:12,color:'#16D66F',fontFamily:'NotoSansKR-Medium',includeFontPadding:false}}>중복확인</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <TextInput
            style={{height: 48,
                    width: 335,
                    marginBottom: 10,
                    fontSize: 16,
                    fontFamily:'NotoSansKR-Regular',
                    includeFontPadding:false,
                    borderBottomWidth:1,
                    borderBottomColor:underlinecolorid,
                    paddingLeft:0}}
            onChangeText={onChangeEmail}
            value={email}
            placeholder="사용하실 아이디를 입력해주세요."
            placeholderTextColor='#8E8E93'
            autoComplete="off"
            autoCapitalize="none"
            clearButtonMode='always'
          />
          <Text style={{color:underlinecolorid, fontSize:14,fontFamily:'NotoSansKR-Regular', includeFontPadding:false,}}>{mentionid}</Text>
        </View>
      </View>
      <View style={{flex: 2.5,justifyContent:'center',width:335}}>
        <Text style={styles.id_text}>비밀번호</Text>
        <TextInput
          style={{height: 48,
                  width: 335,
                  marginBottom: 10,
                  fontSize: 16,
                  fontFamily:'NotoSansKR-Regular',
                  includeFontPadding:false,
                  borderBottomWidth:1,
                  borderBottomColor:underlinecolorpw,
                  paddingLeft:0}}
          onChangeText={onChangePassword}
          value={password}
          placeholder="사용하실 비밀번호를 입력해주세요."
          placeholderTextColor='#8E8E93'
          autoComplete="off"
          autoCapitalize="none"
          secureTextEntry={true}
          clearButtonMode='always'
        />
        <TextInput
          style={{height: 48,
                  width: 335,
                  marginBottom: 10,
                  fontSize: 16,
                  fontFamily:'NotoSansKR-Regular',
                  includeFontPadding:false,
                  borderBottomWidth:1,
                  borderBottomColor:underlinecolorpwcheck,
                  paddingLeft:0}}
          onChangeText={onChangePasswordCheck}
          value={passwordcheck}
          placeholder="비밀번호를 재입력 해주세요."
          placeholderTextColor='#8E8E93'
          autoComplete="off"
          autoCapitalize="none"
          secureTextEntry={true}
          clearButtonMode='always'
        />
        <Text style={{color:underlinecolorpwcheck, fontSize:14,fontFamily:'NotoSansKR-Regular', includeFontPadding:false}}>{mentionpw}</Text>
      </View>
      <View style={{flex: 3}}></View>
      <View style={{flex:1, justifyContent:'center'}}>
        <TouchableOpacity 
          disabled ={
            underlinecolorid === '#16D66F' && underlinecolorpw === '#16D66F' ? false : true
          }
          onPress={Signup} 
          style={{height: 48,
                  width: 335,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 10,
                  borderRadius:6,
                  backgroundColor: loginColor}}>
          <Text style={{color: 'white', fontSize:16, fontFamily:'NotoSansKR-Bold',includeFontPadding:false}}>다음</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    alignItems:'center',
    backgroundColor: '#FFFFFF',
  },
  btnView: {
    width: '100%',
    height: '100%',
    alignItems:'center',
    justifyContent: 'center',
  },
  id_text: {
    fontSize: 16,
    fontFamily:'NotoSansKR-Regular',
    includeFontPadding:false,
    color:'#000000',
  },
  input: {
    height: 48,
    width: 335,
    marginBottom: 10,
    fontSize: 16,
    fontFamily:'NotoSansKR-Regular',
    includeFontPadding:false,
    borderBottomWidth:1,
    borderBottomColor:'#8E8E93',
    paddingLeft:0,
  },
});

export default RegistScreen;

