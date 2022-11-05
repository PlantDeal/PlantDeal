import React, {useEffect,useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet,TouchableOpacity,ScrollView,Image} from 'react-native';
import firestore from '@react-native-firebase/firestore';



function RecommendScreen({navigation}: any) {
    const[likedata, setLike] = useState<any>(null);
    const[likeqna,setLikeqna] = useState<any>(null);



    async function readlike(){
        firestore()
        .collection('식물 추천')
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

    async function readlikeqna(){
        firestore()
        .collection('Q&A')
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
        setLikeqna(data);
        })
    }


    useEffect(()=>{
        readlike()
    },[])

    useEffect(()=>{
        readlikeqna()
    },[])


    function ShowLikeQna(){
        if(likeqna !== null){
            return(
                <ScrollView horizontal={true}
                            pagingEnabled={true}
                            showsHorizontalScrollIndicator={false}>
                    {likeqna.slice(0,5).map((data:any) => 
                        <TouchableOpacity key = {data.key} style={{width:145,height:315,marginRight:16}}>
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

    function ShowLikeBoard(){
        if(likedata !== null){
            return(
                <ScrollView horizontal={true}
                            pagingEnabled={true}
                            showsHorizontalScrollIndicator={false}>
                    {likedata.slice(0,5).map((data:any) => 
                        <TouchableOpacity key = {data.key} style={{width:145,height:315,marginRight:16}}>
                            <Image style={{width:'100%',height:182,marginBottom:3,borderRadius:12}} source={{uri: data.image[0]}}/>
                            <View style={{width:'100%',height:50,marginTop:3,marginBottom:3}}>
                                <Text style={{fontSize:16,fontFamily:'NotoSansKR-Bold', includeFontPadding:false,color:'#000000'}}
                                      numberOfLines={2} ellipsizeMode='tail' >{data.Title}</Text>
                            </View>
                            <View style={{width:'100%',height:40,marginTop:3,marginBottom:3}}>
                                <Text style={{fontSize:12,fontFamily:'NotoSansKR-Medium', includeFontPadding:false,color:'#8E8E93'}}
                                    numberOfLines={2} ellipsizeMode='tail' >{data.explane}</Text>
                            </View>
                            <View style={{width:'100%',height:30}}>
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

  

  return (
    <SafeAreaView style={styles.SafeAreaView}>
        <View style={{height:80,width:'100%',justifyContent:'center',alignItems:'center',marginBottom:12,marginTop:12}}>
            <View style={{width:335}}>
                <Text style={{fontSize:28,fontFamily:'NotoSansKR-Bold', includeFontPadding:false,color:'#000000',marginBottom:3}}>일상/소통</Text>
                <Text style={{fontSize:12,fontFamily:'NotoSansKR-Medium', includeFontPadding:false,color:'#C6C6C6',marginTop:3}}>최근 인기 게시글 TOP 5를 만나보세요!</Text>
            </View>
        </View>
        <View style={{width:335,height:330}}>
            <ShowLikeBoard/>
        </View>
        <View style={{height:80,width:'100%',justifyContent:'center',alignItems:'center',marginBottom:12}}>
            <View style={{width:335}}>
                <Text style={{fontSize:28,fontFamily:'NotoSansKR-Bold', includeFontPadding:false,color:'#000000',marginBottom:3}}>Q&A</Text>
                <Text style={{fontSize:12,fontFamily:'NotoSansKR-Medium', includeFontPadding:false,color:'#C6C6C6',marginTop:3}}>사람들이 많이 궁금해한 내용 TOP5를 만나보세요!</Text>
            </View>
        </View>
        <View style={{width:335,height:330}}>
            <ShowLikeQna/>
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


  
});

export default RecommendScreen;

