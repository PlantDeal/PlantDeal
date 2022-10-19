import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  TouchableOpacity,
  TextInput,
  Modal
} from 'react-native';
import ProfileHeaderBar from '../components/ProfileHeaderBar';
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/firestore';
import { FirebaseStorageTypes } from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Postcode from '@actbase/react-daum-postcode';

function UpdateProfileScreen({navigation}: any) {
  const [name,setName] = useState<any>('')
  const [underlinecolorname,onChangeUnderlineColorName] = useState('#16D66F');
  const [Pnum,setPnum] = useState<any>('');
  const [underlinecolorPnum,onChangeUnderlineColorPnum] = useState('#16D66F');
  const [isModalVisible, setModalVisible] = useState(false);
  const [address,onChangeAddress] = useState<any>('');
  const [underlinecoloraddress,onChangeUnderlineColorAddress] = useState('#16D66F');
  const [subaddress,onChangeSubAddress] = useState<any>('');
  const [underlinecolorsubaddress,onChangeUnderlineColorSubAddress] = useState('#16D66F');
  

  useEffect(() => {
    load();
    
  },[])

  async function load(){
    setName(await AsyncStorage.getItem('name'))
    onChangeAddress(await AsyncStorage.getItem('address'))
    onChangeSubAddress(await AsyncStorage.getItem('subaddress'))
  }

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  }
  
  // 업데이트시 로컬 저장소 데이터도 업데이트 해야함!!



  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <ProfileHeaderBar style={{flex: 0.6}} headerTitle={'마이페이지'} navigation={navigation}/>
      <View style={{flex:8.5, alignItems:'center'}}>
        <View style={{flex:2.4,alignItems:'center',justifyContent:'center'}}>
          <TouchableOpacity style={{marginBottom:6}}>
            <Image style={{width:96,height:96}} source={require('../assets/TempProfileImage.png')} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{fontFamily:'NotoSansKR-Regular', 
                          includeFontPadding:false,
                          color:'#16D66F',
                          fontSize:10,marginTop:6}}>프로필 사진 바꾸기</Text>
          </TouchableOpacity>
        </View>
        <View style= {{flex: 1.5, justifyContent:'center',alignItems:'center', width:335}}>
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
                onChangeText={setName}
                value={name}
                placeholder="이름을 입력해주세요."
                placeholderTextColor='#8E8E93'
                autoComplete="off"
                autoCapitalize="none"
                clearButtonMode='always'
                />
            </View>
        </View>
        <View style= {{flex: 1.5, justifyContent:'center',alignItems:'center', width:335}}>
            <Text style={styles.id_text}>전화번호</Text>
            <View>
                <TextInput
                style={{height: 48,
                        width: 335,
                        marginBottom: 10,
                        fontSize: 16,
                        fontFamily:'NotoSansKR-Regular',
                        includeFontPadding:false,
                        borderBottomWidth:1,
                        borderBottomColor:underlinecolorPnum,
                        paddingLeft:0}}
                onChangeText={setPnum}
                value={Pnum}
                placeholderTextColor='#8E8E93'
                autoComplete="off"
                autoCapitalize="none"
                clearButtonMode='always'
                />
            </View>
        </View>
        <View style={{flex:2.5,justifyContent:'center',width:335}}>
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
        <View style={{flex:1.5,width:'100%',justifyContent:'center'}}>
          
        </View>
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
    width: '100%',
    backgroundColor: '#FFFFFF',
  },
  id_text: {
    fontSize:14,
    fontFamily:'NotoSansKR-Regular', 
    includeFontPadding:false,
    color:'#8E8E93',
    alignSelf:'flex-start'
  }
  ,
  btnView: {
    width: '100%',
    height: '100%',
    alignItems:'center',
    justifyContent: 'center',
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

export default UpdateProfileScreen;