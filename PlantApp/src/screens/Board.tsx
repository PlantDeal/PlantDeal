import React, { useEffect, useState } from 'react';
import {View, Text, SafeAreaView, StyleSheet,TouchableOpacity,ScrollView,Pressable,Image,FlatList} from 'react-native';
import BottomTab from '../components/BottomTab';
import firestore from '@react-native-firebase/firestore';
import RecommendScreen from './Recommend';
import CommunityScreen from './Community';



function BoardScreen({navigation}: any) {

    const[board,setBoard] = useState('#16D66F');
    const[boardBottom,setBoardBottom] =useState('#16D66F');
    const[community,setCommunity] = useState('#C6C6C6');
    const[communityBottom,setCommunityBottom] = useState('#F4F4F4');
    const[info,setInfo] = useState('#C6C6C6');
    const[infoBottom,setInfoBottom] = useState('#F4F4F4');
    const[title,setTitle] = useState('오늘의 추천');
    const[Data, setData] = useState<any>(null);
    

  function onclickBoard(){
    setTitle('오늘의 추천');
    setBoard('#16D66F');
    setBoardBottom('#16D66F');
    setCommunity('#C6C6C6');
    setCommunityBottom('#F4F4F4');
    setInfo('#C6C6C6');
    setInfoBottom('#F4F4F4');
  }

  function onclickQNA(){
    setTitle('커뮤니티');
    setBoard('#C6C6C6');
    setBoardBottom('#F4F4F4');
    setCommunity('#16D66F');
    setCommunityBottom('#16D66F');
    setInfo('#C6C6C6');
    setInfoBottom('#F4F4F4');
  }

  function onclickInfo(){
    setTitle('식물위키');
    setBoard('#C6C6C6');
    setBoardBottom('#F4F4F4');
    setCommunity('#C6C6C6');
    setCommunityBottom('#F4F4F4');
    setInfo('#16D66F');
    setInfoBottom('#16D66F');
  }

//   async function read(){
//     firestore()
//     .collection('')
//     .orderBy('time','desc')
//     .get()
//     .then(async querySnapshot => {
//         const data: {key: string}[] = [];
//         querySnapshot.forEach(documentSnapshot => {
//           data.push({
//             ...documentSnapshot.data(),
//             key: documentSnapshot.id,
//           });
//         });
//     setData(data);
//     })
//   }

  function Reg(){
    if(community === '#16D66F'){
        return(
            <TouchableOpacity onPress={()=>{navigation.navigate('RegistBoardScreen')}}>
                <Text style={{fontSize:14,fontFamily:'NotoSansKR-Regular', includeFontPadding:false,color:'#16D66F'}}>등록</Text>
            </TouchableOpacity>
        )
    }
    else{
        return null
    }
  }

  function ChangeScreen(){
    if(title === '오늘의 추천'){
        return(
            <RecommendScreen/>
        )
    }
    else if(title === '커뮤니티'){
        return(
            <CommunityScreen/>
        )
    }
    else{
        return null
    }
  }

  

  

  function elapsedTime(date: any) {
    const start: any = new Date(date);
    const end: any = new Date();
    const diff = end - start;
    const times = [
      {time: '분', milliSeconds: 1000 * 60},
      {time: '시간', milliSeconds: 1000 * 60 * 60},
      {time: '일', milliSeconds: 1000 * 60 * 60 * 24},
      {time: '개월', milliSeconds: 1000 * 60 * 60 * 24 * 30},
      {time: '년', milliSeconds: 1000 * 60 * 60 * 24 * 365},
    ].reverse();
    for (const value of times) {
      const betweenTime = Math.floor(diff / value.milliSeconds);

      if (betweenTime > 0) {
        return `${betweenTime}${value.time} 전`;
      }
    }
    return '방금 전';
  }

  return (
    <SafeAreaView style={styles.SafeAreaView}>
        <View style={{width:'100%',flex:0.6,flexDirection:'row',borderBottomColor:'#F4F4F4',borderBottomWidth:1}}>
            <View style={styles.headerBarLeftView}>
                <Pressable onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/BackBtn.png')}></Image>
                </Pressable>
            </View>
            <View style={styles.headerBarCenterView}>
                <Text style={styles.headerBarTitle}>지역 설정</Text>
            </View>
            <View style={styles.headerBarRightView}>
                <Reg />
            </View>
        </View>
        <View style={{flex:8.6}}>
        <ScrollView style={{width:'100%'}} showsVerticalScrollIndicator={false}>
            <View style={{height:50,width:'100%',borderBottomColor:'#F4F4F4',borderBottomWidth:1,alignItems:'center'}}>
                <View style={{height:'100%',flexDirection:'row',width:335,alignItems:'flex-end'}}>
                    <View style={{marginRight:10,borderBottomColor:boardBottom,borderBottomWidth:1}}>
                        <TouchableOpacity onPress={onclickBoard}>
                            <Text style={{fontSize:14,fontFamily:'NotoSansKR-Medium', includeFontPadding:false,marginBottom:6,color:board}}>오늘의 추천</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{marginLeft:10,marginRight:10,borderBottomColor:communityBottom,borderBottomWidth:1}}>
                        <TouchableOpacity onPress={onclickQNA}>
                            <Text style={{fontSize:14,fontFamily:'NotoSansKR-Medium', includeFontPadding:false,marginBottom:6,color:community}}>커뮤니티</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{marginLeft:10,borderBottomColor:infoBottom,borderBottomWidth:1}}>
                        <TouchableOpacity onPress={onclickInfo}>
                            <Text style={{fontSize:14,fontFamily:'NotoSansKR-Medium', includeFontPadding:false,marginBottom:6,color:info}}>식물위키</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <ChangeScreen/>
            
        </ScrollView>
        </View>
        <BottomTab style={{flex: 0.8}} navigation={navigation}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    alignItems:'center',
    backgroundColor: '#FFFFFF',
  },
  headerBarLeftView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerBarTitle: {
    fontSize: 16,
    fontFamily:'NotoSansKR-Regular', 
    includeFontPadding:false,
    color:'#000000'
  },
  headerBarRightView: {
    flex: 1,
    justifyContent: 'center',
  },
  headerBarCenterView: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatbox: {
    height: 62,
    width: 335,
    justifyContent: 'center',
    marginTop:3,
    marginBottom:3
  },
  imagebox: {
    height: 60,
    width: 60,
  },


  
});

export default BoardScreen;

