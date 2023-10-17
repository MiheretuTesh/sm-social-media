import React, {useEffect, useState} from 'react';
import {View, Text, Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import {CometChatAvatar} from '@cometchat/chat-uikit-react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal'; // Import the Modal component
import {logout, deleteAccount} from '../../store/reducers/auth/authAction';
import {CometChat} from '@cometchat/chat-sdk-react-native';
import {styles} from './style.tsx';

function UserProfileScreen({navigation}) {
  const [user, setUser] = useState(null);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false); // Control the visibility of the delete confirmation modal

  const dispatch = useDispatch();

  useEffect(() => {
    CometChat.getLoggedinUser().then(userInfo => {
      setUser(userInfo);
    });
  }, []);

  const deleteAccountHandler = () => {
    // Show a confirmation alert before deleting the account
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account?',
      [
        {
          text: 'Cancel',
          onPress: () => setDeleteModalVisible(false),
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            if (user) {
              dispatch(deleteAccount(user.uid));
            }
            setDeleteModalVisible(false);
          },
        },
      ],
      {cancelable: false},
    );
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <TouchableOpacity
          style={styles.editProfileIcon}
          onPress={() =>
            navigation.navigate('EditProfileScreen', {uid: user.uid})
          }>
          <Icon name="pencil" size={24} color="#fff" />
        </TouchableOpacity>
        <CometChatAvatar
          cornerRadius={60}
          borderColor="white"
          borderWidth={2}
          style={styles.avatar}
        />
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{user ? user.name : ''}</Text>
          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>
              {user ? user.status : 'offline'}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.preferencesSection}>
        <Text style={styles.preferencesHeader}>Preferences</Text>
        <TouchableOpacity style={styles.preferenceItem}>
          <Icon name="lock" size={24} style={styles.preferenceIcon} />
          <Text style={styles.preferenceText}>Privacy and Security</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.preferenceItem}
          onPress={() =>
            navigation.navigate('EditProfileScreen', {uid: user.uid})
          }>
          <Icon name="pencil" size={24} style={styles.preferenceIcon} />
          <Text style={styles.preferenceText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.preferenceItem}
          onPress={() =>
            navigation.navigate('EditProfileInformationScreen', {uid: user.uid})
          }>
          <Icon name="user" size={24} style={styles.preferenceIcon} />
          <Text style={styles.preferenceText}>Edit Personal Info</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.preferenceItem} onPress={logoutHandler}>
          <Icon name="sign-out" size={24} style={styles.preferenceIcon} />
          <Text style={styles.preferenceText}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.preferenceItem}
          onPress={() => setDeleteModalVisible(true)}>
          <Icon name="trash" size={24} style={styles.preferenceIcon} />
          <Text style={styles.preferenceText}>Delete Account</Text>
        </TouchableOpacity>
      </View>

      <Modal isVisible={isDeleteModalVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>
            Are you sure you want to delete your account?
          </Text>
          <TouchableOpacity onPress={() => setDeleteModalVisible(false)}>
            <Text style={styles.cancelButton}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={deleteAccountHandler}>
            <Text style={styles.deleteButton}>Delete</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

export default UserProfileScreen;
