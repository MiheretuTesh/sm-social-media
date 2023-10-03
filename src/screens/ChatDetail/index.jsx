import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {CometChatMessages} from '@cometchat/chat-uikit-react-native';
import {
  CometChat,
  ThreadedMessagesConfigurationInterface,
  MessageHeaderConfigurationInterface,
} from '@cometchat-pro/react-native-chat';
import Ionicons from 'react-native-vector-icons';

const ChatDetailScreen = ({navigation, route}) => {
  const {uid, name} = route.params;
  console.log(uid, name, 'Come On Bro');
  let user = new CometChat.User(uid, name);

  let messageHeaderConfiguration = {
    hideBackIcon: false,
  };

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    });
    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: undefined,
      });
  }, [navigation]);

  return (
    <View style={{flex: 1}}>
      <CometChatMessages
        user={user}
        messageHeaderConfiguration={messageHeaderConfiguration}
      />
    </View>
  );
};

export default ChatDetailScreen;

const styles = StyleSheet.create({});
