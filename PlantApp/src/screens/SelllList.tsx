import React, { useEffect, useState } from 'react';
import {View, Text, SafeAreaView, StyleSheet,TouchableOpacity,Image,Dimensions,FlatList} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/firestore';



function SellListScreen({navigation}: any) {
    const [buy,setBuy] = useState('#16D66F')
    const [buyBot,setbuyBot] = useState('#16D66F')
    const [sell,setSell] = useState('#C6C6C6')
    const [settBot,setsellBot] = useState('#F4F4F4')
    const Width = Dimensions.get('window').width;
    const token:any = firebase.auth().currentUser;
    const [user,setuser] = useState<any>()
    const [DataSell,setData] = useState<any>(null);

    function onclickbuy(){
        setBuy('#16D66F')
        setbuyBot('#16D66F')
        setSell('#C6C6C6')
        setsellBot('#F4F4F4')
    }

    function onclicksell(){
        setBuy('#C6C6C6')
        setbuyBot('#F4F4F4')
        setSell('#16D66F')
        setsellBot('#16D66F')
    }

    function loadSell(){
        firestore()
        .collection('user')
        .doc(token?.email)
        .collection('판매내역')
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
        if(sell === '#16D66F'){
            loadSell()
        }
        else{
            setData('')
        }
    },[sell,buy])


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
            <Text style={{fontSize:16,fontFamily:'NotoSansKR-Regular', includeFontPadding:false,color:'#000000'}}>거래 내역</Text>
        </View>
        <View style={{flex: 1.7}}></View>
      </View>
      <View style={{flex: 0.6,borderBottomColor:'#F4F4F4',borderBottomWidth:1,justifyContent:'flex-end',width:Width,alignItems:'center'}}>
        <View style={{flexDirection:'row',width:335,backgroundColor:'#FFFFFF'}}>
            <View style={{marginRight:10,borderBottomColor:buyBot,borderBottomWidth:1}}>
                <TouchableOpacity onPress={onclickbuy}>
                    <Text style={{fontSize:14,fontFamily:'NotoSansKR-Medium', includeFontPadding:false,color:buy,marginBottom:6}}>구매 내역</Text>
                </TouchableOpacity>
            </View>
            <View style={{marginLeft:10,borderBottomColor:settBot,borderBottomWidth:1}}>
                <TouchableOpacity onPress={onclicksell}>
                    <Text style={{fontSize:14,fontFamily:'NotoSansKR-Medium', includeFontPadding:false,color:sell,marginBottom:6}}>판매 내역</Text>
                </TouchableOpacity>
            </View>
        </View>
      </View>
      <View style={{flex: 8.5}}>
      <FlatList
          data={DataSell}
          renderItem={({item}) => (
            <View style={styles.flatbox}>
              <TouchableOpacity style={styles.flatbox} 
              onPress={()=> {navigation.navigate('DetailScreen',
              {image:item.image,
              name:item.name,
              price:item.price,
              amount:item.amount,
              sunlight:item.sunlight,
              title:item.title,
              watering:item.watering,
              explane:item.explane,
              time:item.time,
              key:item.key,
              city:item.city,
              town:item.town,
              village:item.village,
              user:token?.email,
              category:item.Category})}}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{marginLeft: 12, marginRight: 6}}>
                    <Image style={styles.imagebox} source={{uri: item.image[0]}} />
                  </View>
                  <View
                    style={{
                      marginLeft: 6,
                      marginRight: 6,
                      height: 62,
                      width: 197,
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontFamily: 'NotoSansKR-Bold',
                        includeFontPadding: false,
                        color: '#000000',
                        marginBottom: 2,
                      }}>
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: 'NotoSansKR-Medium',
                        includeFontPadding: false,
                        color: '#16D66F',
                        marginTop: 2,
                      }}>
                      {item.price}원
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: 'NotoSansKR-Medium',
                        includeFontPadding: false,
                        color: '#C6C6C6',
                      }}>
                      {elapsedTime(item.time)}
                    </Text>
                  </View>
                  <View
                    style={{
                      marginLeft: 6,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image
                      style={{height: 24, width: 24}}
                      source={require('../assets/Arrow.png')}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
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

export default SellListScreen;

