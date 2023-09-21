import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {CometChatUI} from '../../cometchat-pro-react-native-ui-kit/CometChatWorkspace/src';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {CometChat} from '@cometchat-pro/react-native-chat';
import {COMETCHAT_AUTHID} from '@env';
import LoginPage from '../screens/Login';
import SignUpScreen from '../screens/SignUp';
import HeroScreen from '../screens/Hero';

const Stack = createStackNavigator();

const Navigation = () => {
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

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HeroScreen">
        <Stack.Screen
          name="HeroScreen"
          component={HeroScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUpScreen"
          component={SignUpScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CometChatUI"
          component={CometChatUI}
          options={{headerLeft: null}}
        />
      </Stack.Navigator>
      {/* {isLoggedIn ? <CometChatUI /> : <HeroScreen />} */}
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
