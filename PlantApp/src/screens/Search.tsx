import React from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const DATA = [
  {
    title: '몬스테라',
  },
  {
    title: '선인장',
  },
  {
    title: '관엽식물',
  },
  {
    title: '꽃',
  },
  {
    title: '인테리어',
  },
];

const Item = ({title}: any) => (
  <Pressable
    style={{
      borderColor: '#000000',
      borderRadius: 999,
      borderWidth: 1,
      height: 36,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
      flexDirection: 'row',
    }}>
    <Text
      style={{
        fontSize: 14,
        paddingRight: 25,
        paddingLeft: 15,
        color: '#000000',
      }}>
      {title}
    </Text>
    <Pressable style={{justifyContent: 'center'}}>
      <Image
        source={require('../assets/Delete.png')}
        style={{position: 'absolute', right: 10}}
      />
    </Pressable>
  </Pressable>
);

function SearchScreen({navigation}: any) {
  const renderItem = ({item}: any) => <Item title={item.title} />;

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
        <View style={styles.searchInputView}>
          <View style={styles.textInputView}>
            <TextInput
              style={styles.textInput}
              placeholder="주소를 입력하세요. (동,읍,면)"
            />
          </View>
          <View style={styles.searchImageView}>
            <Image source={require('../assets/Search.png')} />
          </View>
        </View>
        <View style={styles.recentSearches}>
          <Text style={styles.searchesTitle}>최근 검색어</Text>
          <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={item => item.title}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={styles.popularSearches}>
          <Text style={styles.searchesTitle}>인기 검색어</Text>
          <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={item => item.title}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
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
  textInput: {
    padding: 10,
    width: '90%',
    height: 42,
    borderRadius: 6,
    fontSize: 16,
    color: '#000000',
    fontWeight: '400',
    backgroundColor: '#F4F4F4',
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
  recentSearches: {
    width: '90%',
    justifyContent: 'flex-start',
  },
  popularSearches: {
    width: '90%',
    justifyContent: 'flex-start',
    marginTop: 20,
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
});

export default SearchScreen;
