import React, { useEffect, useState } from 'react';
import {View, Text, SafeAreaView, StyleSheet,TouchableOpacity,Image,Dimensions,FlatList} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/firestore';



function AttentionScreen({navigation}: any) {
    const [buy,setBuy] = useState('#16D66F')
    const [buyBot,setbuyBot] = useState('#16D66F')
    const [sell,setSell] = useState('#C6C6C6')
    const [settBot,setsellBot] = useState('#F4F4F4')
    const Width = Dimensions.get('window').width;
    const token:any = firebase.auth().currentUser;
    const [user,setuser] = useState<any>()
    const [DataSell,setData] = useState<any>(null);


    function loadSell(){
        firestore()
        .collection('user')
        .doc(token?.email)
        .collection('관심목록')
        .onSnapshot(async querySnapshot => {
            const data: {key: string}[] = [];
            querySnapshot.forEach(documentSnapshot => {
              data.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
              });
            });
            setData(data);
        });
    }
    function elapsedTime(date:any) {
      const start:any = new Date(date);
      const end:any = new Date(); 
      const diff = (end - start);
      const times = [
        {time: "분", milliSeconds: 1000 * 60},
        {time: "시간", milliSeconds: 1000 * 60 * 60},
        {time: "일", milliSeconds: 1000 * 60 * 60 * 24},
        {time: "개월", milliSeconds: 1000 * 60 * 60 * 24 * 30},
        {time: "년", milliSeconds: 1000 * 60 * 60 * 24 * 365},
      ].reverse();
      for (const value of times) {
        const betweenTime = Math.floor(diff / value.milliSeconds);
  
        if (betweenTime > 0) {
          return `${betweenTime}${value.time} 전`;
        }
      }
      return "방금 전";
    }

    useEffect(()=>{
        loadSell()
        console.log('hi')
    },[])


  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <View style={{flex: 0.6, flexDirection:'row'}}>
        <View style={{flex: 1.6}}>
          <TouchableOpacity
            style={styles.btnView}
            onPress={() => navigation.goBack()}>
            <Image source={require('../assets/BackBtn.png')} />
          </TouchableOpacity>
        </View>
        <View style={{flex:6.6, alignItems:'center',justifyContent:'center'}}>
            <Text style={{fontSize:16,fontFamily:'NotoSansKR-Regular', includeFontPadding:false,color:'#000000'}}>관심목록</Text>
        </View>
        <View style={{flex: 1.7}}></View>
      </View>
      <View style={{flex: 9.1}}>
      
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
  flatbox: {
    height: 116,
    width:335,
    justifyContent:'center'
  },
  imagebox: {
    height: 72,
    width: 72,
  }


  
});

export default AttentionScreen;

