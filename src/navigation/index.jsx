import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  CometChatMessages,
  CometChatUserListWithMessages,
  CometChatUserList,
  CometChatGroupListWithMessages,
  CometChatGroupList,
  CometChatConversationListWithMessages,
  CometChatConversationList,
  CometChatConversationsWithMessages,
} from '@cometchat/chat-uikit-react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './home';
import UsersScreen from '../screens/Users';
import ChatsScreen from '../screens/Chats';
import ChatDetailScreen from '../screens/ChatDetail';
import {CometChat} from '@cometchat-pro/react-native-chat';
import {COMETCHAT_AUTHID} from '@env';
import LoginPage from '../screens/Login';
import SignUpScreen from '../screens/SignUp';
import HeroScreen from '../screens/Hero';
import {useDispatch, useSelector} from 'react-redux';
import {authCheckState} from '../store/reducers/auth/authAction';

const Stack = createStackNavigator();

const Navigation = props => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  let UID = 'SUPERHERO1';

  const {user, isLoggedIn, error, loading} = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(authCheckState());
    console.log(isLoggedIn, "Yes I'm logged in");
  }, []);

  useEffect(() => {
    console.log(isLoggedIn);
  }, [isLoggedIn]);

  // useEffect(() => {
  //   CometChat.getLoggedinUser().then(
  //     user => {
  //       if (!user) {
  //         CometChat.login(UID, COMETCHAT_AUTHID).then(
  //           user => {
  //             console.log('Login Successful:', {user});
  //             setIsLoggedIn(true);
  //             setIsLoading(false); // Set loading to false when user check is complete
  //           },
  //           error => {
  //             console.log('Login failed with exception:', {error});
  //             setIsLoading(false); // Set loading to false even on login error
  //           },
  //         );
  //       } else {
  //         // User is already logged in
  //         setIsLoggedIn(true);
  //         setIsLoading(false); // Set loading to false when user check is complete
  //       }
  //     },
  //     error => {
  //       console.log('Some Error Occurred', {error});
  //       setIsLoading(false); // Set loading to false on any error
  //     },
  //   );
  // }, []);

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
          initialRouteName={isLoggedIn ? 'HomeScreen' : 'HeroScreen'}>
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

          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen
            name="MessageScreen"
            component={CometChatConversationsWithMessages}
          />

          <Stack.Screen name="Users" component={UsersScreen} />
          <Stack.Screen name="Chats" component={ChatsScreen} />
          <Stack.Screen name="ChatDetail" component={ChatDetailScreen} />

          {/* <Stack.Screen
            name="Conversation"
            component={CometChatConversationListWithMessages}
          /> */}
          {/* <Stack.Screen
            name="ConversationComponent"
            component={CometChatConversationList}
          />
          <Stack.Screen
            name="Group"
            component={CometChatGroupListWithMessages}
            // options={{headerShown: false}}
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
          /> */}
        </Stack.Navigator>
      }
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
