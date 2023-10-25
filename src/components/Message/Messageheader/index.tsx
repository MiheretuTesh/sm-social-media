/* eslint-disable react/no-unstable-nested-components */
import {Pressable, Text, View} from 'react-native';
import React from 'react';
import {CometChatMessageHeader} from '@cometchat/chat-uikit-react-native';
import {CometChat} from '@cometchat/chat-sdk-react-native';
import {styles} from './index.style';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import VideoIcon from 'react-native-vector-icons/Ionicons';
import ExclamanationIcon from 'react-native-vector-icons/AntDesign';
import CallIcon from 'react-native-vector-icons/Ionicons';
import style from '@cometchat/chat-uikit-react-native/src/shared/views/CometChatReceipt/style';

interface MessageHeaderProps {
  user?: CometChat.User;
  name?: string;
  avatar?: string;
  status?: string;
  handleNavigation: Function;
  handleCallClick: Function;
  handleUserDetailNavigation: Function;
}

const CustomerHeaderStyle = ({
  name,
  avatar,
  status,
  handleNavigation,
  handleCallClick,
  handleUserDetailNavigation,
}: MessageHeaderProps) => {
  let displayName = name?.split(' ');
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            handleNavigation();
          }}>
          <Icon name="arrow-back" size={26} color="#2F9AFF" />
        </TouchableOpacity>
        <View style={styles.avatorContainer}>
          <Image
            source={{uri: avatar}}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
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
          <Text style={{color: status === 'online' ? '#2F9AFF' : 'black'}}>
            {status}
          </Text>
        </View>
        <View style={styles.avatorContainer} />
        <Pressable
          style={styles.nameContainer}
          onPress={() => handleUserDetailNavigation()}>
          <View>
            <Text style={styles.nameText}>{displayName && displayName[0]}</Text>
            <Text style={{color: status === 'online' ? 'blue' : 'black'}}>
              {status}
            </Text>
          </View>
        </Pressable>
      </View>
      <View style={styles.actionButtonsWrapper}>
        <TouchableOpacity
          onPress={() => {
            handleCallClick();
          }}>
          <CallIcon name="call-outline" size={26} style={{color: '#2F9AFF'}} />
        </TouchableOpacity>
        <VideoIcon name="videocam-outline" size={30} color={'#2F9AFF'} />
        <ExclamanationIcon
          name="exclamationcircleo"
          size={24}
          color="#2F9AFF"
        />
      </View>
    </View>
  );
};

const MessageHeader = ({
  user,
  handleNavigation,
  handleCallClick,
  handleUserDetailNavigation,
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
              avatar={user?.avatar}
              status={user?.status}
              handleNavigation={handleNavigation}
              handleCallClick={handleCallClick}
              handleUserDetailNavigation={handleUserDetailNavigation}
            />
          </View>
        )}
      />
    </View>
  );
};

export default MessageHeader;
