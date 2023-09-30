import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {CometChatConversationsWithMessages} from '@cometchat/chat-uikit-react-native';

const ChatDetailScreen = () => {
  return (
    <View>
      <CometChatConversationsWithMessages />
    </View>
  );
};

export default ChatDetailScreen;

const styles = StyleSheet.create({});
