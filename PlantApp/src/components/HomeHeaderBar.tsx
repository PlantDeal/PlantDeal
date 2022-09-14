import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
  Text,
} from 'react-native';

export default function HomeHeaderBar({navigation}: any) {
  return (
    <View style={styles.headerBarView}>
      <View style={styles.leftBtnView}>
        <TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 20,
                //fontFamily: 'NanumGothic',
                fontWeight: Platform.OS === 'ios' ? '900' : '900',
              }}>
              종로구
            </Text>
            <Image source={require('../assets/Location.png')}></Image>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.rightBtnView}>
        <TouchableOpacity
          onPress={() => {
            navigation.push('SearchScreen');
            navigation.setOptions({});
          }}>
          <View>
            <Image
              key={1}
              style={{marginLeft: 20}}
              source={require('../assets/search.jpg')}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          key={2}
          onPress={() => navigation.push('CategoryScreen')}>
          <View>
            <Image
              key={1}
              style={{marginLeft: 20, marginRight: 20}}
              source={require('../assets/category.jpg')}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerBarView: {
    height: '6%',
    flexDirection: 'row',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#C3C3C3',
  },
  leftBtnView: {
    flex: 1,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'baseline',
    paddingLeft: '5%',
  },
  rightBtnView: {
    flexDirection: 'row',
    width: '50%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
