import React from 'react';
import {View, Text} from 'react-native';
import {CometChatConversations} from '@cometchat/chat-uikit-react-native';

function ChatsScreen({navigation}) {
  return <CometChatConversations />;
}

export default ChatsScreen;
