import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  CometChatUsersWithMessages,
  localize,
} from '@cometchat/chat-uikit-react-native';

function UsersScreen({navigation}) {
  return (
    <View style={styles.container}>
      <CometChatUsersWithMessages />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    felx: 1,
    height: '100%',
  },
});

export default UsersScreen;
