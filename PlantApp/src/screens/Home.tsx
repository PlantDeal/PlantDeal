import React, {useState} from 'react';
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

function HomeScreen({navigation}: any) {
  const categories = ['나무', '공기정화', '허브'];
  const [City, setCity] = useState('서울');
  const [Town, setTown] = useState('강남');
  const [Village, setVillage] = useState('개포1');
  const [Category, setCategory] = useState('관엽식물');
  const [Data, setData] = useState<any>(null);

  const read = () => {
    firestore()
      .collection('sell')
      .doc(City)
      .collection(Town)
      .doc(Village)
      .collection(Category)
      .onSnapshot(querySnapshot => {
        const data: {key: string}[] = [];
        querySnapshot.forEach(documentSnapshot => {
          data.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setData(data);
        console.log(data);
      });
  };

  return (
    <SafeAreaView
      style={{flex: 1, alignItems: 'center', backgroundColor: '#FFFFFF'}}>
      <HomeHeaderBar style={{flex: 1}} navigation={navigation} />
      <View style={{flex: 1, justifyContent: 'center'}}>
        <SelectDropdown
          data={categories}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
          }}
          defaultButtonText="카테고리"
          buttonStyle={styles.category}
          buttonTextStyle={{
            fontSize: 14,
            fontFamily: 'NotoSansKR-Regular',
            color: '#000000',
          }}
          rowTextStyle={{
            fontSize: 14,
            fontFamily: 'NotoSansKR-Regular',
            color: '#000000',
          }}
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
              <TouchableOpacity style={styles.flatbox}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{marginLeft: 12, marginRight: 6}}>
                    <Image style={styles.imagebox} source={{uri: item.image}} />
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
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: 'NotoSansKR-Medium',
                        includeFontPadding: false,
                        color: '#C6C6C6',
                      }}>
                      {item.time}
                    </Text>
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
      <View style={{flex: 1}}>
        <TouchableOpacity onPress={read} style={styles.sellbox}>
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
  category: {
    borderWidth: 1,
    borderRadius: 999,
    borderColor: '#C6C6C6',
    width: 335,
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
    height: 110,
    width: 335,
    justifyContent: 'center',
  },
  imagebox: {
    height: 66,
    width: 66,
  },
});

export default HomeScreen;
