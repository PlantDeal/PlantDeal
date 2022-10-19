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
} from 'react-native';
import BottomTab from '../components/BottomTab';
import ProfileHeaderBar from '../components/ProfileHeaderBar';
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/firestore';
import { FirebaseStorageTypes } from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage';

function ProfileScreen({navigation}: any) {
  const [name,setName] = useState<any>('')
  

  useEffect(() => {
    load();
    
  },[])

  async function load(){
    setName(await AsyncStorage.getItem('name'))
    
  }
  



  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <ProfileHeaderBar style={{flex: 0.5}} headerTitle={'마이페이지'} navigation={navigation}/>
      <View style={{flex:8.5}}>
        <View style={{flex:0.5 ,backgroundColor:'#FFFFFF',flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
          <TouchableOpacity onPress={()=> navigation.navigate('UpdateProfileScreen')}>
            <Text style={{fontFamily:'NotoSansKR-Regular', 
                          includeFontPadding:false,
                          color:'#C6C6C6',
                          fontSize:12,marginRight:5}}>프로필 편집</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{fontFamily:'NotoSansKR-Regular', 
                          includeFontPadding:false,
                          color:'#C6C6C6',
                          fontSize:12,marginLeft:5,marginRight:10}}>로그아웃</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex:2.4,alignItems:'center',justifyContent:'center'}}>
          <TouchableOpacity style={{marginBottom:4}}>
            <Image style={{width:96,height:96}} source={require('../assets/TempProfileImage.png')} />
          </TouchableOpacity>
          <Text style={{fontFamily:'NotoSansKR-Bold', 
                          includeFontPadding:false,
                          color:'#000000',
                          fontSize:18,marginTop:4}}>{name}</Text>
        </View>
        <View style={{flex:1.5,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
          <TouchableOpacity style={{width:79,height:78, backgroundColor:'#FFFFFF',marginRight:12,alignItems:'center',justifyContent:'center'}} onPress={() => navigation.navigate('SellListScreen')}>
            <Image style={{width:24,height:24, marginBottom:5}} source={require('../assets/BuyLog.png')} />
            <Text style={{marginTop:5,fontFamily:'NotoSansKR-Medium', 
                          includeFontPadding:false,
                          color:'#000000',
                          fontSize:12}}>거래 내역</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{width:79,height:78, backgroundColor:'#FFFFFF',marginLeft:12,marginRight:12,alignItems:'center',justifyContent:'center'}}>
            <Image style={{width:24,height:24, marginBottom:5}} source={require('../assets/soldLog.png')} />
            <Text style={{marginTop:5,fontFamily:'NotoSansKR-Medium', 
                          includeFontPadding:false,
                          color:'#000000',
                          fontSize:12}}>경매 내역</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('AttentionScreen')} style={{width:79,height:78, backgroundColor:'#FFFFFF',marginLeft:12,alignItems:'center',justifyContent:'center'}}>
            <Image style={{width:24,height:24,marginBottom:5}} source={require('../assets/Hart.png')} />
            <Text style={{marginTop:5,fontFamily:'NotoSansKR-Medium', 
                          includeFontPadding:false,
                          color:'#000000',
                          fontSize:12}}>관심 목록</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex:0.6,backgroundColor:'#E4E4E4'}}>

        </View>
        <View style={{flex:2,width:'100%',justifyContent:'center'}}>
          <TouchableOpacity style={{height:42 ,justifyContent:'center'}} onPress={() => navigation.navigate('SellListScreen')}>
            <View style={{flexDirection:'row'}}>
              <View style={{flex:2.2,alignItems:'center'}}>
                <Text style={{fontFamily:'NotoSansKR-Regular', 
                            includeFontPadding:false,
                            color:'#000000',
                            fontSize:14,marginLeft:20}}>거래내역</Text>
              </View>
              <View style={{flex:6.1}}>

              </View>
              <View style={{flex:1.6,alignItems:'center'}}>
                <Image style={{width:18,height:18}} source={require('../assets/Arrow.png')} />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{height:42 ,justifyContent:'center'}}>
            <View style={{flexDirection:'row'}}>
              <View style={{flex:2.2,alignItems:'center'}}>
                <Text style={{fontFamily:'NotoSansKR-Regular', 
                            includeFontPadding:false,
                            color:'#000000',
                            fontSize:14,marginLeft:20}}>경매내역</Text>
              </View>
              <View style={{flex:6.1}}>

              </View>
              <View style={{flex:1.6,alignItems:'center'}}>
                <Image style={{width:18,height:18}} source={require('../assets/Arrow.png')} />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('AttentionScreen')} style={{height:42 ,justifyContent:'center'}}>
            <View style={{flexDirection:'row'}}>
              <View style={{flex:2.2,alignItems:'center'}}>
                <Text style={{fontFamily:'NotoSansKR-Regular', 
                            includeFontPadding:false,
                            color:'#000000',
                            fontSize:14,marginLeft:20}}>관심목록</Text>
              </View>
              <View style={{flex:6.1}}>

              </View>
              <View style={{flex:1.6,alignItems:'center'}}>
                <Image style={{width:18,height:18}} source={require('../assets/Arrow.png')} />
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flex:2.8,backgroundColor:'#E4E4E4'}}>

        </View>
      </View>
      <BottomTab style={{flex: 0.9}} navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFFFFF',
  },
  

});

export default ProfileScreen;