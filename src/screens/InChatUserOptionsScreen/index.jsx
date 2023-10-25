import {Styles} from '@cometchat/chat-uikit-react-native/src/extensions/CollaborativeBubble/styles';
import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const InChatUserOptionsScreen = ({route, navigation}) => {
  const {user} = route.params;

  if (!user) {
    return <Text>Loading</Text>;
  }
  return (
    <ImageBackground
      source={{
        uri: user.profilePicture,
      }}
      style={styles.container}>
      <View style={styles.closeButtonContainer}>
        <Pressable
          style={styles.closeButton}
          onPress={() => navigation.goBack()}>
          <Ionicons
            name="close-circle"
            size={40}
            color={'rgba(150, 150, 150, 0.8)'}
          />
        </Pressable>
      </View>
      <View style={styles.wrapper}>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button}>
            <Ionicons name="chatbox-ellipses" size={30} color="#E51D43" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Ionicons name="call" size={30} color="#E51D43" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Ionicons name="videocam" size={30} color="#E51D43" />
          </TouchableOpacity>
        </View>
        <View style={styles.userInfoContainer}>
          <View style={styles.userInfo}>
            <Text style={styles.userNameText}>{user.fullName}</Text>
            <Text style={styles.userInfoText}>
              {' Male'}
              {' - '}
              {user.birthDate.toDate().getFullYear()}
            </Text>
            <Text style={styles.userInfoText}>Looking for {user.seeking}</Text>
            <Text style={styles.userInfoText}>
              {user.personalInformaition.aboutMe}
            </Text>
            <Text style={styles.userInfoText}>
              Marital Status: {user.maritalStatus}
            </Text>

            <Text style={styles.userInfoText}>
              Occupation: {user.occupation}
            </Text>
          </View>
        </View>
        <Pressable style={styles.blockUserButton}>
          <Text style={styles.blockUserText}>Block User</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
    paddingHorizontal: 20,
    flexDirection: 'column',
  },
  wrapper: {
    flex: 1,
    // paddingHorizontal: 20,
    flexDirection: 'column',
    marginBottom: 20,
    justifyContent: 'flex-end',
  },
  closeButtonContainer: {
    alignSelf: 'flex-end',
    marginTop: 20,
  },
  closeButton: {
    borderRadius: 20,
    padding: 10,
  },

  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    paddingTop: 20,
    marginBottom: 20,
  },
  button: {
    borderRadius: 50,
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: 'rgba(150, 150, 150, 0.8)',
  },
  userInfoContainer: {
    height: 'auto',
    backgroundColor: 'rgba(150, 150, 150, 0.8)',
    borderRadius: 20,
    marginBottom: 20,
  },
  userInfo: {
    padding: 20,
  },
  userInfoText: {
    color: 'white',
    fontSize: 14,
    marginBottom: 5,
  },
  userNameText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  blockUserButton: {
    alignSelf: 'center',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'rgba(150, 150, 150, 0.8)',
  },
  blockUserText: {
    color: '#E51D43',
    fontSize: 18,
  },
});

export default InChatUserOptionsScreen;
