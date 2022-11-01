import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
} from 'react-native';

export default function BottomTab({navigation}: any) {
  return (
    <View style={styles.tabView}>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => navigation.navigate('NavHome')}>
        <View>
          <Image
            style={styles.iconImage}
            source={require('../assets/Home.png')}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => navigation.navigate('NavCommunity')}>
        <View>
          <Image
            style={styles.iconImage}
            source={require('../assets/Community.png')}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => navigation.navigate('NavChatting')}>
        <View>
          <Image
            style={styles.iconImage}
            source={require('../assets/Chatting.png')}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => navigation.navigate('NavProfile')}>
        <View>
          <Image
            style={styles.iconImage}
            source={require('../assets/Profile.png')}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tabView: {
    height: Platform.OS === 'ios' ? '7%' : '8%',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingLeft: '6%',
    paddingRight: '6%',
    paddingTop: Platform.OS === 'ios' ? '4%' : '4%',
    paddingBottom: '5%',
    borderTopWidth: 0,
    borderTopColor: '#FFFFFF',
    backgroundColor: '#FFFFFF',
  },
  tab: {},
  iconImage: {},
});
