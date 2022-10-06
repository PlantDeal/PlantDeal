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
  const {amount, explane,image,name,price,sunlight,title,watering,category,town,village} = route.params;

  console.log(image.length)

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <View style={{flex: 0.7, flexDirection:'row', borderBottomColor:'#F4F4F4',borderBottomWidth:1}}>
        <View style={{flex: 1.6}}>
          <TouchableOpacity
            style={styles.btnView}
            onPress={() => navigation.goBack()}>
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
            <View style ={{height:100, width:Width, backgroundColor:'#FFFFFF'}}>
              <Text style={{fontSize: 24,
                        fontFamily: 'NotoSansKR-Bold',
                        includeFontPadding: false,
                        color: '#000000',
                        }}>{title}</Text>
              <Text>{category} {town}구 {village}동</Text>
            </View>
            <View style ={{height:160, width:Width, backgroundColor:'yellow'}}>

            </View>
            <View style ={{height:180, width:Width, backgroundColor:'grey'}}>

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
          <Text style={{color: 'white', fontSize:16, fontFamily:'NotoSansKR-Bold'}}>등록하기</Text>
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
