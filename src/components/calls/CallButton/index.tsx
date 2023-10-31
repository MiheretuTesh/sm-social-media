import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import {CometChatCallButtons} from '@cometchat/chat-uikit-react-native';
import {styles} from './index.style';
import {UserContext} from '../../../../UserContext';

export const CallButton = () => {
  const {user} = useContext(UserContext);

  return (
    <View style={[styles.container]}>
      <CometChatCallButtons user={user} />
    </View>
  );
};
