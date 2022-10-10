import React,{useEffect, useState} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import Feather from 'react-native-vector-icons/Feather';
Feather.loadFont()
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebase } from '@react-native-firebase/firestore';






function SearchLocationScreen({navigation,route}: any) {
  const [test2,setTest] = useState<any>([{id:"" , title:"" }]);
  const token:any = firebase.auth().currentUser;
  
  const{ location } = route.params;

  
  async function test(item:any){
    var str = item?.title;
    var words = str?.split(' ')
    if(str !== undefined){
      var city = words[0].slice(0,-1)
      var town = words[1].slice(0,-1)
      var village = words[2].slice(0,-1)
      await firestore()
      .collection('user')
      .doc(token?.email)
      .update({
        location: [city,town,village]
      })
      .then(async() => {
        await AsyncStorage.setItem('location',JSON.stringify([city,town,village]))
        navigation.navigate('HomeScreen')
      })
    }
    else{
      
    }
  }

  

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <View style={styles.headerBarView}>
        <View style={styles.headerBarLeftView}>
          <Pressable onPress={() => navigation.pop()}>
            <Image source={require('../assets/BackBtn.png')}></Image>
          </Pressable>
        </View>
        <View style={styles.headerBarCenterView}>
          <Text style={styles.headerBarTitle}>지역 검색</Text>
        </View>
        <View style={styles.headerBarRightView}></View>
      </View>
      <View style={styles.bodyView}>
        <View style={styles.searchView}>
          <AutocompleteDropdown
            containerStyle={styles.textInput}
            inputContainerStyle={styles.textInput2}
            rightButtonsContainerStyle={styles.searchImageView}
            suggestionsListTextStyle={styles.textlist}
            showClear={false}
            clearOnFocus={false}
            emptyResultText={"검색된 정보가 없습니다"}
            // ChevronIconComponent={<Image source={require('../assets/Search.png')}></Image>}
            dataSet={location}
            onSelectItem={async(item:any) => {
              test(item)
            }} 
           
            />
        </View>
        <View style={styles.searchResultView}>
          
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  resultTextView: {
    justifyContent: 'center',
    height: 38,
  },
  resultText: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '400',
  },
  searchResultView: {
    width: '85%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: 6,
  },
  searchImageView: {
    position: 'absolute',
    left: '89%',
  },
  textInputView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  addBtnText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
  },
  textInput: {
    width: '90%',
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#8E8E93',
    fontSize: 16,
    color: '#000000',
    fontWeight: '400',
  },
  textInput2: {
    width: '100%',
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#8E8E93',
    fontSize: 16,
    color: '#000000',
    fontWeight: '400',
    backgroundColor:"#FFFFFF"
  },
  addBtn: {
    width: 230,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F4F4F4',
    borderRadius: 8,
    marginBottom: 24,
  },
  locationText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  locationBox: {
    width: 230,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#16D66F',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  headerBarTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  headerBarRightView: {
    flex: 1,
  },
  headerBarCenterView: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerBarLeftView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerBarView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bodyView: {
    flex: 18,
    alignItems: 'center',
    paddingTop: 10,
  },
  textlist:{
    fontFamily:'NotoSansKR-Regular', 
    includeFontPadding:false,
    color:'#000000',
    fontSize:14
  }
});

export default SearchLocationScreen;
