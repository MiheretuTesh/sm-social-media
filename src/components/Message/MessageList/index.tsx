import {View} from 'react-native';
import React from 'react';
import {CometChatMessageList} from '@cometchat/chat-uikit-react-native';
import {styles} from './index.style';
import {CometChat} from '@cometchat/chat-sdk-react-native';

interface MessageListProps {
  user: CometChat.User;
}

const MessageList = ({user}: MessageListProps) => {
  // let limit = 30;
  // let categories = ['message'];
  // let types = ['text', 'image', 'video', 'audio', 'file'];
  // let messageRequestBuilder = new CometChat.MessagesRequestBuilder()
  //   .setUID(user.uid)
  //   .setCategories(categories)
  //   .setTypes(types)
  //   .setLimit(limit);
  return (
    <View style={styles.container}>
      <CometChatMessageList user={user} />
    </View>
  );
};

export default MessageList;
