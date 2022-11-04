import { FirebaseStorageTypes } from '@react-native-firebase/storage';
import React, { useEffect, useState } from 'react';
import {View, Text, SafeAreaView, StyleSheet,TouchableOpacity,ScrollView,Pressable,Image,FlatList} from 'react-native';
import { TextInput } from 'react-native-paper';
import BottomTab from '../components/BottomTab';
import firestore from '@react-native-firebase/firestore';



function BoardScreen({navigation}: any) {

    const[board,setBoard] = useState('#16D66F');
    const[boardBottom,setBoardBottom] =useState('#16D66F');
    const[qna,setQna] = useState('#C6C6C6');
    const[qnaBottom,setQnaBottom] = useState('#F4F4F4');
    const[info,setInfo] = useState('#C6C6C6');
    const[infoBottom,setInfoBottom] = useState('#F4F4F4');
    const[title,setTitle] = useState('게시글');
    const[Data, setData] = useState<any>(null);
    const[likedata, setLike] = useState<any>(null);

  function onclickBoard(){
    setTitle('게시글');
    setBoard('#16D66F');
    setBoardBottom('#16D66F');
    setQna('#C6C6C6');
    setQnaBottom('#F4F4F4');
    setInfo('#C6C6C6');
    setInfoBottom('#F4F4F4');
    read();
  }

  function onclickQNA(){
    setTitle('Q&A');
    setBoard('#C6C6C6');
    setBoardBottom('#F4F4F4');
    setQna('#16D66F');
    setQnaBottom('#16D66F');
    setInfo('#C6C6C6');
    setInfoBottom('#F4F4F4');
  }

  function onclickInfo(){
    setTitle('공식정보');
    setBoard('#C6C6C6');
    setBoardBottom('#F4F4F4');
    setQna('#C6C6C6');
    setQnaBottom('#F4F4F4');
    setInfo('#16D66F');
    setInfoBottom('#16D66F');
  }

  function regist(){
    if(board === '#16D66F'){
        navigation.navigate('RegistBoardScreen')
        console.log('1')
    }
    else if(qna === '#16D66F'){
        console.log('2')
    }
    else if(info === '#16D66F'){
        console.log('3')
    }
    else{
        console.log('error')
    }
  }

  async function read(){
    firestore()
    .collection('게시글')
    .orderBy('time','desc')
    .get()
    .then(async querySnapshot => {
        const data: {key: string}[] = [];
        querySnapshot.forEach(documentSnapshot => {
          data.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
    setData(data);
    })
  }

  async function readlike(){
    firestore()
    .collection('게시글')
    .orderBy('like','desc')
    .get()
    .then(async querySnapshot => {
        const data: {key: string}[] = [];
        querySnapshot.forEach(documentSnapshot => {
          data.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
    setLike(data);
    })
  }

  useEffect(()=>{
    read();
  },[])

  useEffect(()=>{
    readlike()
  },[])


  function ShowBoard(){
    if(Data !== null){
        return(
            Data.slice(0,5).map((data:any) => 
            <View key = {data.image[0]} style={styles.flatbox}>
                <TouchableOpacity>
                    <View style={{flexDirection:'row'}}>
                        <View style={{marginRight: 10,justifyContent:'center'}}>
                            <Image
                            style={styles.imagebox}
                            source={{uri: data.image[0]}}
                            />
                        </View>
                        <View style={{justifyContent:'space-between',width:270}}>
                            <Text
                                style={{
                                    fontSize: 14,
                                    fontFamily: 'NotoSansKR-Regular',
                                    includeFontPadding: false,
                                    color: '#000000'
                                }}
                                numberOfLines={1} ellipsizeMode='tail'>
                                {data.Title}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 10,
                                    fontFamily: 'NotoSansKR-Regular',
                                    includeFontPadding: false,
                                    color: '#C6C6C6',
                                }}>
                                {data.Category}
                            </Text>
                            <View style={{flexDirection:'row'}}>
                                <Text
                                    style={{
                                        fontSize: 10,
                                        fontFamily: 'NotoSansKR-Regular',
                                        includeFontPadding: false,
                                        color: '#C6C6C6',
                                    }}>
                                    {elapsedTime(data.time)}
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 10,
                                        fontFamily: 'NotoSansKR-Regular',
                                        includeFontPadding: false,
                                        color: '#C6C6C6',
                                    }}>
                                    /
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 10,
                                        fontFamily: 'NotoSansKR-Regular',
                                        includeFontPadding: false,
                                        color: '#C6C6C6',
                                    }}>
                                    좋아요  {data.like}
                                </Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>)
        )
    }
    else{
        return null
    }
  }

  function findname(name:string){
    var nickname = "";
    firestore()
    .collection('user')
    .doc(name)
    .get()
    .then(documentSnapshot => {
        nickname = documentSnapshot.get('nickname')
    });
    return nickname
  }

  function ShowLikeBoard(){
    if(likedata !== null){
        return(
            <ScrollView horizontal={true}
                        pagingEnabled={true}
                        showsHorizontalScrollIndicator={false}>
                {likedata.slice(0,5).map((data:any) => 
                    <TouchableOpacity key = {data.image[0]} style={{width:145,height:315,marginRight:16}}>
                        <Image style={{width:'100%',height:182,marginBottom:3,borderRadius:12}} source={{uri: data.image[0]}}/>
                        <View style={{width:'100%',height:50,marginTop:3,marginBottom:3}}>
                            <Text style={{fontSize:16,fontFamily:'NotoSansKR-Bold', includeFontPadding:false,color:'#000000'}}
                                  numberOfLines={2} ellipsizeMode='tail' >{data.Title}</Text>
                        </View>
                        <View style={{width:'100%',height:40,marginTop:3,marginBottom:3}}>
                            <Text style={{fontSize:12,fontFamily:'NotoSansKR-Medium', includeFontPadding:false,color:'#8E8E93'}}
                                numberOfLines={2} ellipsizeMode='tail' >{data.explane}</Text>
                        </View>
                        <View style={{width:'100%',height:30,marginTop:3}}>
                            <Text style={{fontSize:9,fontFamily:'NotoSansKR-Medium', includeFontPadding:false,color:'#C6C6C6'}}>좋아요  {data.like}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            </ScrollView>
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
                <TouchableOpacity onPress={regist}>
                    <Text style={{fontSize:14,fontFamily:'NotoSansKR-Regular', includeFontPadding:false,color:'#16D66F'}}>등록</Text>
                </TouchableOpacity>
            </View>
        </View>
        <View style={{flex:8.6,}}>
            <ScrollView style={{width:'100%'}} showsVerticalScrollIndicator={false}>
                <View style={{height:50,width:'100%',borderBottomColor:'#F4F4F4',borderBottomWidth:1,alignItems:'center'}}>
                    <View style={{height:'100%',flexDirection:'row',width:335,alignItems:'flex-end'}}>
                        <View style={{marginRight:10,borderBottomColor:boardBottom,borderBottomWidth:1}}>
                            <TouchableOpacity onPress={onclickBoard}>
                                <Text style={{fontSize:14,fontFamily:'NotoSansKR-Medium', includeFontPadding:false,marginBottom:6,color:board}}>정보게시판</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{marginLeft:10,marginRight:10,borderBottomColor:qnaBottom,borderBottomWidth:1}}>
                            <TouchableOpacity onPress={onclickQNA}>
                                <Text style={{fontSize:14,fontFamily:'NotoSansKR-Medium', includeFontPadding:false,marginBottom:6,color:qna}}>Q&A</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{marginLeft:10,borderBottomColor:infoBottom,borderBottomWidth:1}}>
                            <TouchableOpacity onPress={onclickInfo}>
                                <Text style={{fontSize:14,fontFamily:'NotoSansKR-Medium', includeFontPadding:false,marginBottom:6,color:info}}>공식정보</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{height:65,width:'100%',alignItems:'center',justifyContent:'center'}}>
                    <TextInput style={{width:335,height:42,backgroundColor:'#F4F4F4',borderRadius:6}}
                                placeholder="검색어를 입력하세요."
                                placeholderTextColor="#8E8E93"
                                autoComplete="off"
                                autoCapitalize="none"></TextInput>
                </View>
                <View style={{height:80,width:'100%',justifyContent:'center',alignItems:'center',marginBottom:12}}>
                    <View style={{width:335}}>
                        <Text style={{fontSize:28,fontFamily:'NotoSansKR-Bold', includeFontPadding:false,color:'#000000',marginBottom:3}}>TOP 5</Text>
                        <Text style={{fontSize:12,fontFamily:'NotoSansKR-Medium', includeFontPadding:false,color:'#C6C6C6',marginTop:3}}>최근 인기 게시글 TOP 5를 만나보세요!</Text>
                    </View>
                </View>
                <View style={{width:335,height:355}}>
                    <ShowLikeBoard/>
                </View>
                <View style={{height:35,width:'100%',justifyContent:'center',alignItems:'center'}}>
                    <View style={{width:335,flexDirection:'row',height:'100%'}}>
                        <View style={{justifyContent:'center',flex:2}}>
                            <Text style={{fontSize:16,fontFamily:'NotoSansKR-Bold', includeFontPadding:false,color:'#000000'}}>{title}</Text>
                        </View>
                        <View style={{flex:6.8}}></View>
                        <View style={{justifyContent:'center',flex:1.2}}>
                            <TouchableOpacity>
                                <Text style={{fontSize:10,fontFamily:'NotoSansKR-Regular', includeFontPadding:false,color:'#C6C6C6'}}>전체보기</Text>
                            </TouchableOpacity> 
                        </View>
                    </View>
                </View>
                <View style={{height:345,width:335,justifyContent:'center',alignSelf:'center'}}>
                    <ShowBoard/>
                </View>
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

