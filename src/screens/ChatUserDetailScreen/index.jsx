import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Pressable,
} from 'react-native';
import {CometChat} from '@cometchat/chat-sdk-react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firebase from '@react-native-firebase/app';
import {setUser} from '../../store/reducers/auth/authSlice';
import {styles} from './index.styles';

const getUserProfileData = async userUID => {
  try {
    const userDoc = await firebase
      .firestore()
      .collection('user-profiles')
      .doc(userUID)
      .get();
    if (userDoc.exists) {
      const userData = userDoc.data();
      console.log('uerinFO', userData);
      return userData;
    } else {
      console.log('User profile not found.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user profile data:', error);
    return null;
  }
};

const ChatUserDetailScreen = ({navigation, route}) => {
  const {user} = route.params;

  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [messages, setMessages] = useState(null);
  const [audioFiles, setAudioFiles] = useState([]);
  const [videoFiles, setVideoFiles] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    setIsLoadingMessages(true);
    const getUserData = async () => {
      const userData = await getUserProfileData(user.uid);
      setUserInfo(userData);
    };
    const getMessages = async () => {
      let limit = 30;
      let parentMessageId = 0;
      let messagesRequest = new CometChat.MessagesRequestBuilder()
        .setUID(user.uid)
        .setLimit(limit)
        .build();

      messagesRequest.fetchPrevious().then(
        messages => {
          console.log('Messages for thread fetched successfully', messages);
          setMessages(messages);

          // Extract audio and video files while fetching messages
          const extractedAudioFiles = [];
          const extractedVideoFiles = [];

          messages.forEach(message => {
            if (message.data.type === 'audio') {
              const audioUrl = message.data.url;
              const audioName = message.data.name;
              extractedAudioFiles.push({name: audioName, url: audioUrl});
            } else if (message.data.type === 'video') {
              const videoUrl = message.data.url;
              const videoName = message.data.name;
              extractedVideoFiles.push({name: videoName, url: videoUrl});
            }
          });

          setAudioFiles(extractedAudioFiles);
          setVideoFiles(extractedVideoFiles);
        },
        error => {
          console.log('Message fetching failed with error:', error);
        },
      );
    };
    getMessages();
    getUserData();
    setIsLoadingMessages(false);
  }, [user.uid]);

  console.log('messages', messages);

  const handleBlockUser = userId => {
    CometChat.blockUsers(userId).then(
      list => {
        console.log('users list blocked', {list});
      },
      error => {
        console.log('Blocking user fails with error', error);
      },
    );
  };

  return (
    <View style={styles.container}>
      <View>
        <Pressable
          style={styles.closeButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.closeButtonText}>Close</Text>
        </Pressable>
      </View>
      <View style={styles.profileSection}>
        <View style={styles.profileDetailContainer}>
          <Image
            source={{
              uri:
                userInfo &&
                (userInfo.profilePicture
                  ? userInfo.profilePicture
                  : userInfo.imageUrl),
            }}
            style={styles.avatar}
          />
          <View style={styles.profileDetail}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userStatus}>{user.status}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('InChatUserOptionsScreen', {user: userInfo})
          }>
          <Ionicons name="information-circle" size={30} />
        </TouchableOpacity>
      </View>

      <View style={styles.actionsSection}>
        <Text style={styles.sectionHeader}>ACTIONS</Text>
        <View style={styles.horizontalLine} />
        <View style={styles.sectionList}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.actionButton}>Send Message</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.privacySection}>
        <Text style={styles.sectionHeader}>PRIVACY & SUPPORT</Text>
        <View style={styles.horizontalLine} />
        <View style={styles.sectionList}>
          <TouchableOpacity onPress={() => handleBlockUser(user.uid)}>
            <Text style={styles.privacyButton}>Block User</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.sharedMediaSection}>
        <Text style={styles.sectionHeader}>SHARED MEDIA</Text>
        <View style={styles.horizontalLine} />
        <View style={styles.mediaTabs}>
          <TouchableOpacity onPress={() => navigation.navigate('chat')}>
            <Text style={styles.activeTab}>Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('chat')}>
            <Text style={styles.mediaTab}>Video</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('chat')}>
            <Text style={styles.mediaTab}>Files</Text>
          </TouchableOpacity>
        </View>
        <View>{isLoadingMessages ? <Text>Loading ...</Text> : <></>}</View>
      </View>
    </View>
  );
};

export default ChatUserDetailScreen;
