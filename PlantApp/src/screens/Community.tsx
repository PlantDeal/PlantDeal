import React ,{useState}from 'react';
import {View, Text, SafeAreaView, StyleSheet,TouchableOpacity,TextInput} from 'react-native';



function CommunityScreen({navigation}: any) {
    const [sunlight,setSunlight] = useState('일상 소통')
    const [sunlightbad,setSunlightBad] = useState('#16D66F')
    const [sunlightbadborder,setSunlightBadBorder] = useState('#16D66F')
    const [sunlightbadtext,setSunlightBadText] = useState('#FFFFFF')
    const [sunlightnormal,setSunlightNormal] = useState('#FFFFFF')
    const [sunlightnormalborder,setSunlightNormalBorder] = useState('#8E8E93')
    const [sunlightnormaltext,setSunlightNormalText] = useState('#8E8E93')
    
    function setSunlightBadColor(){
        setSunlight('식물 추천')
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
            <Text style={{fontSize:12,color:sunlightbadtext,fontFamily:'NotoSansKR-Regular', includeFontPadding:false}}>일상 소통</Text>
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
            <Text style={{fontSize:12,color:sunlightnormaltext,fontFamily:'NotoSansKR-Regular', includeFontPadding:false}}>Q&A</Text>
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


  
});

export default CommunityScreen;

