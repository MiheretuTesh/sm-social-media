import {Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './index.style';
import {CometChatOutgoingCall} from '@cometchat/chat-uikit-react-native';

const OutgoingCall = ({navigation, route}: any) => {
  const {userMoreDetail} = route.params;

  const [senderInfo, setSenderInfo] = useState({});

  useEffect(() => {
    setSenderInfo({});
  }, []);

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
        getBlockedByMe: () => userMoreDetail.lastMessage.sender.blockedByMe,
        getDeactivatedAt: () => userMoreDetail.lastMessage.sender.deactivatedAt,
        getHasBlockedMe: () => userMoreDetail.lastMessage.sender.hasBlockedMe,
        getLastActiveAt: () => userMoreDetail.lastMessage.sender.lastActiveAt,
        getName: () => userMoreDetail.lastMessage.sender.name,
        getRole: () => userMoreDetail.lastMessage.sender.role,
        getStatus: () => userMoreDetail.lastMessage.sender.status,
        getUid: () => userMoreDetail.lastMessage.sender.uid,
      };
    },
    callInitiator: {
      blockedByMe: userMoreDetail.lastMessage.sender.blockedByMe,
      deactivatedAt: userMoreDetail.lastMessage.sender.deactivatedAt,
      hasBlockedMe: userMoreDetail.lastMessage.sender.hasBlockedMe,
      lastActiveAt: userMoreDetail.lastMessage.sender.lastActiveAt,
      name: userMoreDetail.lastMessage.sender.name,
      role: userMoreDetail.lastMessage.sender.role,
      status: userMoreDetail.lastMessage.sender.status,
      uid: userMoreDetail.lastMessage.sender.uid,
    },
    callReceiver: {
      avatar: 'https://data-us.cometchat.io/assets/images/avatars/ironman.png',
      blockedByMe: userMoreDetail.conversationWith.blockedByMe,
      deactivatedAt: userMoreDetail.conversationWith.deactivatedAt,
      hasBlockedMe: userMoreDetail.conversationWith.hasBlockedMe,
      lastActiveAt: userMoreDetail.conversationWith.lastActiveAt,
      name: userMoreDetail.conversationWith.name,
      role: userMoreDetail.conversationWith.role,
      status: userMoreDetail.conversationWith.status,
      uid: userMoreDetail.conversationWith.uid,
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
      conversationId:
        'bu859njgggapkaamlpksdbczyvf3_user_cmelo7jds3fl5xnnpyugu2nsmvx2',
      data: {
        action: 'initiated',
        entities: [Object],
        resource:
          'REACT_NATIVE-4_0_0-d4c7ff98-7df0-4cda-87a0-042d24c7d592-1693575737245',
      },
      id: '12430',
      receiver: 'bu859njgggapkaamlpksdbczyvf3',
      receiverType: 'user',
      sender: 'cmelo7jds3fl5xnnpyugu2nsmvx2',
      sentAt: 1698387847,
      type: 'audio',
      updatedAt: 1698387847,
    },
    receiver: {
      avatar: 'https://data-us.cometchat.io/assets/images/avatars/ironman.png',
      blockedByMe: userMoreDetail.conversationWith.blockedByMe,
      deactivatedAt: userMoreDetail.conversationWith.deactivatedAt,
      hasBlockedMe: userMoreDetail.conversationWith.hasBlockedMe,
      lastActiveAt: userMoreDetail.conversationWith.lastActiveAt,
      name: userMoreDetail.conversationWith.name,
      role: userMoreDetail.conversationWith.role,
      status: userMoreDetail.conversationWith.status,
      uid: userMoreDetail.conversationWith.uid,
    },
    receiverId: 'bu859njgggapkaamlpksdbczyvf3',
    receiverType: 'user',
    sender: {
      blockedByMe: userMoreDetail.lastMessage.sender.blockedByMe,
      deactivatedAt: userMoreDetail.lastMessage.sender.deactivatedAt,
      hasBlockedMe: userMoreDetail.lastMessage.sender.hasBlockedMe,
      lastActiveAt: userMoreDetail.lastMessage.sender.lastActiveAt,
      name: userMoreDetail.lastMessage.sender.name,
      role: userMoreDetail.lastMessage.sender.role,
      status: userMoreDetail.lastMessage.sender.status,
      uid: userMoreDetail.lastMessage.sender.uid,
    },
    sentAt: 1698387847,
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
