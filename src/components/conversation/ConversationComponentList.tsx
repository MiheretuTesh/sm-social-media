import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {CometChatConversationsWithMessages} from '@cometchat/chat-uikit-react-native';
import {CometChat} from '@cometchat/chat-sdk-react-native';

const ConversationComponentList = ({navigation}: any) => {
  let conversationsConfiguration = {
    onItemPress: (value: CometChat.Conversation) => {
      let UID: any = value?.conversationWith.uid;
      CometChat.getUser(UID).then(
        user => {
          console.log('User details fetched for user:', user);
          navigation.push('ChatDetailScreen', {
            user: user,
            userMoreDetail: value,
          });
        },
        error => {
          console.log('User details fetching failed with error:', error);
        },
      );
    },
  };
  return (
    <View style={styles.container}>
      <CometChatConversationsWithMessages
        conversationsConfiguration={conversationsConfiguration}
      />
    </View>
  );
};

export default ConversationComponentList;

const styles = StyleSheet.create({
  container: {
    felx: 1,
    height: '100%',
  },
});
