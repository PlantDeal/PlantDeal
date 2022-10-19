import { FirebaseStorageTypes } from '@react-native-firebase/storage';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import firestore from '@react-native-firebase/firestore'
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import Feather from 'react-native-vector-icons/Feather';
Feather.loadFont()


function SearchScreen({navigation,route}: any) {
  const {city, town, village} = route.params;
  // const [searchInput,setInput] = useState('');
  const [searchData,setData] = useState<any>(null);
  const [plant,setPlant] = useState<any>([{id:0,title:""}])


  async function test(searchInput:any){
    const pdata = await firestore()
    .collection('sell')
    .doc(city)
    .collection(town)
    .doc(village)
    .collection('판매물품')
    if(searchInput !== undefined){
      pdata.where('name','==',searchInput)
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
      });
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

  useEffect(()=>{
    firestore()
    .collection('식물')
    .doc('식물이름')
    .get()
    .then(data =>{
      const pdata = data.data()?.name
      pdata.map((Name:any) =>{
        console.log(Name)
        setPlant((plant:any) => {return[...plant,{id:Name,title:Name}]})
      })
    })
  },[])



  
  



  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <View style={styles.headerBarView}>
        <View style={styles.headerBarLeftView}>
          <Pressable onPress={() => navigation.goBack()}>
            <Image source={require('../assets/BackBtn.png')}></Image>
          </Pressable>
        </View>
        <View style={styles.headerBarCenterView}>
          <Text style={styles.headerBarTitle}>검색</Text>
        </View>
        <View style={styles.headerBarRightView} />
      </View>
      <View style={styles.bodyView}>
        <AutocompleteDropdown
          containerStyle={styles.textInput}
          inputContainerStyle={styles.textInput2}
          rightButtonsContainerStyle={styles.searchImageView}
          suggestionsListTextStyle={styles.textlist}
          showClear={false}
          clearOnFocus={false}
          emptyResultText={"검색된 정보가 없습니다"}
          // ChevronIconComponent={<Image source={require('../assets/Search.png')}></Image>}
          dataSet={plant}
          onSelectItem={async(item:any) => {
            test(item?.title)
          }} 
          position="absolute"
          />
        <FlatList
          data={searchData}
          renderItem={({item}) => (
            <View style={styles.flatbox}>
              <TouchableOpacity
                style={styles.flatbox}
                onPress={() => {
                  navigation.navigate('DetailScreen', {
                    image: item.image,
                    name: item.name,
                    price: item.price,
                    amount: item.amount,
                    sunlight: item.sunlight,
                    title: item.title,
                    watering: item.watering,
                    explane: item.explane,
                    category:item.Category,
                    town: item.town,
                    village: item.village,
                    city: item.city,
                    user: item.user,
                    time: item.time,
                    key: item.key,
                  });
                }}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{marginLeft: 12, marginRight: 6}}>
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
                      {item.title}
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
                    <View style={{flexDirection: 'row', marginTop: 2}}>
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: 'NotoSansKR-Medium',
                          includeFontPadding: false,
                          color: '#C6C6C6',
                          marginRight: 4,
                        }}>
                        {item.Category}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: 'NotoSansKR-Medium',
                          includeFontPadding: false,
                          color: '#C6C6C6',
                          marginLeft: 4,
                          marginRight: 4,
                        }}>
                        {item.village}
                      </Text>
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
  searchesTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 10,
  },
  textInputView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchImageView: {
    position: 'absolute',
    left: '85%',
  },
  searchInputView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20,
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
    borderBottomWidth: 1,
    borderBottomColor: '#F4F4F4',
  },
  bodyView: {
    flex: 18,
    alignItems: 'center',
    paddingTop: 10,
  },
  flatbox: {
    height: 116,
    width:335,
    justifyContent:'center',
    position:'relative'
  },
  imagebox: {
    height: 72,
    width: 72,
  },
  textlist:{
    fontFamily:'NotoSansKR-Regular', 
    includeFontPadding:false,
    color:'#000000',
    fontSize:14,
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
  textInput: {
    width: '90%',
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#8E8E93',
    fontSize: 16,
    color: '#000000',
    fontWeight: '400',
  },
});

export default SearchScreen;
