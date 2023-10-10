import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {
  CometChatAvatar,
  CometChatStatusIndicator,
} from '@cometchat/chat-uikit-react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons

function UserProfileScreen({navigation}) {
  const dispatch = useDispatch();

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
          <Text style={styles.name}>John Doe</Text>
          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>Online</Text>
          </View>
        </View>
      </View>
      <View style={styles.preferencesSection}>
        <Text style={styles.preferencesHeader}>Preferences</Text>
        <TouchableOpacity style={styles.preferenceItem}>
          <Icon name="lock" size={24} style={styles.preferenceIcon} />
          <Text style={styles.preferenceText}>Privacy and Security</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.preferenceItem}>
          <Icon name="pencil" size={24} style={styles.preferenceIcon} />
          <Text style={styles.preferenceText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.preferenceItem}>
          <Icon name="user" size={24} style={styles.preferenceIcon} />
          <Text style={styles.preferenceText}>Edit Personal Info</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.preferenceItem}>
          <Icon name="trash" size={24} style={styles.preferenceIcon} />
          <Text style={styles.preferenceText}>Delete Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.preferenceItem}>
          <Icon name="sign-out" size={24} style={styles.preferenceIcon} />
          <Text style={styles.preferenceText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  profileSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
  },
  nameContainer: {
    marginLeft: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    color: 'green',
  },
  preferencesSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
  },
  preferencesHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  preferenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingVertical: 4,
    borderTopWidth: 1,
    // borderTopColor:
  },
  preferenceIcon: {
    marginRight: 8,
    fontSize: 24,
    color: 'gray',
  },
  preferenceText: {
    fontSize: 16,
  },
});

export default UserProfileScreen;
