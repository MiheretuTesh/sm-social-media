import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {styles} from './index.style';
import {CometChatMessageComposer} from '@cometchat/chat-uikit-react-native';
import {CometChat} from '@cometchat/chat-sdk-react-native';

interface MessageComposerPorps {
  user: CometChat.User;
}

const MessageComposer = ({user}: MessageComposerPorps) => {
  return (
    <View style={styles.container}>
      <CometChatMessageComposer user={user} />
    </View>
  );
};

export default MessageComposer;
