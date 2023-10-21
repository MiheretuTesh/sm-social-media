import React from 'react';
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

const ChatUserDetailScreen = ({navigation}) => {
  const handleBlockUser = user => {
    CometChat.blockUsers(user).then(
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
            <Text style={styles.userName}>User's Name</Text>
            <Text style={styles.userStatus}>User's Status</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('UserProfileScreen')}>
          <Ionicons name="information-circle" size={30} />
        </TouchableOpacity>
      </View>

      <View style={styles.actionsSection}>
        <Text style={styles.sectionHeader}>ACTIONS</Text>
        <View style={styles.sectionList}>
          <TouchableOpacity onPress={() => navigation.navigate('chat')}>
            <Text style={styles.actionButton}>Send Message</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.privacySection}>
        <Text style={styles.sectionHeader}>PRIVACY & SUPPORT</Text>
        <View style={styles.sectionList}>
          <TouchableOpacity onPress={() => handleBlockUser}>
            <Text style={styles.privacyButton}>Block User</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.sharedMediaSection}>
        <Text style={styles.sectionHeader}>SHARED MEDIA</Text>
        <View style={styles.mediaTabs}>
          <TouchableOpacity onPress={() => navigation.navigate('chat')}>
            <Text style={styles.mediaTab}>Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('chat')}>
            <Text style={styles.mediaTab}>Video</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('chat')}>
            <Text style={styles.mediaTab}>Files</Text>
          </TouchableOpacity>
        </View>
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
    borderTopWidth: 1,
    borderColor: 'gray',
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
    borderTopWidth: 1,
    borderColor: 'gray',
    justifyContent: 'space-between',
    margin: 5,
    paddingVertical: 10,
  },
  mediaTab: {
    fontSize: 16,
  },
});

export default ChatUserDetailScreen;
