import React from 'react';
import {View, StyleSheet} from 'react-native';
import {CometChatConversationsWithMessages} from '@cometchat/chat-uikit-react-native';

function ChatsScreen({navigation}) {
  return (
    <View style={styles.container}>
      <CometChatConversationsWithMessages />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    felx: 1,
    height: '100%',
  },
});

export default ChatsScreen;
