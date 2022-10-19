import React from 'react';
import {View, Text, SafeAreaView, StyleSheet,TouchableOpacity,Image} from 'react-native';



function SetLocationScreen({navigation}: any) {

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <View style={{flex: 0.7, flexDirection:'row', borderBottomColor:'#F4F4F4',borderBottomWidth:1}}>
        <View style={{flex: 1.6}}>
          
        </View>
        <View style={{flex:6.6, alignItems:'center',justifyContent:'center'}}>
            <Text style={{fontSize:16,fontFamily:'NotoSansKR-Regular', includeFontPadding:false,color:'#000000'}}>지역 설정</Text>
        </View>
        <View style={{flex: 1.7}}>
            <TouchableOpacity style={styles.btnView}>
            <Image source={require('../assets/Alarm.png')} />
            </TouchableOpacity>
        </View>
      </View>
      <View style={{flex:8, justifyContent:'center',alignItems:'center'}}>
        <Text style={{fontSize:16,fontFamily:'NotoSansKR-Regular', includeFontPadding:false,color:'#8E8E93',marginBottom:4.5}}>지역 설정을 먼저 해주세요</Text>
        <TouchableOpacity onPress={() => navigation.navigate('NavHome',{screen:'지역 설정하기'})}><Text style={{fontSize:16,fontFamily:'NotoSansKR-Bold', includeFontPadding:false,color:'#16D66F',marginTop:4.5}}>지역 설정하러 가기</Text></TouchableOpacity>
      </View>
      <View style={{flex:1,justifyContent:'center'}}>
      <TouchableOpacity 
        disabled={true}
        style={{height: 48,
                width: 335,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 10,
                borderRadius:6,
                backgroundColor: '#BDE3CE'}}>
          <Text style={{color: 'white', fontSize:16, fontFamily:'NotoSansKR-Bold',includeFontPadding:false}}>판매 등록</Text>
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


  
});

export default SetLocationScreen;

