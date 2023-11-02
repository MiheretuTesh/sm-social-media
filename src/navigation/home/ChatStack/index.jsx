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
} from '@cometchat/chat-uikit-react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {CometChat} from '@cometchat-pro/react-native-chat';
import {COMETCHAT_AUTHID} from '@env';
import {useDispatch, useSelector} from 'react-redux';
import ChatsScreen from '../../../screens/Chats';
import ChatDetailScreen from '../../../screens/ChatDetail';

const Stack = createStackNavigator();

const ChatNavigation = ({navigation}) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  let UID = 'SUPERHERO1';

  //   const {user, isLoggedIn, error, loading} = useSelector(state => state.auth);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Loading...</Text>
      </View>
    );
  }
  let user = new CometChat.User('Jod an', 'Jod an');

  return (
    <Stack.Navigator headerMode="none" initialRouteName={'ChatsScreen'}>
      <Stack.Screen
        name="ChatsScreen"
        component={ChatsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChatScreen"
        component={ChatDetailScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default ChatNavigation;

const styles = StyleSheet.create({});
