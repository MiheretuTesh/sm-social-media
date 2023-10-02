import React from 'react';
import {View, Text} from 'react-native';
import {CometChatUsers, localize} from '@cometchat/chat-uikit-react-native';

function UsersScreen({navigation}) {
  return (
    <CometChatUsers
      title={localize('USER')}
      onItemPress={() => navigation.navigate('CometChatMessages')}
    />
  );
}

export default UsersScreen;
