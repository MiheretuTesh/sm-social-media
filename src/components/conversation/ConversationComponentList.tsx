import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {CometChatConversationsWithMessages} from '@cometchat/chat-uikit-react-native';

const ConversationComponentList = () => {
  return (
    <View>
      <CometChatConversationsWithMessages />
    </View>
  );
};

export default ConversationComponentList;

const styles = StyleSheet.create({});
