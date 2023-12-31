import {StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import MessageHeader from '../../components/Message/Messageheader';
import MessageList from '../../components/Message/MessageList';
import MessageComposer from '../../components/Message/MessageComposer';

const ChatDetailScreen = ({navigation, route}) => {
  const {user, userMoreDetail} = route.params;

  const handleNavigation = () => {
    navigation.goBack();
  };
  const handleUserDetailNavigation = () => {
    navigation.navigate('ChatUserDetailScreen', {user: user});
  };

  const handleCallClick = () => {
    navigation.replace('OutgoingCallScreen', {userMoreDetail: userMoreDetail});
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
