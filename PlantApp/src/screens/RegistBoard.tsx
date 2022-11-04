import React, {useEffect, useReducer, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, TextInput,Platform, Alert} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomTab from '../components/BottomTab';
import SelectDropdown from 'react-native-select-dropdown';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import { utils } from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore'
import { firebase } from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';


function RegistBoardScreen({navigation,route}: any) {
  const [title,onChangeTitle] = useState('')
  const [underlinecolortitle,setunderlineColorTitle] = useState('#8E8E93')
  const [explanation,onChangeExplanation] = useState('')
  const [ass,setAss] = useState<any>([])
  const [reference,setReference] = useState<any>([])
  const [isShow,setIsShow] = useState(true)
  const emptyImage = ['1','2','3','4','5','6','7','8','9','10']
  const [sunlight,setSunlight] = useState('')
  const [sunlightbad,setSunlightBad] = useState('#FFFFFF')
  const [sunlightbadborder,setSunlightBadBorder] = useState('#8E8E93')
  const [sunlightbadtext,setSunlightBadText] = useState('#8E8E93')
  const [sunlightnormal,setSunlightNormal] = useState('#FFFFFF')
  const [sunlightnormalborder,setSunlightNormalBorder] = useState('#8E8E93')
  const [sunlightnormaltext,setSunlightNormalText] = useState('#8E8E93')
  const [sunlightgood,setSunlightGood] = useState('#FFFFFF')
  const [sunlightgoodborder,setSunlightGoodBorder] = useState('#8E8E93')
  const [sunlightgoodtext,setSunlightGoodText] = useState('#8E8E93')
  const [registcolor,setRegistColor] = useState('#BDE3CE')
  const [Asset,setAsset] = useState<any>([])
  const [down,setDown] = useState<any>([])
  const token:any = firebase.auth().currentUser;

  function setSunlightBadColor(){
    setSunlight('식물 추천')
    setSunlightBad('#16D66F')
    setSunlightBadBorder('#16D66F')
    setSunlightBadText('#FFFFFF')
    setSunlightNormal('#FFFFFF')
    setSunlightNormalBorder('#8E8E93')
    setSunlightNormalText('#8E8E93')
    setSunlightGood('#FFFFFF')
    setSunlightGoodBorder('#8E8E93')
    setSunlightGoodText('#8E8E93')
  }

  function setSunlightNormalColor(){
    setSunlight('식물 양육')
    setSunlightBad('#FFFFFF')
    setSunlightBadBorder('#8E8E93')
    setSunlightBadText('#8E8E93')
    setSunlightNormal('#16D66F')
    setSunlightNormalBorder('#16D66F')
    setSunlightNormalText('#FFFFFF')
    setSunlightGood('#FFFFFF')
    setSunlightGoodBorder('#8E8E93')
    setSunlightGoodText('#8E8E93')
  }

  function setSunlightGoodColor(){
    setSunlight('식물 질병/이상 신호')
    setSunlightBad('#FFFFFF')
    setSunlightBadBorder('#8E8E93')
    setSunlightBadText('#8E8E93')
    setSunlightNormal('#FFFFFF')
    setSunlightNormalBorder('#8E8E93')
    setSunlightNormalText('#8E8E93')
    setSunlightGood('#16D66F')
    setSunlightGoodBorder('#16D66F')
    setSunlightGoodText('#FFFFFF')
  }

  useEffect(()=>{
    if(title === ''){
      setunderlineColorTitle('#8E8E93')
    }
    else{
      setunderlineColorTitle('#16D66F')
    }
  },[title])

  useEffect(() => {
    if(underlinecolortitle === '#16D66F' && sunlight !== '' && explanation !== '' && ass.length >= 1){
      setRegistColor('#16D66F')
    }
    else{
      setRegistColor('#BDE3CE')
    }
  },[underlinecolortitle,sunlight,explanation,ass])

  
  

  const loadImage = () => {
    launchImageLibrary(
      {
      mediaType: 'photo',
      maxWidth:60,
      maxHeight:60,
      includeBase64: Platform.OS === 'android',
      selectionLimit: 10
      },// 여기까지 option
      (res) => {
	      if(res.didCancel) {
	        return null;
	      }
	      if(res.assets){
	        res.assets.map(data => {
            setAsset((Asset:any) => {return [...Asset,data]})
            setAss((ass:any) => {return [...ass,data?.uri]})
          });
          setIsShow(false)
	      }
	    }
    )
  }

  
  const upload = async() =>{
    await Asset.map(async (data:any) => {
      const refer = storage().ref(`${data.fileName}`)
      setReference((reference: any) => {
        return [...reference, refer];
      })
      if (Platform.OS === "android"){
        await refer.putString(data.base64,'base64',{
          contentType: data.type
        });
        console.log('upload')
      }
      else{
        await refer.putFile(data.uri, {
          contentType: data.type
        });
        console.log('upload')
      }
    })
  }

  useEffect(()=> {
    setTimeout(()=> {
      download();
    },5000)
  },[reference])

  function download(){
    reference.map(async (data:any, idx:Number)=> {
      const url = await data?.getDownloadURL()
      setDown((down:any) => {return [...down,url]})
    })
  }

  useEffect(()=> {
    if(reference.length !== 0 && reference.length === down.length){
      regist()
    }
  },[down])

  async function regist(){
    var date = new Date().toISOString().substring(0,19);
    var docname = date + token?.email
    await firestore()
    .collection('게시글')
    .doc(docname)
    .set({
        Category: sunlight,
        Title : title,
        explane : explanation,
        image : down,
        user: await AsyncStorage.getItem('id'),
        time : date,
        like : 0
    })
    .then(()=>{
        navigation.dispatch(CommonActions.reset({routes:[{name:'BoardScreen'}]}))
    })
    

    
  }

  


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
                <Text style={{fontSize:16,fontFamily:'NotoSansKR-Regular', includeFontPadding:false,color:'#000000'}}>게시글 등록</Text>
            </View>
            <View style={{flex: 1.7}}></View>
        </View>
        <View style={{flex:8.3,justifyContent:'center'}}>
            <View style={{width:335,flex:1.6,justifyContent:'center'}}>
                <Text style={{fontSize:18,fontFamily:'NotoSansKR-Bold', includeFontPadding:false,color:'#000000',marginBottom:12}}>카테고리 선택</Text>
                <View style={{flexDirection:'row',marginTop:12}}>
                    <TouchableOpacity 
                    disabled={
                        sunlight === '식물 추천' ? true : false
                    }
                    style={{width:75,
                            height:36,
                            borderWidth:1,
                            borderRadius:999,
                            borderColor:sunlightbadborder,
                            backgroundColor:sunlightbad,
                            justifyContent:'center',
                            alignItems:'center',
                            marginRight:4}}
                    onPress={setSunlightBadColor}>
                    <Text style={{fontSize:12,color:sunlightbadtext,fontFamily:'NotoSansKR-Regular', includeFontPadding:false}}>식물 추천</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    disabled={
                        sunlight === '식물 양육' ? true : false
                    }
                    style={{width:75,
                    height:36,
                    borderWidth:1,
                    borderRadius:999,
                    borderColor:sunlightnormalborder,
                    backgroundColor:sunlightnormal,
                    justifyContent:'center',
                    alignItems:'center',
                    marginLeft:4,
                    marginRight:8}}
                    onPress={setSunlightNormalColor}>
                    <Text style={{fontSize:12,color:sunlightnormaltext,fontFamily:'NotoSansKR-Regular', includeFontPadding:false}}>식물 양육</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    disabled={
                        sunlight === '식물 질병/이상 신호' ? true : false
                    }
                    style={{width:150,
                            height:36,
                            borderWidth:1,
                            borderRadius:999,
                            borderColor:sunlightgoodborder,
                            backgroundColor:sunlightgood,
                            justifyContent:'center',
                            alignItems:'center',
                            marginRight:4}}
                    onPress={setSunlightGoodColor}>
                    <Text style={{fontSize:12,color:sunlightgoodtext,fontFamily:'NotoSansKR-Regular', includeFontPadding:false}}>식물 질병/이상 신호</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{flex:1.2,width: 335}}>
                <Text style={{fontSize:18,fontFamily:'NotoSansKR-Bold', includeFontPadding:false,color:'#000000',marginBottom: 4.5}}>제목</Text>
                <TextInput
                style={{height: 48,
                        width: 335,
                        marginBottom: 8,
                        fontSize: 16,
                        fontFamily:'NotoSansKR-Regular',
                        includeFontPadding:false,
                        borderBottomWidth:1,
                        borderBottomColor:underlinecolortitle,
                        paddingLeft:0}}
                onChangeText={onChangeTitle}
                value={title}
                placeholder="제목을 입력해주세요."
                placeholderTextColor='#8E8E93'
                autoComplete="off"
                autoCapitalize="none"
                clearButtonMode='always'
                />
            </View>
            <View style={{flex:2.8}}>
                <View style={{width:335,height:200,backgroundColor:'#F4F4F4', borderRadius:6,alignItems:'center', justifyContent:'center'}}>
                    <View style={{height: 190,width:315}}>
                    <TextInput
                        style={{fontSize: 14,
                                fontFamily:'NotoSansKR-Regular',
                                includeFontPadding:false,
                                paddingLeft:0,
                                }}
                        multiline={true}
                        onChangeText={onChangeExplanation}
                        value={explanation}
                        placeholder="내용을 입력해주세요."
                        placeholderTextColor='#8E8E93'
                        autoComplete="off"
                        autoCapitalize="none"
                        clearButtonMode='always'
                        />
                    </View>
                </View>
            </View>
            <View style={{width:335,flex:1.8}}>
                <View>
                    <Text style={{fontSize:18,fontFamily:'NotoSansKR-Bold', includeFontPadding:false,color:'#000000',marginBottom: 4.5}}>식물 사진 등록</Text>
                    <ScrollView style={{marginTop:9}} horizontal={true}>
                        <View>
                        <TouchableOpacity style={{height:60,width:60,borderRadius:8,marginRight:5,backgroundColor:'#FFFFFF',borderWidth:1,borderColor:'#16D66F',justifyContent:'center',alignItems:'center'}}
                                            onPress={loadImage}>
                            <Image style={{width:13.5,height:13.5}} source={require('../assets/plus.png')}/>
                        </TouchableOpacity>
                        </View>
                        {isShow ? emptyImage.map((num) => <View key = {num} style={{height:60,width:60,borderRadius:8,backgroundColor:'#F4F4F4',marginRight:5,marginLeft:5}}></View>) : null}
                        {ass.map((data:any) => <Image key={data} style={{height:60,width:60,borderRadius:8,marginRight:5,marginLeft:5}} source={{uri: data}}/>)}
                    </ScrollView>
                </View>
            </View>
        

      </View>
      <View style = {{flex:1, justifyContent:'center'}}>
        <TouchableOpacity 
          disabled={
            underlinecolortitle !== '#16D66F' && sunlight === '' && explanation === '' && ass.length < 1
          }
          style={{height: 48,
          width: 335,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: registcolor,
          borderRadius:6}}
          onPress={upload}>
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
    justifyContent:'center',
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

export default RegistBoardScreen;
