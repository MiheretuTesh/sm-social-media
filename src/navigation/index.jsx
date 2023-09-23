import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  CometChatUserProfile,
  CometChatUI,
  CometChatMessages,
  CometChatUserListWithMessages,
  CometChatUserList,
  CometChatGroupListWithMessages,
  CometChatGroupList,
  CometChatConversationListWithMessages,
  CometChatConversationList,
} from '../../cometchat-pro-react-native-ui-kit/CometChatWorkspace/src';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {CometChat} from '@cometchat-pro/react-native-chat';
import {COMETCHAT_AUTHID} from '@env';
import LoginPage from '../screens/Login';
import SignUpScreen from '../screens/SignUp';
import HeroScreen from '../screens/Hero';

const Stack = createStackNavigator();

const Navigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // let UID = 'SUPERHERO1';

  useEffect(() => {
    CometChat.getLoggedinUser().then(
      user => {
        if (!user) {
          setIsLoading(false);
          // CometChat.logout(), setIsLoading(false);
          // CometChat.login(UID, COMETCHAT_AUTHID).then(
          //   user => {
          //     console.log('Login Successful:', {user});
          //     setIsLoggedIn(true);
          //     setIsLoading(false); // Set loading to false when user check is complete
          //   },
          //   error => {
          //     console.log('Login failed with exception:', {error});
          //     setIsLoading(false); // Set loading to false even on login error
          //   },
          // );
        } else {
          // User is already logged in
          setIsLoggedIn(true);
          setIsLoading(false); // Set loading to false when user check is complete
        }
      },
      error => {
        console.log('Some Error Occurred', {error});
        setIsLoading(false); // Set loading to false on any error
      },
    );
  }, []);

  if (isLoading) {
    // Render a loading indicator or placeholder while user check is in progress
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      {
        <Stack.Navigator
          headerMode="none"
          initialRouteName={isLoggedIn ? 'CometChatUI' : 'HeroScreen'}>
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

          <Stack.Screen name="CometChatUI" component={CometChatUI} />
          <Stack.Screen
            name="Conversation"
            component={CometChatConversationListWithMessages}
          />
          <Stack.Screen
            name="ConversationComponent"
            component={CometChatConversationList}
          />
          <Stack.Screen
            name="Group"
            component={CometChatGroupListWithMessages}
          />
          <Stack.Screen name="GroupComponent" component={CometChatGroupList} />
          <Stack.Screen
            name="Users"
            component={CometChatUserListWithMessages}
          />
          <Stack.Screen name="UsersComponent" component={CometChatUserList} />
          <Stack.Screen
            name="CometChatMessages"
            component={CometChatMessages}
          />
        </Stack.Navigator>
      }
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
