import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import BottomTab from '../components/BottomTab';
import ProfileHeaderBar from '../components/ProfileHeaderBar';
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/firestore';
import { FirebaseStorageTypes } from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore'

function ProfileScreen({navigation}: any) {
  const [name,setName] = useState<any>('')
  const token:any = firebase.auth().currentUser;

  useEffect(()=> {
    firestore().
    collection('user')
    .doc(token?.email)
    .get()
    .then(documentSnapshot => {
     const Name = documentSnapshot.get('name')
     setName(Name)
    });
  },[])



  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <ProfileHeaderBar headerTitle={'마이페이지'} navigation={navigation} />
      <View style={styles.bodyView}>
        <ScrollView style={{width: '100%'}}>
          <View style={styles.profileView}>
            <Pressable>
              <Image source={require('../assets/TempProfileImage.png')} />
            </Pressable>
            <View style={{marginTop: 15, marginBottom: 15}}>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.profileMyName}>{name}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Pressable>
                  <Text style={styles.tagText}>#태그</Text>
                </Pressable>
                <Pressable>
                  <Text style={styles.tagText}>#태그</Text>
                </Pressable>
                <Pressable>
                  <Text style={styles.tagText}>#태그</Text>
                </Pressable>
              </View>
            </View>
            <View style={styles.logView}>
              <View style={styles.logViewIcon}>
                <Image source={require('../assets/BuyLog.png')} />
                <Text style={styles.logViewIconName}>구입내역</Text>
              </View>
              <View style={styles.logViewIcon}>
                <Image source={require('../assets/soldLog.png')} />
                <Text style={styles.logViewIconName}>판매내역</Text>
              </View>
              <View style={styles.logViewIcon}>
                <Image source={require('../assets/Hart.png')} />
                <Text style={styles.logViewIconName}>관심목록</Text>
              </View>
            </View>
          </View>
          <View style={styles.sectionView}>
            <View style={styles.sectionNameView}>
              <Text style={styles.sectionTitle}>나의 활동</Text>
            </View>
            <Pressable style={styles.sectionNameView}>
              <View style={styles.iconAndName}>
                <Image source={require('../assets/Keyword.png')} />
                <Text style={styles.sectionName}>키워드 알림</Text>
              </View>
              <Image source={require('../assets/GoBtn.png')} />
            </Pressable>
            <Pressable style={styles.sectionNameView}>
              <View style={styles.iconAndName}>
                <Image source={require('../assets/SeeAll.png')} />
                <Text style={styles.sectionName}>모아보기</Text>
              </View>
              <Image source={require('../assets/GoBtn.png')} />
            </Pressable>
            <Pressable style={styles.sectionNameView}>
              <View style={styles.iconAndName}>
                <Image source={require('../assets/SetLocation.png')} />
                <Text style={styles.sectionName}>지역 설정</Text>
              </View>
              <Image source={require('../assets/GoBtn.png')} />
            </Pressable>
          </View>
          <View style={styles.sectionView}>
            <View style={styles.sectionNameView}>
              <Text style={styles.sectionTitle}>서비스 설정</Text>
            </View>
            <Pressable style={styles.sectionNameView}>
              <View style={styles.iconAndName}>
                <Image source={require('../assets/MyStore.png')} />
                <Text style={styles.sectionName}>내 단골 가게</Text>
              </View>
              <Image source={require('../assets/GoBtn.png')} />
            </Pressable>
            <Pressable style={styles.sectionNameView}>
              <View style={styles.iconAndName}>
                <Image source={require('../assets/SavedPlant.png')} />
                <Text style={styles.sectionName}>저장한 식물 </Text>
              </View>
              <Image source={require('../assets/GoBtn.png')} />
            </Pressable>
            <Pressable style={styles.sectionNameView}>
              <View style={styles.iconAndName}>
                <Image source={require('../assets/Coupon.png')} />
                <Text style={styles.sectionName}>받은 쿠폰함</Text>
              </View>
              <Image source={require('../assets/GoBtn.png')} />
            </Pressable>
          </View>
          <View style={styles.sectionView}>
            <View style={styles.sectionNameView}>
              <Text style={styles.sectionTitle}>기타</Text>
            </View>
            <Pressable style={styles.sectionNameView}>
              <View style={styles.iconAndName}>
                <Image source={require('../assets/FAQ.png')} />
                <Text style={styles.sectionName}>FAQ</Text>
              </View>
              <Image source={require('../assets/GoBtn.png')} />
            </Pressable>
            <Pressable style={styles.sectionNameView}>
              <View style={styles.iconAndName}>
                <Image source={require('../assets/Question.png')} />
                <Text style={styles.sectionName}>1:1 문의</Text>
              </View>
              <Image source={require('../assets/GoBtn.png')} />
            </Pressable>
            <Pressable style={styles.sectionNameView}>
              <View style={styles.iconAndName}>
                <Image source={require('../assets/Setting.png')} />
                <Text style={styles.sectionName}>앱 설정</Text>
              </View>
              <Image source={require('../assets/GoBtn.png')} />
            </Pressable>
          </View>
        </ScrollView>
      </View>
      <BottomTab style={{flex: 1}} navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  iconAndName: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionNameView: {
    height: 42,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionName: {
    fontSize: 14,
    fontFamily: 'Noto Sans KR',
    fontWeight: '400',
    color: '#000000',
    paddingLeft: 6,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Noto Sans KR',
    color: '#8E8E93',
    fontWeight: '400',
  },
  logViewIconName: {
    fontFamily: 'Noto Sans KR',
    fontSize: 12,
    fontWeight: '500',
    color: '#000000',
    marginTop: 10,
  },
  logViewIcon: {
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  logView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 70,
    borderTopWidth: 1,
    marginTop: 10,
    borderTopColor: '#F4F4F4',
  },
  profileMyName: {
    fontSize: 18,
    color: '#000000',
    fontWeight: '700',
    fontFamily: 'Noto Sans KR',
  },
  tagText: {
    fontSize: 14,
    color: '#16D66F',
    fontFamily: 'Noto Sans KR',
    marginRight: 5,
  },
  sectionView: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  profileView: {
    width: '100%',
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  SafeAreaView: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFFFFF',
  },
  bodyView: {
    flex: 17,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  btnToJoin: {
    alignItems: 'center',
  },
  joinInfoText: {
    fontSize: 16,
    color: '#8E8E93',
    fontWeight: '400',
  },
  joinText: {
    fontSize: 16,
    color: '#16D66F',
    fontWeight: '700',
    marginTop: 12,
  },
});

export default ProfileScreen;