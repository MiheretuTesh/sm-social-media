import React from 'react';
import {View} from 'react-native';
import {
  CometChatConversationsWithMessages,
  ListItemStyleInterface,
} from '@cometchat/chat-uikit-react-native';
import {CometChat} from '@cometchat/chat-sdk-react-native';
import {styles} from './index.style';

function ChatsScreen({navigation}: any) {
  let listItemStyle: ListItemStyleInterface = {
    backgroundColor: 'rgba(150,150,150,0.7)',
    height: 85,
    width: '100%',
    titleColor: 'blue',
    titleFont: {fontSize: 22},
    onPress: () => console.log('Hello'),
  };
  let conversationsConfiguration = {
    onItemPress: (value: CometChat.Conversation) => {
      console.log(value);
    },
  };
  return (
    <View style={styles.container}>
      <CometChatConversationsWithMessages
        conversationsConfiguration={conversationsConfiguration}
        listItemStyle={listItemStyle}
      />
    </View>
  );
}

export default ChatsScreen;
