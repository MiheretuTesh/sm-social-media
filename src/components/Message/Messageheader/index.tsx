import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {CometChatMessageHeader} from '@cometchat/chat-uikit-react-native';
import {CometChat} from '@cometchat/chat-sdk-react-native';
import {styles} from './index.style';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import VideoIcon from 'react-native-vector-icons/Ionicons';
import ExclamanationIcon from 'react-native-vector-icons/AntDesign';
import CallIcon from 'react-native-vector-icons/Ionicons';

interface MessageHeaderProps {
  user?: CometChat.User;
  name?: string;
  status?: string;
  handleNavigation: Function;
  handleCallClick: Function;
}

const CustomerHeaderStyle = ({
  name,
  status,
  handleNavigation,
  handleCallClick,
}: MessageHeaderProps) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 10,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <View
        style={{
          flexDirection: 'row',
          gap: 10,
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            handleNavigation();
          }}>
          <Icon name="arrow-back" size={26} color="black" />
        </TouchableOpacity>
        <View
          style={{
            width: 50,
            height: 50,
            backgroundColor: '#a3a3a3',
            borderRadius: 50,
          }}></View>
        <View
          style={{flexDirection: 'column', justifyContent: 'space-between'}}>
          <Text style={{color: 'black', fontSize: 18, fontWeight: 'bold'}}>
            {name.length > 10 ? `${name.slice(0, 10)}...` : name}
          </Text>
          <Text style={{color: status === 'online' ? 'blue' : 'black'}}>
            {status}
          </Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', gap: 20, alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => {
            handleCallClick();
          }}>
          <CallIcon name="call-outline" size={26} color="black" />
        </TouchableOpacity>
        <VideoIcon name="videocam-outline" size={30} color="black" />
        <ExclamanationIcon name="exclamationcircleo" size={24} color="black" />
      </View>
    </View>
  );
};

const MessageHeader = ({
  user,
  navigation,
  handleNavigation,
  handleCallClick,
}: MessageHeaderProps & {navigation: any}) => {
  return (
    <View style={styles.container}>
      <CometChatMessageHeader
        user={user}
        hideBackIcon={true}
        ListItemView={() => (
          <View>
            <CustomerHeaderStyle
              name={user?.name}
              status={user.status}
              handleNavigation={handleNavigation}
              handleCallClick={handleCallClick}
            />
          </View>
        )}
      />
    </View>
  );
};

export default MessageHeader;
