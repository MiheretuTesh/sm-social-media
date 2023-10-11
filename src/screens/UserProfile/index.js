import React, {useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  CometChatAvatar,
  CometChatStatusIndicator,
} from '@cometchat/chat-uikit-react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import {logout, deleteAccount} from '../../store/reducers/auth/authAction';
import {CometChat} from '@cometchat/chat-sdk-react-native';
import {styles} from './styles';

function UserProfileScreen({navigation}) {
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    CometChat.getLoggedinUser().then(userInfo => {
      setUser(userInfo);
    });
  }, []);

  const deleteAccountHandler = () => {
    if (user) {
      dispatch(deleteAccount(user.uid));
    }
  };
  const logoutHandler = () => {
    dispatch(logout());
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
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
        <TouchableOpacity style={styles.preferenceItem}>
          <Icon name="user" size={24} style={styles.preferenceIcon} />
          <Text style={styles.preferenceText}>Edit Personal Info</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.preferenceItem}
          onPress={deleteAccountHandler}>
          <Icon name="trash" size={24} style={styles.preferenceIcon} />
          <Text style={styles.preferenceText}>Delete Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.preferenceItem} onPress={logoutHandler}>
          <Icon name="sign-out" size={24} style={styles.preferenceIcon} />
          <Text style={styles.preferenceText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default UserProfileScreen;
