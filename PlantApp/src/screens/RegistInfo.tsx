import React, {useState,useEffect} from 'react';
import {View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, TextInput, Modal} from 'react-native';
import Postcode from '@actbase/react-daum-postcode';
import firestore from '@react-native-firebase/firestore';


function RegistInfoScreen({navigation,route}: any) {
  const [name, onChangeName] = useState('');
  const [underlinecolorname,onChangeUnderlineColorName] = useState('#8E8E93');
  const [birth, onChangeBirth] = useState('');
  const [underlinecolorbirth,onChangeUnderlineColorBirth] = useState('#8E8E93');
  const [nickname, onChangeNickName] = useState('');
  const [underlinecolornickname,onChangeUnderlineColorNickName] = useState('#8E8E93');
  const [loginColor, onChangeLoginColor] = useState('#BDE3CE');
  const [isModalVisible, setModalVisible] = useState(false);
  const [address,onChangeAddress] = useState('');
  const [underlinecoloraddress,onChangeUnderlineColorAddress] = useState('#8E8E93');
  const [subaddress,onChangeSubAddress] = useState('');
  const [underlinecolorsubaddress,onChangeUnderlineColorSubAddress] = useState('#8E8E93');
  const [gender,onChangeGender] = useState('');
  const [malecolor, onChangeMaleColor] = useState('#FFFFFF');
  const [malebordercolor, onChangeMaleBorderColor] = useState('#8E8E93');
  const [maletextcolor, onChangeMaleTextColor] = useState('#8E8E93');
  const [femalecolor, onChangeFemaleColor] = useState('#FFFFFF');
  const [femalebordercolor, onChangeFemaleBorderColor] = useState('#8E8E93');
  const [femaletextcolor, onChangeFemaleTextColor] = useState('#8E8E93');

  const birthcheck = /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/

  useEffect(()=>{
    if(name === ''){
      onChangeUnderlineColorName('#8E8E93')
    }
    else{
      onChangeUnderlineColorName('#16D66F')
    }
  },[name])

  useEffect(()=>{
    if(birth === ''){
      onChangeUnderlineColorBirth('#8E8E93')
    }
    else if(birthcheck.test(birth)){
      onChangeUnderlineColorBirth('#16D66F')
    }
    else{
      onChangeUnderlineColorBirth('#DA1E28')
    }
  },[birth])

  useEffect(()=>{
    if(nickname === ''){
      onChangeUnderlineColorNickName('#8E8E93')
    }
    else{
      onChangeUnderlineColorNickName('#16D66F')
    }
  },[nickname])

  useEffect(()=>{
    if(address === ''){
      onChangeUnderlineColorAddress('#8E8E93')
    }
    else{
      onChangeUnderlineColorAddress('#16D66F')
    }
  },[address])

  useEffect(()=>{
    if(subaddress === ''){
      onChangeUnderlineColorSubAddress('#8E8E93')
    }
    else{
      onChangeUnderlineColorSubAddress('#16D66F')
    }
  },[subaddress])

  useEffect(() => {
    if(underlinecolorname === '#16D66F' && underlinecolorbirth === '#16D66F' && underlinecolornickname === '#16D66F' 
    && underlinecoloraddress === '#16D66F' && underlinecolorsubaddress === '#16D66F' 
    && (malebordercolor === '#16D66F' || femalebordercolor === '#16D66F')){
      onChangeLoginColor('#16D66F')
    }
    else{
      onChangeLoginColor('#BDE3CE')
    }
  },[name,birth,nickname,address,subaddress,gender])


  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  }

  const toggleGenderMale = () => {
    onChangeGender('남자')
    onChangeMaleColor('#16D66F')
    onChangeMaleBorderColor('#16D66F')
    onChangeMaleTextColor('#FFFFFF')
    onChangeFemaleColor('#FFFFFF')
    onChangeFemaleBorderColor('#8E8E93')
    onChangeFemaleTextColor('#8E8E93')
  }

  const toggleGenderFemale = () => {
    onChangeGender('여자')
    onChangeFemaleColor('#16D66F')
    onChangeFemaleBorderColor('#16D66F')
    onChangeFemaleTextColor('#FFFFFF')
    onChangeMaleColor('#FFFFFF')
    onChangeMaleBorderColor('#8E8E93')
    onChangeMaleTextColor('#8E8E93')
  }
  async function completeRegist(){
    await firestore()
    .collection('user')
    .doc(route.params.id)
    .set({
      name : name,
      birth : birth,
      gender : gender,
      nickname : nickname,
      address : address,
      subaddress : subaddress
    })
    .then(() => {
      navigation.navigate('CompleteRegistScreen')
    })
  }

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <View style={{flex: 0.7, flexDirection:'row'}}>
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
        <Text style={{fontSize:24,fontFamily:'NotoSansKR-Bold',includeFontPadding:false,color:'#000000'}}>간단 정보를 알려주세요.</Text>
      </View>
      <View style= {{flex: 1.8, justifyContent:'center',width:335}}>
        <Text style={styles.id_text}>이름</Text>
        <View>
          <TextInput
            style={{height: 48,
                    width: 335,
                    marginBottom: 10,
                    fontSize: 16,
                    fontFamily:'NotoSansKR-Regular',
                    includeFontPadding:false,
                    borderBottomWidth:1,
                    borderBottomColor:underlinecolorname,
                    paddingLeft:0}}
            onChangeText={onChangeName}
            value={name}
            placeholder="이름을 입력해주세요."
            placeholderTextColor='#8E8E93'
            autoComplete="off"
            autoCapitalize="none"
            clearButtonMode='always'
          />
        </View>
      </View>
      <View style={{flex:5.5}}>
        <View style={{flex:2.8, flexDirection:'row',width:335}}>
          <View style={{flex:1,justifyContent:'center'}}>
            <Text style={styles.id_text}>생년월일</Text>
              <View>
                <TextInput
                  style={{height: 48,
                          width: 160,
                          marginBottom: 10,
                          fontSize: 16,
                          fontFamily:'NotoSansKR-Regular',
                          includeFontPadding:false,
                          borderBottomWidth:1,
                          borderBottomColor:underlinecolorbirth,
                          paddingLeft:0}}
                  onChangeText={onChangeBirth}
                  value={birth}
                  placeholder="YYYYXXZZ"
                  placeholderTextColor='#8E8E93'
                  autoComplete="off"
                  autoCapitalize="none"
                  clearButtonMode='always'
              />
            </View>
          </View>
          <View style={{flex:1,justifyContent:'center'}}>
            <Text style={styles.id_text}>성별</Text>
            <View style={{height: 48,marginBottom: 10,flexDirection:'row'}}>
              <View style={{flex:1.1,alignItems:'center',justifyContent:'flex-end'}}>
                <TouchableOpacity 
                                  disabled ={
                                    gender === '남자' ? true : false
                                  }
                                  style={{height:36,
                                          width:51,
                                          alignItems:'center',
                                          justifyContent:'center',
                                          borderWidth:1,
                                          borderRadius:999,
                                          borderColor:malebordercolor,
                                          backgroundColor: malecolor}} 
                                  onPress={toggleGenderMale}>
                  <Text style={{fontSize:12,
                                color:maletextcolor,
                                fontFamily:'NotoSansKR-Regular',
                                includeFontPadding:false}}>남자</Text>
                </TouchableOpacity>
              </View>
              <View style={{flex:1.1,alignItems:'center',justifyContent:'flex-end'}}>
                <TouchableOpacity 
                                  disabled ={
                                    gender === '여자' ? true : false
                                  }
                                  style={{height:36,
                                          width:51,
                                          alignItems:'center',
                                          justifyContent:'center',
                                          borderWidth:1,
                                          borderRadius:999,
                                          borderColor:femalebordercolor,
                                          backgroundColor: femalecolor}}
                                  onPress={toggleGenderFemale}>
                  <Text style={{fontSize:12,
                                color:femaletextcolor,
                                fontFamily:'NotoSansKR-Regular',
                                includeFontPadding:false}}>여자</Text>
                </TouchableOpacity>
              </View>
              <View style={{flex:0.8}}>
              </View>
            </View>
          </View>
          
        </View>
        <View style={{flex:2.8,justifyContent:'center'}}>
          <Text style={styles.id_text}>닉네임</Text>
          <View>
            <TextInput
              style={{height: 48,
                      width: 335,
                      fontSize: 16,
                      fontFamily:'NotoSansKR-Regular',
                      includeFontPadding:false,
                      borderBottomWidth:1,
                      borderBottomColor:underlinecolornickname,
                      paddingLeft:0}}
              onChangeText={onChangeNickName}
              value={nickname}
              placeholder="사용하실 닉네임을 입력해주세요."
              placeholderTextColor='#8E8E93'
              autoComplete="off"
              autoCapitalize="none"
              clearButtonMode='always'
            />
          </View>
        </View>
        <View style={{flex:4.3,justifyContent:'center'}}>
          <Text style={styles.id_text}>주소</Text>
          <View style={{flexDirection:'row'}}>
            <View style={{flex:7.5}}>
              <TextInput
                style={{height: 48,
                        width: 250,
                        fontSize: 16,
                        fontFamily:'NotoSansKR-Regular',
                        includeFontPadding:false,
                        borderBottomWidth:1,
                        borderBottomColor:underlinecoloraddress,
                        paddingLeft:0}}
                value={address}
                placeholder="주소를 입력해주세요"
                placeholderTextColor='#8E8E93'
                autoComplete="off"
                autoCapitalize="none"
                clearButtonMode='always'
              />
            </View>
            <View style={{flex:0.4}}></View>
            <View style={{flex:2,alignItems:'center',justifyContent:'center'}}>
              <TouchableOpacity style={styles.addressbox} onPress={toggleModal}>
                <Text style={styles.addressText}>주소 검색</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <TextInput
              style={{height: 48,
                      width: 250,
                      marginBottom: 10,
                      fontSize: 16,
                      fontFamily:'NotoSansKR-Regular',
                      includeFontPadding:false,
                      borderBottomWidth:1,
                      borderBottomColor:underlinecolorsubaddress,
                      paddingLeft:0}}
              onChangeText={onChangeSubAddress}
              value={subaddress}
              placeholder="상세주소를 입력해주세요"
              placeholderTextColor='#8E8E93'
              autoComplete="off"
              autoCapitalize="none"
              clearButtonMode='always'
            />
          </View>
        </View>
      </View>
      <View style={{flex:1,justifyContent:'center'}}>
        <TouchableOpacity 
          disabled ={
            underlinecolorname === '#16D66F' && underlinecolorbirth === '#16D66F' && underlinecolornickname === '#16D66F' 
            && underlinecoloraddress === '#16D66F' && underlinecolorsubaddress === '#16D66F' 
            && (malebordercolor === '#16D66F' || femalebordercolor === '#16D66F') ? false : true
          }
          onPress ={completeRegist}
          style={{height: 48,
                  width: 335,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 10,
                  borderRadius:6,
                  backgroundColor: loginColor}}>
            <Text style={{color: 'white', fontSize:16, fontFamily:'NotoSansKR-Bold',includeFontPadding:false}}>회원가입 완료</Text>
          </TouchableOpacity>
      </View>
      <View>
        <Modal visible={isModalVisible}>
          <SafeAreaView style={{flex: 0.7, flexDirection:'row'}}>
              <View style={{flex: 2.0}}>
              <TouchableOpacity
                  style={styles.btnView}
                  onPress={toggleModal}>
                  <Image source={require('../assets/BackBtn.png')} />
              </TouchableOpacity>
              </View>
              <View style={{flex:6.5}}></View>
              <View style={{flex: 1.7}}></View>
          </SafeAreaView>
          <View style={{flex:9.3}}>
            <View style={styles.SafeAreaView}>
              <View style={{flex:9.3, alignItems:'center'}}>
                  <Postcode
                      style={{ width: 375, height:'100%' }}
                      jsOptions={{ animation: true }}
                      onSelected={data => {setModalVisible(false);
                        onChangeAddress(data.address)
                      }}
                      onError={function (error: unknown): void {
                          throw new Error('Function not implemented.');
                      }}/>
              </View>
            </View>
          </View>
        </Modal>
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
  radiobox:{
    height:36,
    width:51,
    alignItems:'center',
    justifyContent:'center',
    borderWidth:1,
    borderRadius:999,
    borderColor:'#8E8E93',
    backgroundColor: '#FFFFFF'
  },
  radioText:{
    fontSize:12,
    color:'#8E8E93',
    fontFamily:'NotoSansKR-Regular',
    includeFontPadding:false,
  },
  addressbox:{
    height:36,
    width:67,
    alignItems:'center',
    justifyContent:'center',
    borderWidth:1,
    borderRadius:999,
    borderColor:'#16D66F'
  },
  addressText:{
    fontSize:12,
    color:'#16D66F',
    fontFamily:'NotoSansKR-Regular',
    includeFontPadding:false,
  },
  
  
});

export default RegistInfoScreen;

