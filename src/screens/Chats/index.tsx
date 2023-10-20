import React from 'react';
import {View, StyleSheet} from 'react-native';
import {
  CometChatConversationsWithMessages,
  CometChatConversations,
  ListItemStyleInterface,
} from '@cometchat/chat-uikit-react-native';
import {CometChat} from '@cometchat/chat-sdk-react-native';

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
    // avatarStyle: {
    //   borderRadius: 20,
    //   backgroundColor: 'red',
    // },
    // disableSoundForMessages: true,
    onItemPress: (value: CometChat.Conversation) => {
      console.log(value);
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
        listItemStyle={listItemStyle}
      />
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

const t = {
  conversationId:
    'kqvgvnhwngbqip2hki9p85frpyb2_user_vsbfwjn4otu7bg7icndf6xisrga2',
  conversationType: 'user',
  conversationWith: {
    blockedByMe: false,
    conversationId:
      'kqvgvnhwngbqip2hki9p85frpyb2_user_vsbfwjn4otu7bg7icndf6xisrga2',
    deactivatedAt: 0,
    hasBlockedMe: false,
    lastActiveAt: 1696239010,
    name: 'Jod an',
    role: 'default',
    status: 'offline',
    uid: 'kqvgvnhwngbqip2hki9p85frpyb2',
  },
  lastMessage: {
    category: 'custom',
    conversationId:
      'kqvgvnhwngbqip2hki9p85frpyb2_user_vsbfwjn4otu7bg7icndf6xisrga2',
    customData: undefined,
    data: {customData: undefined, entities: [Object], subType: undefined},
    deletedAt: 1696231395,
    deletedBy: 'vsbfwjn4otu7bg7icndf6xisrga2',
    deliveredAt: 1696231390,
    id: '11972',
    muid: '1696231393500',
    rawMessage: {
      category: 'custom',
      conversationId:
        'kqvgvnhwngbqip2hki9p85frpyb2_user_vsbfwjn4otu7bg7icndf6xisrga2',
      data: [Object],
      deletedAt: 1696231395,
      deletedBy: 'vsbfwjn4otu7bg7icndf6xisrga2',
      deliveredAt: 1696231390,
      id: '11972',
      muid: '1696231393500',
      receiver: 'kqvgvnhwngbqip2hki9p85frpyb2',
      receiverType: 'user',
      sender: 'vsbfwjn4otu7bg7icndf6xisrga2',
      sentAt: 1696231390,
      type: 'extension_sticker',
      updatedAt: 1696231395,
    },
    receiver: {
      blockedByMe: false,
      deactivatedAt: 0,
      hasBlockedMe: false,
      lastActiveAt: 1696231011,
      name: 'Jod an',
      role: 'default',
      status: 'online',
      uid: 'kqvgvnhwngbqip2hki9p85frpyb2',
    },
    receiverId: 'kqvgvnhwngbqip2hki9p85frpyb2',
    receiverType: 'user',
    sender: {
      blockedByMe: false,
      deactivatedAt: 0,
      hasBlockedMe: false,
      lastActiveAt: 1696230856,
      name: 'Miheretu Degebassa',
      role: 'default',
      status: 'online',
      uid: 'vsbfwjn4otu7bg7icndf6xisrga2',
    },
    sentAt: 1696231390,
    subType: undefined,
    type: 'extension_sticker',
    updatedAt: 1696231395,
  },
  unreadMessageCount: 0,
};

const g = {
  conversationId: 'group_group_166958721228',
  conversationType: 'group',
  conversationWith: {
    conversationId: 'group_group_166958721228',
    createdAt: 1669587212,
    guid: 'group_166958721228',
    hasJoined: true,
    icon: 'https://thumbs.dreamstime.com/b/outdoor-sports-concept-athletic-young-muslim-woman-sportswear-doing-fitness-exercises-stretching-her-legs-park-free-space-251815176.jpg',
    joinedAt: 1696088210,
    membersCount: 62,
    name: 'Fitness Fanatics',
    onlineMembersCount: 33,
    owner: 'tohjppgcprf1cv2ha3dhskcomjs2',
    scope: 'participant',
    type: 'public',
    updatedAt: 1696088210,
  },
  lastMessage: {
    action: 'joined',
    actionBy: {
      blockedByMe: false,
      deactivatedAt: 0,
      hasBlockedMe: false,
      lastActiveAt: 1696087947,
      name: 'Miheretu Degebassa',
      role: 'default',
      status: 'available',
      uid: 'vsbfwjn4otu7bg7icndf6xisrga2',
    },
    actionFor: {
      conversationId: 'group_group_166958721228',
      createdAt: 1669587212,
      guid: 'group_166958721228',
      hasJoined: false,
      icon: 'https://thumbs.dreamstime.com/b/outdoor-sports-concept-athletic-young-muslim-woman-sportswear-doing-fitness-exercises-stretching-her-legs-park-free-space-251815176.jpg',
      membersCount: 62,
      name: 'Fitness Fanatics',
      onlineMembersCount: 31,
      owner: 'tohjppgcprf1cv2ha3dhskcomjs2',
      type: 'public',
      updatedAt: 1696088210,
    },
    actionOn: undefined,
    category: 'action',
    conversationId: 'group_group_166958721228',
    data: {
      action: 'joined',
      entities: [Object],
      resource:
        'REACT_NATIVE-4_0_0-f08386e5-82bb-462f-b87a-d2e8385b66dd-1696087923854',
    },
    id: '11942',
    message: 'Miheretu Degebassa joined',
    rawMessage: {
      category: 'action',
      conversationId: 'group_group_166958721228',
      data: [Object],
      id: '11942',
      receiver: 'group_166958721228',
      receiverType: 'group',
      sender: 'vsbfwjn4otu7bg7icndf6xisrga2',
      sentAt: 1696088210,
      type: 'groupMember',
      updatedAt: 1696088210,
    },
    receiver: {
      conversationId: 'group_group_166958721228',
      createdAt: 1669587212,
      guid: 'group_166958721228',
      hasJoined: false,
      icon: 'https://thumbs.dreamstime.com/b/outdoor-sports-concept-athletic-young-muslim-woman-sportswear-doing-fitness-exercises-stretching-her-legs-park-free-space-251815176.jpg',
      membersCount: 62,
      name: 'Fitness Fanatics',
      onlineMembersCount: 31,
      owner: 'tohjppgcprf1cv2ha3dhskcomjs2',
      type: 'public',
      updatedAt: 1696088210,
    },
    receiverId: 'group_166958721228',
    receiverType: 'group',
    sender: {
      blockedByMe: false,
      deactivatedAt: 0,
      hasBlockedMe: false,
      lastActiveAt: 1696087947,
      name: 'Miheretu Degebassa',
      role: 'default',
      status: 'available',
      uid: 'vsbfwjn4otu7bg7icndf6xisrga2',
    },
    sentAt: 1696088210,
    type: 'groupMember',
    updatedAt: 1696088210,
  },
  unreadMessageCount: 0,
};
