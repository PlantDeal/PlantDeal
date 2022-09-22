import React from 'react';
import {View, Text, SafeAreaView, StyleSheet,TouchableOpacity} from 'react-native';



function CompleteRegistScreen({navigation}: any) {

  

  return (
    <SafeAreaView style={styles.SafeAreaView}>
        <View style={{flex:8, justifyContent:'center'}}>
          <Text style={{fontSize:24,fontFamily:'NotoSansKR-Bold',includeFontPadding:false,color:'#000000'}}>회원가입 완료!</Text>
        </View>
        <View style={{flex:1,justifyContent:'center'}}>
        <TouchableOpacity 
          style={{height: 48,
                  width: 335,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 10,
                  borderRadius:6,
                  backgroundColor: '#16D66F'}}
          onPress={ ()=> navigation.navigate('NavHome')}>
            <Text style={{color: 'white', fontSize:16, fontFamily:'NotoSansKR-Bold',includeFontPadding:false}}>홈으로</Text>
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

export default CompleteRegistScreen;

