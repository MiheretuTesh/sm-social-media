/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import type {PropsWithChildren} from 'react';

import {CometChat} from '@cometchat-pro/react-native-chat';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {COMETCHAT_AUTHID} from '@env';
import {CometChatUI} from './cometchat-pro-react-native-ui-kit/CometChatWorkspace/src';
import {CometChatAvatar} from './cometchat-pro-react-native-ui-kit/CometChatWorkspace/src';
import {NavigationContainer} from '@react-navigation/native';
type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>

      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  //login method
  let UID = 'SUPERHERO1';
  CometChat.getLoggedinUser().then(
    user => {
      if (!user) {
        CometChat.login(UID, COMETCHAT_AUTHID).then(
          user => {
            console.log('Login Successful:', {user});
          },
          error => {
            console.log('Login failed with exception:', {error});
          },
        );
      }
    },
    error => {
      console.log('Some Error Occured', {error});
    },
  );

  // create user method
  // let uid = 'SUPERHERO1';
  // let name = 'Kevin';

  // let user = new CometChat.User(uid);

  // user.setName(name);

  // CometChat.createUser(user, COMETCHAT_AUTHID).then(
  //   user => {
  //     console.log('user created', user);+6+0
  //   },
  //   error => {
  //     console.log('error', error);
  //   },
  // );

  return (
    <View style={{flex: 1}}>
      <NavigationContainer>
        <CometChatUI />
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
