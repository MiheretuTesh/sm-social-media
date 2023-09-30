import React from 'react';
import {View, Text} from 'react-native';
import {CometChatConversations} from '@cometchat/chat-uikit-react-native';

function ChatsScreen({navigation}) {
  return (
    <View>
      <CometChatConversations />
    </View>
  );
}

export default ChatsScreen;
