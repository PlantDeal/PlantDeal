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


function RegistSellScreen({navigation,route}: any) {
  const [name,onChangeName] = useState('')
  const [underlinecolorname,setunderlineColorName] = useState('#8E8E93')
  const categories = ["공기정화식물", "다육식물", "허브식물", "선인장", "희귀식물", "기타"]
  const [Category,setCategory] = useState('');
  const [categorycolor,setCategoryColor] = useState('#C6C6C6')
  const [title,onChangeTitle] = useState('')
  const [underlinecolortitle,setunderlineColorTitle] = useState('#8E8E93')
  const [explanation,onChangeExplanation] = useState('')
  const [ass,setAss] = useState<any>([])
  const [reference,setReference] = useState<any>([])
  const [isShow,setIsShow] = useState(true)
  const emptyImage = ['1','2','3','4','5','6','7','8','9','10']
  const waterings = ['1일','3일','5일','1주','2주','3주','1개월']
  const [watering,setWatering] = useState('');
  const [wateringcolor,setWateringColor] = useState('#F4F4F4')
  const amounts = ['촉촉하게','잠기게','건조하게']
  const [amount,setAmount] = useState('');
  const [amountcolor,setAmountColor] = useState('#F4F4F4')
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
  const [price,setPrice] = useState('')
  const [pricecolor,setPriceColor] = useState('#8E8E93')
  const [registcolor,setRegistColor] = useState('#BDE3CE')
  const [Asset,setAsset] = useState<any>([])
  const [down,setDown] = useState<any>([])
  const token:any = firebase.auth().currentUser;
  const {City, Town, Village} = route.params;

  useEffect(()=>{
    if(name === ''){
      setunderlineColorName('#8E8E93')
    }
    else{
      setunderlineColorName('#16D66F')
    }
  },[name])

  useEffect(()=>{
    if(title === ''){
      setunderlineColorTitle('#8E8E93')
    }
    else{
      setunderlineColorTitle('#16D66F')
    }
  },[title])

  useEffect(()=>{
    if(price === ''){
      setPriceColor('#8E8E93')
    }
    else{
      setPriceColor('#16D66F')
    }
  },[price])

  useEffect(() => {
    if(underlinecolorname === '#16D66F' && underlinecolortitle === '#16D66F' 
    && wateringcolor === '#16D66F' && amountcolor !== '#16d66F' && sunlight !== '' && pricecolor === '#16D66F'){
      setRegistColor('#16D66F')
    }
    else{
      setRegistColor('#BDE3CE')
    }
  },[underlinecolorname,underlinecolortitle,wateringcolor,amountcolor,sunlight,pricecolor])
  

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

  function setSunlightBadColor(){
    setSunlight('싫어요')
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
    setSunlight('보통이에요')
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
    setSunlight('좋아요')
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
    await firestore()
    .collection('user')
    .doc(token?.email)
    .collection('판매내역')
    .doc()
    .set({
      name : name,
      Category : Category,
      title : title,
      explane : explanation,
      image : down,
      watering: watering,
      amount : amount,
      sunlight: sunlight,
      price: price,
      time : date
    })
    .then(async() => {
      firestore()
      .collection('sell')
      .doc(City)
      .collection(Town)
      .doc(Village)
      .collection(Category)
      .doc()
      .set({
        name : name,
        Category : Category,
        title : title,
        explane : explanation,
        image : down,
        watering: watering,
        amount : amount,
        sunlight: sunlight,
        price: price,
        user: await AsyncStorage.getItem('id'),
        time : date
      })
      .then(() => {
        navigation.dispatch(CommonActions.navigate('HomeScreen'))
      })
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
            <Text style={{fontSize:16,fontFamily:'NotoSansKR-Regular', includeFontPadding:false,color:'#000000'}}>판매 등록</Text>
        </View>
        <View style={{flex: 1.7}}>
            <TouchableOpacity style={styles.btnView}>
            <Image source={require('../assets/Alarm.png')} />
            </TouchableOpacity>
        </View>
      </View>
      <View style={{flex:7.3,justifyContent:'center'}}>
        <ScrollView>
          <View style={{width:335,height:200, backgroundColor:'#FFFFFF',justifyContent:'center'}}>
            <Text style={{fontSize:18,fontFamily:'NotoSansKR-Bold', includeFontPadding:false,color:'#000000',marginBottom: 4.5}}>식물 이름</Text>
            <TextInput
            style={{height: 48,
                    width: 335,
                    marginBottom: 12,
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
            <View style={{justifyContent:'center',marginTop:12}}>
              <SelectDropdown
              data = {categories}
              onSelect={(selectedItem) => {
                setCategoryColor('#16D66F')
                setCategory(selectedItem)
              }}
              defaultButtonText="카테고리"
              buttonStyle={{borderWidth:1,
                            borderRadius: 999,
                            borderColor: categorycolor,
                            width:335,
                            height: 42,
                            backgroundColor:'#FFFFFF'}}
              buttonTextStyle={{fontSize:14, fontFamily:'NotoSansKR-Regular', includeFontPadding:false,color:'#000000',textAlign:'left',alignItems:'center'}}
              rowTextStyle={{fontSize:14, fontFamily:'NotoSansKR-Regular', includeFontPadding:false,color:'#000000',textAlign:'left'}}
              renderDropdownIcon={isOpend => {
                return <Image  style={{tintColor:categorycolor}} source={isOpend ? require('../assets/uparrow.png') : require('../assets/categoryarrow.png')} />
              }}
              dropdownIconPosition = {'right'}
              dropdownStyle={{backgroundColor:'#FFFFFF'}}
              rowStyle={{borderBottomColor:'#FFFFFF'}}
              dropdownOverlayColor={'(0,0,0)'}//배경 회색 지우기
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem
              }}
              rowTextForSelection={(item, index) => {
                return item
              }}></SelectDropdown>
            </View>
          </View>
          <View style={{width:335,height:240,justifyContent:'center'}}>
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
            <View style={{height:120, backgroundColor:'#F4F4F4', borderRadius:6,marginTop:8,alignItems:'center', justifyContent:'center'}}>
              <View style={{width:311,height:96}}>
                <Text style={{height:21,fontSize:14, fontFamily:'NotoSansKR-Regular', includeFontPadding:false,color:'#000000'}}>특이사항</Text>
                <View style={{height: 75}}>
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
          </View>
          <View style={{width:335,height:140,justifyContent:'center'}}>
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
          <View style={{width:335,height:210,justifyContent:'center'}}>
            <Text style={{fontSize:18,fontFamily:'NotoSansKR-Bold', includeFontPadding:false,color:'#000000',marginBottom: 5}}>식물 양육 정보</Text>
            <View style={{flexDirection:'row',marginTop:5,marginBottom:8}}>
              <View style={{flex:1}}>
                <Text style={{fontSize:12,color:'#8E8E93',fontFamily:'NotoSansKR-Regular', includeFontPadding:false,marginBottom:5}}>물 주기 간격</Text>
                <SelectDropdown
                  data = {waterings}
                  onSelect={(selectedItem) => {
                    setWateringColor('#16D66F')
                    setWatering(selectedItem)
                  }}
                  defaultButtonText="물주기"
                  buttonStyle={{borderWidth:1,
                                borderRadius: 999,
                                borderColor: wateringcolor,
                                width:130,
                                height: 38,
                                backgroundColor:'#FFFFFF',
                                marginTop:5}}
                  buttonTextStyle={{fontSize:14, fontFamily:'NotoSansKR-Regular', includeFontPadding:false,color:'#8E8E93',textAlign:'left',alignItems:'center'}}
                  rowTextStyle={{fontSize:14, fontFamily:'NotoSansKR-Regular', includeFontPadding:false,color:'#8E8E93',textAlign:'left'}}
                  renderDropdownIcon={isOpend => {
                    return <Image  style={{tintColor:wateringcolor}} source={isOpend ? require('../assets/uparrow.png') : require('../assets/categoryarrow.png')} />
                  }}
                  dropdownIconPosition = {'right'}
                  dropdownStyle={{backgroundColor:'#FFFFFF'}}
                  rowStyle={{borderBottomColor:'#FFFFFF'}}
                  dropdownOverlayColor={'(0,0,0)'}//배경 회색 지우기
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem
                  }}
                  rowTextForSelection={(item, index) => {
                    return item
                }}></SelectDropdown>
              </View>
              <View style={{flex:1}}>
                <Text style={{fontSize:12,color:'#8E8E93',fontFamily:'NotoSansKR-Regular', includeFontPadding:false,marginBottom:5}}>물 주는 양</Text>
                <SelectDropdown
                  data = {amounts}
                  onSelect={(selectedItem) => {
                    setAmountColor('#16D66F')
                    setAmount(selectedItem)
                  }}
                  defaultButtonText="물주는양"
                  buttonStyle={{borderWidth:1,
                                borderRadius: 999,
                                borderColor: amountcolor,
                                width:130,
                                height: 38,
                                backgroundColor:'#FFFFFF',
                                marginTop:5}}
                  buttonTextStyle={{fontSize:14, fontFamily:'NotoSansKR-Regular', includeFontPadding:false,color:'#8E8E93',textAlign:'left',alignItems:'center'}}
                  rowTextStyle={{fontSize:14, fontFamily:'NotoSansKR-Regular', includeFontPadding:false,color:'#8E8E93',textAlign:'left'}}
                  renderDropdownIcon={isOpend => {
                    return <Image  style={{tintColor:amountcolor}} source={isOpend ? require('../assets/uparrow.png') : require('../assets/categoryarrow.png')} />
                  }}
                  dropdownIconPosition = {'right'}
                  dropdownStyle={{backgroundColor:'#FFFFFF'}}
                  rowStyle={{borderBottomColor:'#FFFFFF'}}
                  dropdownOverlayColor={'(0,0,0)'}//배경 회색 지우기
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem
                  }}
                  rowTextForSelection={(item, index) => {
                    return item
                }}></SelectDropdown>
              </View>
            </View>
            <View style={{marginTop:8}}>
              <Text style={{fontSize:12,color:'#8E8E93',fontFamily:'NotoSansKR-Regular', includeFontPadding:false,marginBottom:5}}>햇빛</Text>
              <View style={{flexDirection:'row',marginTop:5}}>
                <TouchableOpacity 
                  disabled={
                    sunlight === '싫어요' ? true : false
                  }
                  style={{width:58,
                          height:36,
                          borderWidth:1,
                          borderRadius:999,
                          borderColor:sunlightbadborder,
                          backgroundColor:sunlightbad,
                          justifyContent:'center',
                          alignItems:'center',
                          marginRight:4}}
                  onPress={setSunlightBadColor}>
                  <Text style={{fontSize:12,color:sunlightbadtext,fontFamily:'NotoSansKR-Regular', includeFontPadding:false}}>싫어요</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  disabled={
                    sunlight === '보통이에요' ? true : false
                  }
                  style={{width:80,
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
                  <Text style={{fontSize:12,color:sunlightnormaltext,fontFamily:'NotoSansKR-Regular', includeFontPadding:false}}>보통이에요</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  disabled={
                    sunlight === '좋아요' ? true : false
                  }
                  style={{width:58,
                          height:36,
                          borderWidth:1,
                          borderRadius:999,
                          borderColor:sunlightgoodborder,
                          backgroundColor:sunlightgood,
                          justifyContent:'center',
                          alignItems:'center',
                          marginRight:4}}
                  onPress={setSunlightGoodColor}>
                  <Text style={{fontSize:12,color:sunlightgoodtext,fontFamily:'NotoSansKR-Regular', includeFontPadding:false}}>좋아요</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{width:335,height:125,justifyContent:'center'}}>
            <Text style={{fontSize:18,fontFamily:'NotoSansKR-Bold', includeFontPadding:false,color:'#000000',marginBottom: 5}}>식물 가격</Text>
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
              onChangeText={setPrice}
              value={price}
              placeholder="식물 가격을 정해주세요."
              placeholderTextColor='#8E8E93'
              autoComplete="off"
              autoCapitalize="none"
              clearButtonMode='always'
              />
            <Text style={{fontSize:12,fontFamily:'NotoSansKR-Regular', includeFontPadding:false,color:'#16D66F'}}>현재 평균 가격 - 00,000원</Text>
          </View>

        </ScrollView>
      </View>
      <View style = {{flex:1, justifyContent:'center'}}>
        <TouchableOpacity 
          disabled={
            underlinecolorname === '#16D66F' && underlinecolortitle === '#16D66F' 
    && wateringcolor === '#16D66F' && amountcolor !== '#16d66F' && sunlight !== '' && pricecolor === '#16D66F' ? false : true
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

export default RegistSellScreen;
