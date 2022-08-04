// In index.js of a new project
import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {Dimensions} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width * 0.94;
const WIDTH = SCREEN_WIDTH * 0.95;

interface borderColor {
  color: string;
}

// 스크린
const HomeScreen = () => {
  return (
    <View style={styles.root}>
      <View style={styles.bannerView}>
        <View style={styles.banner}></View>
      </View>

      <View style={styles.postsView}>
        <View style={styles.checkBox}>
          <Text style={styles.checkBoxText}>인증된 식물만 보기</Text>
        </View>
        <View style={styles.posts}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.post}>
              <Text> Posts here</Text>
            </View>
            <View style={styles.post}>
              <Text> Posts here</Text>
            </View>
            <View style={styles.post}>
              <Text> Posts here</Text>
            </View>
            <View style={styles.post}>
              <Text> Posts here</Text>
            </View>
            <View style={styles.post}>
              <Text> Posts here</Text>
            </View>
            <View style={styles.post}>
              <Text> Posts here</Text>
            </View>
            <View style={styles.post}>
              <Text> Posts here</Text>
            </View>
            <View style={styles.post}>
              <Text> Posts here</Text>
            </View>
            <View style={styles.post}>
              <Text> Posts here</Text>
            </View>
            <View style={styles.post}>
              <Text> Posts here</Text>
            </View>
            <View style={styles.post}>
              <Text> Posts here</Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

HomeScreen.options = {
  topBar: {
    rightButtons: [
      {
        id: 'alarm',
        icon: require('./images/alarm.png'),
      },
      {
        id: 'category',
        icon: require('./images/category.png'),
        iconInsets: {},
      },
      {
        id: 'search',
        icon: require('./images/search.png'),
        iconInsets: {},
      },
    ],
  },
  bottomTab: {
    text: '홈',
  },
};

const AuctionScreen = () => {
  return (
    <View style={styles.root}>
      <Text>Auction Screen</Text>
    </View>
  );
};

AuctionScreen.options = {
  topBar: {
    title: {
      text: 'Auction',
    },
  },
  bottomTab: {
    text: '경매',
  },
};

const StoreScreen = () => {
  return (
    <View style={styles.root}>
      <Text>Settings Screen</Text>
    </View>
  );
};

StoreScreen.options = {
  topBar: {
    title: {
      text: 'Store',
    },
  },
  bottomTab: {
    text: '스토어',
  },
};

const ContentScreen = () => {
  return (
    <View style={styles.root}>
      <Text>Settings Screen</Text>
    </View>
  );
};

ContentScreen.options = {
  topBar: {
    title: {
      text: 'Content',
    },
  },
  bottomTab: {
    text: '콘텐츠',
  },
};

const ProfileScreen = () => {
  return (
    <View style={styles.root}>
      <Text>Settings Screen</Text>
    </View>
  );
};

ProfileScreen.options = {
  topBar: {
    title: {
      text: 'Profile',
    },
  },
  bottomTab: {
    text: '내정보',
  },
};

Navigation.registerComponent('Home', () => HomeScreen);
Navigation.registerComponent('Auction', () => AuctionScreen);
Navigation.registerComponent('Store', () => StoreScreen);
Navigation.registerComponent('Content', () => ContentScreen);
Navigation.registerComponent('Profile', () => ProfileScreen);

// 루트
const mainRoot = {
  root: {
    bottomTabs: {
      children: [
        {
          stack: {
            children: [
              {
                component: {
                  name: 'Home',
                },
              },
            ],
          },
        },
        {
          stack: {
            children: [
              {
                component: {
                  name: 'Auction',
                },
              },
            ],
          },
        },
        {
          stack: {
            children: [
              {
                component: {
                  name: 'Store',
                },
              },
            ],
          },
        },
        {
          stack: {
            children: [
              {
                component: {
                  name: 'Content',
                },
              },
            ],
          },
        },
        {
          stack: {
            children: [
              {
                component: {
                  name: 'Profile',
                },
              },
            ],
          },
        },
      ],
    },
  },
};

Navigation.setDefaultOptions({
  statusBar: {
    backgroundColor: 'whitesmoke',
  },
  topBar: {
    title: {
      color: 'black',
    },
    backButton: {
      color: 'white',
    },
    background: {
      color: 'whitesmoke',
    },
    scrollEdgeAppearance: {
      active: true,
      noBorder: true,
    },
  },
  bottomTab: {
    fontSize: 15,
    selectedFontSize: 15,
  },
});

Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.setRoot(mainRoot);
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'whitesmoke',
  },
  bannerView: {
    flex: 1,
    width: SCREEN_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
  banner: {
    width: WIDTH,
    height: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  bannerImage: {
    width: WIDTH,
    height: '100%',
  },
  checkBox: {
    flex: 1,
    width: WIDTH,
    justifyContent: 'center',
    marginBottom: 10,
  },
  checkBoxText: {
    fontSize: 14,
    color: 'grey',
    paddingLeft: 10,
  },
  postsView: {
    flex: 3,
    width: SCREEN_WIDTH,
    alignItems: 'center',
  },
  scrollView: {
    width: WIDTH,
  },
  posts: {
    flex: 17,
    width: WIDTH,
    alignItems: 'center',
  },
  post: {
    height: 120,
    width: WIDTH,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
});
