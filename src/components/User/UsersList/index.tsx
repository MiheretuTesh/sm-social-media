import {View} from 'react-native';
import React from 'react';
import {styles} from './index.style';
import {CometChatUsers} from '@cometchat/chat-uikit-react-native';
import {CometChat} from '@cometchat/chat-sdk-react-native';

const CometChatUsersList = ({navigation}: any) => {
  let onItemPress = (value: CometChat.User) => {
    console.log(value, 'value value');

    const UID: string = value?.uid;
    CometChat.getUser(UID).then(
      user => {
        console.log('User details fetched for user:', user);
        navigation.push('ChatDetailScreen', {
          user: user,
          userMoreDetail: value,
        });
      },
      error => {
        console.log('User details fetching failed with error:', error);
      },
    );
  };
  return (
    <View style={styles.container}>
      <CometChatUsers onItemPress={onItemPress} />
    </View>
  );
};

export default CometChatUsersList;
