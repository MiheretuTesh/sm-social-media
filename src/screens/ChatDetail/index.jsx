import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {
  CometChat,
  ThreadedMessagesConfigurationInterface,
  MessageHeaderConfigurationInterface,
} from '@cometchat-pro/react-native-chat';
import Ionicons from 'react-native-vector-icons';
import MessageHeader from '../../components/Message/Messageheader';
import MessageList from '../../components/Message/MessageList';
import MessageComposer from '../../components/Message/MessageComposer';

const ChatDetailScreen = ({navigation, route}) => {
  const {user} = route.params;

  const handleNavigation = () => {
    navigation.replace('ConversationComponentList');
  };
  const handleUserDetailNavigation = () => {
    navigation.navigate('ChatUserDetailScreen');
  };

  const handleCallClick = () => {
    navigation.replace('OutgoingCallScreen');
  };

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    });
    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: undefined,
      });
  }, [navigation]);

  return (
    <View style={{flex: 1}}>
      <MessageHeader
        user={user}
        handleNavigation={handleNavigation}
        handleCallClick={handleCallClick}
        handleUserDetailNavigation={handleUserDetailNavigation}
      />
      <MessageList user={user} />
      <MessageComposer user={user} />
    </View>
  );
};

export default ChatDetailScreen;

const styles = StyleSheet.create({});
