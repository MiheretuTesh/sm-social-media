import React from 'react';
import {CometChatDetails} from '@cometchat/chat-uikit-react-native';
import {CometChat} from '@cometchat/chat-sdk-react-native';

export const Details = props => {
  let user: CometChat.User = {
    name: 'Spiderman',
    uid: '27pcpqc7wsc1tm1oi3d2drryoah2',
    avatar: 'https://data-us.cometchat.io/assets/images/avatars/spiderman.png',
    role: 'test',
    status: 'online',
    statusMessage: 'This is now status',
    getStatus: () => 'online',
    getUid: () => 'superhero1',
    getAvatar: () =>
      'https://data-us.cometchat.io/assets/images/avatars/spiderman.png',
    getBlockedByMe: () => true,
    getDeactivatedAt: () => 0,
    getHasBlockedMe: () => false,
    getLastActiveAt: () => 1686810809,
    getName: () => 'Spiderman',
    getRole: () => 'default',
  };

  return (
    <CometChatDetails user={user} onBack={() => props.navigation.goBack()} />
  );
};
