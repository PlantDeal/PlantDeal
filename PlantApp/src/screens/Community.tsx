import React ,{useEffect, useState}from 'react';
import {View, Text, SafeAreaView, StyleSheet,TouchableOpacity,TextInput,FlatList,Image} from 'react-native';
import firestore from '@react-native-firebase/firestore';



function CommunityScreen({navigation}: any) {
    const [sunlight,setSunlight] = useState('일상 소통')
    const [sunlightbad,setSunlightBad] = useState('#16D66F')
    const [sunlightbadborder,setSunlightBadBorder] = useState('#16D66F')
    const [sunlightbadtext,setSunlightBadText] = useState('#FFFFFF')
    const [sunlightnormal,setSunlightNormal] = useState('#FFFFFF')
    const [sunlightnormalborder,setSunlightNormalBorder] = useState('#8E8E93')
    const [sunlightnormaltext,setSunlightNormalText] = useState('#8E8E93')
    const [Data,setData] = useState<any>(null);
    
    function setSunlightBadColor(){
        setSunlight('일상 소통')
        setSunlightBad('#16D66F')
        setSunlightBadBorder('#16D66F')
        setSunlightBadText('#FFFFFF')
        setSunlightNormal('#FFFFFF')
        setSunlightNormalBorder('#8E8E93')
        setSunlightNormalText('#8E8E93')
    }

    function setSunlightNormalColor(){
        setSunlight('Q&A')
        setSunlightBad('#FFFFFF')
        setSunlightBadBorder('#8E8E93')
        setSunlightBadText('#8E8E93')
        setSunlightNormal('#16D66F')
        setSunlightNormalBorder('#16D66F')
        setSunlightNormalText('#FFFFFF')
    }

    async function read(){
        firestore()
        .collection(sunlight)
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


    useEffect(()=>{
        read();
    },[sunlight])

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

    function Flatscreen(){
        if(Data !== null){
            return(
                <FlatList
                data={Data}
                renderItem={({item}) => (
                    <View style={styles.flatbox}>
                    <TouchableOpacity style={styles.flatbox}>
                        <View style={{flexDirection: 'row'}}>
                        <View style={{marginRight: 6}}>
                            <Image
                            style={styles.imagebox}
                            source={{uri: item.image[0]}}
                            />
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
                            {item.Title}
                            </Text>
                            <View style={{flexDirection: 'row', marginTop: 2}}>
                            <Text
                                style={{
                                fontSize: 12,
                                fontFamily: 'NotoSansKR-Medium',
                                includeFontPadding: false,
                                color: '#C6C6C6',
                                marginLeft: 4,
                                }}>
                                {elapsedTime(item.time)}
                            </Text>
                            </View>
                        </View>
                        </View>
                    </TouchableOpacity>
                    </View>
                )}
                />
            )
        }
        else{
            return null
        }
        
    }

  

  return (
    <SafeAreaView style={styles.SafeAreaView}>
        <View style={{height:70,justifyContent:'center'}}>
            <TextInput style={{width:335,height:42,backgroundColor:'#F4F4F4'}}></TextInput>
        </View>
        <View style={{flexDirection:'row',width:335}}>
            <TouchableOpacity 
            disabled={
                sunlight === '일상 소통' ? true : false
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
            <Text style={{fontSize:12,color:sunlightbadtext,fontFamily:'NotoSansKR-Medium', includeFontPadding:false}}>일상 소통</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            disabled={
                sunlight === 'Q&A' ? true : false
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
            <Text style={{fontSize:12,color:sunlightnormaltext,fontFamily:'NotoSansKR-Medium', includeFontPadding:false}}>Q&A</Text>
            </TouchableOpacity>
        </View>
        <View style={{width:335,height:45,justifyContent:'flex-end'}}>
            <Text style={{fontSize:16,fontFamily:'NotoSansKR-Bold', includeFontPadding:false,color:'#000000',marginBottom:3}}>{sunlight}</Text>
        </View>
        <Flatscreen/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    alignItems:'center',
    backgroundColor: '#FFFFFF',
  },
  flatbox: {
    height: 116,
    width: 335,
    justifyContent: 'center',
  },
  imagebox: {
    height: 72,
    width: 72,
  },


  
});

export default CommunityScreen;

