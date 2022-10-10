import React, {useEffect, useReducer, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, TextInput,Platform, Alert,Dimensions} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomTab from '../components/BottomTab';
import SelectDropdown from 'react-native-select-dropdown';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import { utils } from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore'
import { firebase } from '@react-native-firebase/firestore';



function DetailScreen({navigation,route}: any) {
  const Width = Dimensions.get('window').width;
  const token:any = firebase.auth().currentUser;
  const {amount, explane,image,name,price,sunlight,title,watering,category,town,village,user} = route.params;
  const [nickname,setNickname] = useState('')

  useEffect(()=>{
    firestore().
    collection('user')
    .doc(user)
    .get()
    .then(async documentSnapshot => {
     const nName:any = await documentSnapshot.get('nickname')
     setNickname(nName);
    });
  },[])

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <View style={{flex: 0.7, flexDirection:'row', borderBottomColor:'#F4F4F4',borderBottomWidth:1}}>
        <View style={{flex: 1.6}}>
          <TouchableOpacity
            style={styles.btnView}
            onPress={() => navigation.pop()}>
            <Image source={require('../assets/BackBtn.png')} />
          </TouchableOpacity>
        </View>
        <View style={{flex:6.6, alignItems:'center',justifyContent:'center'}}>
            <Text style={{fontSize:16,fontFamily:'NotoSansKR-Regular', includeFontPadding:false,color:'#000000'}}>제품 상세</Text>
        </View>
        <View style={{flex: 1.7}}>
            <TouchableOpacity style={styles.btnView}>
            <Image source={require('../assets/Alarm.png')} />
            </TouchableOpacity>
        </View>
      </View>
      <View style={{flex:7.3,justifyContent:'center'}}>
        <ScrollView>
            <View style ={{height:220, width:Width}}>
              <ScrollView horizontal={true} pagingEnabled={true} showsHorizontalScrollIndicator={false}>
                {image.map((data:any) => <Image key={data} style={{height:220,width:Width}} source={{uri: data}} resizeMode="stretch"/>)}
              </ScrollView>
            </View>
            <View style={{alignItems:'center'}}>
              <View style ={{height:100, width:335, backgroundColor:'#FFFFFF', justifyContent:'center'}}>
                <Text style={{fontSize: 24,
                          fontFamily: 'NotoSansKR-Bold',
                          includeFontPadding: false,
                          color: '#000000',marginBottom:5
                          }}>{name}</Text>
                <Text style={{fontSize: 12,
                          fontFamily: 'NotoSansKR-Medium',
                          includeFontPadding: false,
                          color: '#8E8E93',marginTop:5
                          }}>{category} {town}구 {village}동 {nickname} </Text>
              </View>
              <View style ={{height:150, width:335, backgroundColor:'#FFFFFF',justifyContent:'center'}}>
                <View style={{height: 40, justifyContent:'center',}}>
                  <Text style={{fontSize: 14,
                          fontFamily: 'NotoSansKR-Regular',
                          includeFontPadding: false,
                          color: '#16D66F'
                          }}>특이사항</Text>
                </View>
                <View style={{height:60,}}>
                  <Text style={{fontSize: 14,
                          fontFamily: 'NotoSansKR-Regular',
                          includeFontPadding: false,
                          color: '#000000',marginTop:9
                          }}>{explane}</Text>
                </View>
                <View style={{height:50}}>
                  <Text style={{color:'red'}}>조회 업데이트 예정</Text>
                </View>
                
              </View>
              <View style ={{height:180, width:335}}>
                <Text style={{fontSize: 18,
                          fontFamily: 'NotoSansKR-Bold',
                          includeFontPadding: false,
                          color: '#000000',marginBottom:12}}>꼭 확인해주세요!</Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginTop:12}}>
                  <View style={{height:82,width:107,borderRadius:8,borderColor:'#16D66F',backgroundColor:'#48484A',borderWidth:1,marginRight:4,alignItems:'center',justifyContent:'center'}}>
                    <Text style={{fontSize: 10,
                          fontFamily: 'NotoSansKR-Regular',
                          includeFontPadding: false,
                          color: '#FFFFFF',marginBottom:3}}>물 주기 간격</Text>
                    <Text style={{fontSize: 18,
                          fontFamily: 'NotoSansKR-Bold',
                          includeFontPadding: false,
                          color: '#16D66F',marginTop:3}}>{watering}</Text>
                  </View>
                  <View style={{height:82,width:107,borderRadius:8,borderColor:'#16D66F',backgroundColor:'#48484A',borderWidth:1,marginLeft:4,marginRight:4,alignItems:'center',justifyContent:'center'}}>
                    <Text style={{fontSize: 10,
                          fontFamily: 'NotoSansKR-Regular',
                          includeFontPadding: false,
                          color: '#FFFFFF',marginBottom:3}}>물 주기 양</Text>
                    <Text style={{fontSize: 18,
                          fontFamily: 'NotoSansKR-Bold',
                          includeFontPadding: false,
                          color: '#16D66F',marginTop:3}}>{amount}</Text>
                  </View>
                  <View style={{height:82,width:107,borderRadius:8,borderColor:'#16D66F',backgroundColor:'#48484A',borderWidth:1,marginLeft:4,alignItems:'center',justifyContent:'center'}}>
                    <Text style={{fontSize: 10,
                          fontFamily: 'NotoSansKR-Regular',
                          includeFontPadding: false,
                          color: '#FFFFFF',marginBottom:3}}>햇빛</Text>
                    <Text style={{fontSize: 18,
                          fontFamily: 'NotoSansKR-Bold',
                          includeFontPadding: false,
                          color: '#16D66F',marginTop:3}}>{sunlight}</Text>
                  </View>
                </ScrollView>
              </View>
            </View>
            
          

        </ScrollView>
      </View>
      <View style = {{flex:1, justifyContent:'center'}}>
        <TouchableOpacity 
          
          style={{height: 48,
          width: 335,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor:'#16D66F',
          borderRadius:6}}
>
          <Text style={{color: 'white', fontSize:16, fontFamily:'NotoSansKR-Bold'}}>채팅하기</Text>
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
  category:{
    borderWidth:1,
    borderRadius: 999,
    borderColor: '#C6C6C6',
    width:335,
    height: 42,
  },
  sellbox: {
    height: 48,
    width: 335,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#16D66F',
    borderRadius:6
  },
  flatbox: {
    height: 116,
    width:335,
    justifyContent:'center'
  },
  imagebox: {
    height: 72,
    width: 72,
  },
  radiobox: {
    width:58,
    height:36,
    borderWidth:1,
    borderRadius:999,
    borderColor:'#8E8E93',
    backgroundColor:'#FFFFFF',
    justifyContent:'center',
    alignItems:'center',
    marginRight:4
  }
})

export default DetailScreen;