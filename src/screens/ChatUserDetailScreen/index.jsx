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

const ChatUserDetailScreen = ({navigation, route}) => {
  const {user} = route.params;
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [messages, setMessages] = useState(null);
  const [audioFiles, setAudioFiles] = useState([]);
  const [videoFiles, setVideoFiles] = useState([]);

  useEffect(() => {
    setIsLoadingMessages(true);

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
    setIsLoadingMessages(false);
  }, []);

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
          <Image source={{uri: 'avatarUrl'}} style={styles.avatar} />
          <View style={styles.profileDetail}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userStatus}>{user.status}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('InChatUserOptionsScreen')}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginVertical: 10,
  },
  closeButtonText: {
    color: 'red',
  },
  profileSection: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 20,
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  sectionList: {
    marginTop: 2,
    marginHorizontal: 5,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'red',
  },
  profileDetailContainer: {
    flexDirection: 'row',
  },
  profileDetail: {
    flexDirection: 'column',
    marginHorizontal: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  userStatus: {
    fontSize: 14,
    color: 'gray',
    marginTop: 0,
  },
  actionsSection: {
    marginBottom: 20,
  },
  actionButton: {
    fontSize: 17,
    color: 'black',
  },
  privacySection: {
    marginBottom: 20,
  },
  privacyButton: {
    fontSize: 17,
    color: 'red',
  },
  sharedMediaSection: {},
  sharedMediaHeader: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  mediaTabs: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    margin: 5,
    paddingVertical: 4,
    borderRadius: 5,
    backgroundColor: '#E1E1E1',
  },
  mediaTab: {
    fontSize: 16,
  },
  horizontalLine: {
    borderBottomWidth: 0.5,
    borderColor: 'gray',
    margin: 5,
  },
  activeTab: {
    // paddingHorizontal: 5,
    borderRadius: 5,
    fontSize: 16,
    //backgroundColor: '#B8B8B8',
  },
});

export default ChatUserDetailScreen;
