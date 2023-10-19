import React from 'react';
import {View, StyleSheet} from 'react-native';
import {CometChatGroupsWithMessages} from '@cometchat/chat-uikit-react-native';

function GroupScreen({navigation}) {
  return (
    <View style={styles.container}>
      <CometChatGroupsWithMessages />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    felx: 1,
    height: '100%',
  },
});

export default GroupScreen;
