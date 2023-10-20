import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  CometChatConversations,
  ListItemStyleInterface,
  CometChatConversationsWithMessages,
} from '@cometchat/chat-uikit-react-native';
import {CometChat} from '@cometchat/chat-sdk-react-native';

const ConversationComponentList = ({navigation}) => {
  // let listItemStyle: ListItemStyleInterface = {
  // backgroundColor: 'rgba(150,150,150,0.7)',
  // height: 85,
  // width: '100%',
  // titleColor: 'blue',
  //   // titleFont: {fontSize: 22},
  //   onPress: () => {
  //     console.log('Hello');
  //   },
  // };
  let conversationsConfiguration = {
    // avatarStyle: {
    //   borderRadius: 20,
    //   backgroundColor: 'red',
    // },
    // disableSoundForMessages: true,
    onItemPress: (value: CometChat.Conversation) => {
      // console.log(value);
      let UID = value?.conversationWith.uid;
      CometChat.getUser(UID).then(
        user => {
          console.log('User details fetched for user:', user);
          navigation.push('ChatDetailScreen', {user: user});
        },
        error => {
          console.log('User details fetching failed with error:', error);
        },
      );
      // navigation.push('ChatScreen', {
      //   uid: value?.lastMessage.receiver.uid,
      //   name: value?.lastMessage.receiver.name,
      // });
    },
  };
  return (
    <View style={styles.container}>
      <CometChatConversationsWithMessages
        conversationsConfiguration={conversationsConfiguration}
        // listItemStyle={listItemStyle}
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
