import {Text, View} from 'react-native';
import React from 'react';
import {styles} from './index.style';
import {CometChatOutgoingCall} from '@cometchat/chat-uikit-react-native';

const OutgoingCall = ({navigation, route}) => {
  const {userMoreDetail} = route.params;

  console.log(userMoreDetail, 'userMoreDetail userMoreDetail userMoreDetail');
  let msgObj = {
    action: 'initiated',
    getCategory: () => 'call',
    getReceiver: () => {
      return {
        getAvatar: () =>
          'https://data-us.cometchat.io/assets/images/avatars/ironman.png',
        getBlockedByMe: () => false,
        getDeactivatedAt: () => 0,
        getHasBlockedMe: () => userMoreDetail.conversationWith.hasBlockedMe,
        getLastActiveAt: () => userMoreDetail.conversationWith.lastActiveAt,
        getName: () => userMoreDetail.conversationWith.name,
        getRole: () => userMoreDetail.conversationWith.role,
        getStatus: () => userMoreDetail.conversationWith.status,
        getUid: () => userMoreDetail.conversationWith.uid,
      };
    },
    getSender: () => {
      return {
        getAvatar: () =>
          'https://data-us.cometchat.io/assets/images/avatars/ironman.png',
        getBlockedByMe: () => userMoreDetail.sender.blockedByMe,
        getDeactivatedAt: () => userMoreDetail.sender.deactivatedAt,
        getHasBlockedMe: () => userMoreDetail.sender.hasBlockedMe,
        getLastActiveAt: () => userMoreDetail.sender.lastActiveAt,
        getName: () => userMoreDetail.sender.name,
        getRole: () => userMoreDetail.sender.role,
        getStatus: () => userMoreDetail.sender.status,
        getUid: () => userMoreDetail.sender.uid,
      };
    },
    callInitiator: {
      blockedByMe: false,
      deactivatedAt: 0,
      hasBlockedMe: false,
      lastActiveAt: 1693573660,
      name: 'Hulk',
      role: 'default',
      status: 'online',
      uid: 'hulk123',
    },
    callReceiver: {
      avatar: 'https://data-us.cometchat.io/assets/images/avatars/ironman.png',
      blockedByMe: false,
      deactivatedAt: 0,
      hasBlockedMe: false,
      lastActiveAt: 1684838515,
      name: 'Iron Man',
      role: 'default',
      status: 'online',
      uid: 'superhero1',
    },
    category: 'call',
    conversationId: 'hulk123_user_superhero1',
    data: {
      action: 'initiated',
      entities: {by: [Object], for: [Object], on: [Object]},
      resource:
        'REACT_NATIVE-4_0_0-d4c7ff98-7df0-4cda-87a0-042d24c7d592-1693575737245',
    },
    id: '2889',
    initiatedAt: 1693576153,
    joinedAt: 1693576153,
    rawMessage: {
      category: 'call',
      conversationId: 'hulk123_user_superhero1',
      data: {
        action: 'initiated',
        entities: [Object],
        resource:
          'REACT_NATIVE-4_0_0-d4c7ff98-7df0-4cda-87a0-042d24c7d592-1693575737245',
      },
      id: '2889',
      receiver: 'vsbfwjn4otu7bg7icndf6xisrga2',
      receiverType: 'user',
      sender: 'hulk123',
      sentAt: 1693576153,
      type: 'audio',
      updatedAt: 1693576153,
    },
    receiver: {
      avatar: 'https://data-us.cometchat.io/assets/images/avatars/ironman.png',
      blockedByMe: false,
      deactivatedAt: 0,
      hasBlockedMe: false,
      lastActiveAt: 1684838515,
      name: 'Iron Man',
      role: 'default',
      status: 'online',
      uid: 'vsbfwjn4otu7bg7icndf6xisrga2',
    },
    receiverId: 'superhero1',
    receiverType: 'user',
    sender: {
      blockedByMe: false,
      deactivatedAt: 0,
      hasBlockedMe: false,
      lastActiveAt: 1693573660,
      name: 'Hulk',
      role: 'default',
      status: 'online',
      uid: 'bu859njgggapkaamlpksdbczyvf3',
    },
    sentAt: 1693576153,
    sessionId:
      'v1.us.239414efb0e4882a.1693576153e0dfe098a411c7c30f25e4382a150c64104f228e',
    status: 'initiated',
    type: 'audio',
    updatedAt: 1693576153,
  };
  return (
    <View style={styles.container}>
      <CometChatOutgoingCall
        onDeclineButtonPressed={() => navigation.goBack()}
        onError={navigation.goBack()}
        call={msgObj}
      />
    </View>
  );
};

export default OutgoingCall;

const t = {
  conversationId:
    'bu859njgggapkaamlpksdbczyvf3_user_vsbfwjn4otu7bg7icndf6xisrga2',
  conversationType: 'user',
  conversationWith: {
    blockedByMe: false,
    conversationId:
      'bu859njgggapkaamlpksdbczyvf3_user_vsbfwjn4otu7bg7icndf6xisrga2',
    deactivatedAt: 0,
    hasBlockedMe: false,
    lastActiveAt: 1697529741,
    name: 'Jod an',
    role: 'default',
    status: 'offline',
    uid: 'bu859njgggapkaamlpksdbczyvf3',
  },
  lastMessage: {
    category: 'message',
    conversationId:
      'bu859njgggapkaamlpksdbczyvf3_user_vsbfwjn4otu7bg7icndf6xisrga2',
    data: {
      entities: [Object],
      metadata: [Object],
      resource:
        'REACT_NATIVE-4_0_0-84cc5397-99dc-4cbe-a8d4-cc62f08265e2-1697460913983',
      text: 'Hi ',
    },
    deliveredAt: 1697557184,
    id: '12140',
    metadata: {'@injected': [Object]},
    muid: '1697462157',
    rawMessage: {
      category: 'message',
      conversationId:
        'bu859njgggapkaamlpksdbczyvf3_user_vsbfwjn4otu7bg7icndf6xisrga2',
      data: [Object],
      deliveredAt: 1697557184,
      id: '12140',
      muid: '1697462157',
      readAt: 1697557184,
      receiver: 'vsbfwjn4otu7bg7icndf6xisrga2',
      receiverType: 'user',
      sender: 'bu859njgggapkaamlpksdbczyvf3',
      sentAt: 1697462157,
      type: 'text',
      updatedAt: 1697557184,
    },
    readAt: 1697557184,
    receiver: {
      blockedByMe: false,
      deactivatedAt: 0,
      hasBlockedMe: false,
      lastActiveAt: 1697226397,
      name: 'Miheretu Degebassa',
      role: 'default',
      status: 'offline',
      uid: 'vsbfwjn4otu7bg7icndf6xisrga2',
    },
    receiverId: 'vsbfwjn4otu7bg7icndf6xisrga2',
    receiverType: 'user',
    sender: {
      blockedByMe: false,
      deactivatedAt: 0,
      hasBlockedMe: false,
      lastActiveAt: 1697461993,
      name: 'Jod an',
      role: 'default',
      status: 'online',
      uid: 'bu859njgggapkaamlpksdbczyvf3',
    },
    sentAt: 1697462157,
    text: 'Hi ',
    type: 'text',
    updatedAt: 1697557184,
  },
  unreadMessageCount: 0,
};
