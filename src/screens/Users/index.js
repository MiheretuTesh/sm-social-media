import React from 'react';
import {View, Text} from 'react-native';
import {CometChatGroups} from '@cometchat/chat-uikit-react-native';

function UsersScreen({navigation}) {
  return (
    <View>
      <CometChatGroups />
    </View>
  );
}

export default UsersScreen;
