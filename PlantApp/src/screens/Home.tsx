import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BottomTab from '../components/BottomTab';
import HomeHeaderBar from '../components/HomeHeaderBar';
import SelectDropdown from 'react-native-select-dropdown';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

function HomeScreen({navigation}: any) {
  const categories = [
    '공기정화식물',
    '다육식물',
    '허브식물',
    '선인장',
    '희귀식물',
    '기타',
  ];
  const [City, setCity] = useState('');
  const [Town, setTown] = useState('');
  const [Village, setVillage] = useState('');
  const [Category, setCategory] = useState('');
  const [Data, setData] = useState<any>(null);
  const [categorycolor, setCategoryColor] = useState('#C6C6C6');
  const [location, SetLocation] = useState<any>([]);

  async function load() {
    const loc: any = await AsyncStorage.getItem('location');
    SetLocation(JSON.parse(loc));
  }

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    setVillage(location[2]);
    setTown(location[1]);
    setCity(location[0]);
  }, [location]);

  const read = () => {
    firestore()
      .collection('sell')
      .doc(City)
      .collection(Town)
      .doc(Village)
      .collection(Category)
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
  };

  useEffect(() => {
    if (City !== '' && Town !== '' && Village !== '' && Category !== '') {
      read();
    }
  }, [Category, Village, City, Town]);

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
      <HomeHeaderBar
        style={{flex: 1}}
        navigation={navigation}
        route={location}
      />
      <View style={{flex: 1, justifyContent: 'center'}}>
        <SelectDropdown
          data={categories}
          onSelect={(selectedItem, index) => {
            setCategoryColor('#16D66F');
            setCategory(selectedItem);
            console.log(selectedItem, index);
          }}
          defaultButtonText="카테고리"
          buttonStyle={{
            borderWidth: 1,
            borderRadius: 999,
            borderColor: categorycolor,
            width: 335,
            height: 42,
            backgroundColor: '#FFFFFF',
          }}
          buttonTextStyle={{
            fontSize: 14,
            fontFamily: 'NotoSansKR-Regular',
            includeFontPadding: false,
            color: '#000000',
            textAlign: 'left',
            alignItems: 'center',
          }}
          rowTextStyle={{
            fontSize: 14,
            fontFamily: 'NotoSansKR-Regular',
            includeFontPadding: false,
            color: '#000000',
            textAlign: 'left',
          }}
          renderDropdownIcon={isOpend => {
            return (
              <Image
                style={{tintColor: categorycolor}}
                source={
                  isOpend
                    ? require('../assets/uparrow.png')
                    : require('../assets/categoryarrow.png')
                }
              />
            );
          }}
          dropdownIconPosition={'right'}
          dropdownStyle={{backgroundColor: '#FFFFFF'}}
          rowStyle={{borderBottomColor: '#FFFFFF'}}
          dropdownOverlayColor={'(0,0,0)'} //배경 회색 지우기
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}></SelectDropdown>
      </View>
      <View style={{flex: 8}}>
        <FlatList
          data={Data}
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
                    category: Category,
                    town: Town,
                    village: Village,
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
                    <View style={{flexDirection: 'row', marginTop: 2}}>
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: 'NotoSansKR-Medium',
                          includeFontPadding: false,
                          color: '#C6C6C6',
                          marginRight: 4,
                        }}>
                        {Category}
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
                        {Village}
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
                <View>
                  <Text></Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
      <View style={{flex: 1}}>
        <TouchableOpacity
          style={styles.sellbox}
          onPress={() =>
            navigation.navigate('RegistSellScreen', {
              City: City,
              Town: Town,
              Village: Village,
            })
          }>
          <Text
            style={{
              color: 'white',
              fontSize: 16,
              fontFamily: 'NotoSansKR-Bold',
            }}>
            판매등록
          </Text>
        </TouchableOpacity>
      </View>
      <BottomTab style={{flex: 1}} navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  category: {
    borderWidth: 1,
    borderRadius: 999,
    borderColor: '#C6C6C6',
    width: 335,
    height: 42,
  },
  sellbox: {
    height: 48,
    width: 335,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#16D66F',
    borderRadius: 6,
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

export default HomeScreen;
