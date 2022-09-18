import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

function SearchLocationScreen({navigation}: any) {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <View style={styles.headerBarView}>
        <View style={styles.headerBarLeftView}>
          <Pressable onPress={() => navigation.goBack()}>
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
        <View style={styles.searchResultView}>
          <View style={styles.resultTextView}>
            <Text style={styles.resultText}> 부산 광역시 수영구 수영로</Text>
          </View>
          <View style={styles.resultTextView}>
            <Text style={styles.resultText}> 부산 광역시 수영구 수영로</Text>
          </View>
          <View style={styles.resultTextView}>
            <Text style={styles.resultText}> 부산 광역시 수영구 수영로</Text>
          </View>
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
});

export default SearchLocationScreen;
