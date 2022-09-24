import React, {useState,useEffect} from 'react';
import {View, Text, SafeAreaView, StyleSheet,Platform,TouchableOpacity,Image} from 'react-native';
import BottomTab from '../components/BottomTab';
import auth from '@react-native-firebase/auth';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'
import storage from '@react-native-firebase/storage';
import { utils } from '@react-native-firebase/app';


function AuctionScreen({navigation}: any) {
  const [refer, setRefer] = useState<any>(null);
const [asset, setAsset] = useState<any>(null);
const [down, setDown] = useState<any>(null);

const loadImage = () => {
  launchImageLibrary(
    {
    mediaType: 'photo',
    maxWidth:300,
    maxHeight:300,
    //안드로이드는 이미지를 업로드를 할 때 base64로 인코딩해서 사용해야함(google photo 권한 이슈)
    includeBase64: Platform.OS === 'android'
    },// 여기까지 option
    (res) => {
      if(res.didCancel) {
        return null;
      }
      if(res.assets){
        const ass = res.assets[0];
        //firebase storage 사용을 위해 reference 생성
        const refernce = storage().ref(`${ass.fileName}`); 
        setRefer(refernce);
        setAsset(ass);
        console.log(ass)
        console.log(refernce)
      }
    }// 여기까지 callback
  )
}
const upload = async() =>{
  const pathToFile = `${utils.FilePath.PICTURES_DIRECTORY}/${refer}`;
  await refer.putFile(asset.uri, {
    contentType: asset.type
  });
  console.log('업로드 완료');
}
  
return (
  <SafeAreaView>
    <Text>앨범에서 불러오기</Text>
    <TouchableOpacity style={{ width: 200, height: 200, borderWidth:1}}
      onPress={loadImage}
    >
      <Image style={{width: 200, height: 200}}source={{uri: asset?.uri}} />
    </TouchableOpacity>
    
    <TouchableOpacity onPress={upload}>
      <Text>이미지 업로드</Text>
    </TouchableOpacity>
    
    <Image style={{width: 100, height: 100}}source={{uri: down}} />
  </SafeAreaView>
);
}

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default AuctionScreen;

