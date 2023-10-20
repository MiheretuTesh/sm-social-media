import {Text, View} from 'react-native';
import React from 'react';
import {CometChatMessageList} from '@cometchat/chat-uikit-react-native';
import {styles} from './index.style';
import {CometChat} from '@cometchat/chat-sdk-react-native';

interface MessageListProps {
  user: CometChat.User;
}

const MessageList = ({user}: MessageListProps) => {
  return (
    <View style={styles.container}>
      <CometChatMessageList user={user} />
    </View>
  );
};

export default MessageList;
