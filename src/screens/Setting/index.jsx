import React, {useEffect, useState} from 'react';
import {View, Text, Alert, Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {CometChatAvatar} from '@cometchat/chat-uikit-react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import {logout, deleteAccount} from '../../store/reducers/auth/authAction';
import {CometChat} from '@cometchat/chat-sdk-react-native';
import {styles} from './style.tsx';

function UserProfileScreen({navigation}) {
    const {user} = useSelector(state => state.auth);
    console.log(user);
    const [userInfo, setUserInfo] = useState(null);
    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        CometChat.getLoggedinUser().then(userInfo => {
            setUserInfo(userInfo);
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
                            dispatch(deleteAccount(userInfo.uid));
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
    console.log('AAAAAa',user)
    return (
        <View style={styles.container}>
            <View style={styles.profileSection}>
                <Pressable
                    style={styles.editProfileIcon}
                    onPress={() =>
                        navigation.navigate('EditProfileScreen', {uid: userInfo.uid})
                    }>
                    <Icon name="pencil" size={18}/>
                </Pressable>
                <CometChatAvatar
                    image={user?.photoURL}
                    cornerRadius={60}
                    borderColor="white"
                    borderWidth={2}
                    style={styles.avatar}
                />
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>{user ? user.displayName : ''}</Text>
                    <View style={styles.statusContainer}>
                        <Text style={styles.statusText}>{user ? 'online' : 'offline'}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.preferencesSection}>
                <Text style={styles.preferencesHeader}>Preferences</Text>
                <TouchableOpacity style={styles.preferenceItem}>
                    <Icon name="lock" size={24} style={styles.preferenceIcon}/>
                    <Text style={styles.preferenceText}>Privacy and Security</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.preferenceItem}
                    onPress={() =>
                        navigation.navigate('ProfileEditScreen', {uid: userInfo.uid, fromProfileEdit: true})
                    }>
                    <Icon name="pencil" size={24} style={styles.preferenceIcon}/>
                    <Text style={styles.preferenceText}>Edit Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.preferenceItem}
                    onPress={() =>
                        navigation.navigate('EditProfileInformationScreen', {
                            uid: userInfo.uid,
                        })
                    }>
                    <Icon name="user" size={24} style={styles.preferenceIcon}/>
                    <Text style={styles.preferenceText}>Edit Personal Info</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.preferenceItem} onPress={logoutHandler}>
                    <Icon name="sign-out" size={24} style={styles.preferenceIcon}/>
                    <Text style={styles.preferenceText}>Logout</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.preferenceItem}
                    onPress={() => setDeleteModalVisible(true)}>
                    <Icon name="trash" size={24} style={styles.preferenceIcon}/>
                    <Text style={styles.preferenceText}>Delete Account</Text>
                </TouchableOpacity>
            </View>

            <Modal
                isVisible={isDeleteModalVisible}
                animationOutTiming={700}
                onBackdropPress={() => setDeleteModalVisible(false)}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalText}>
                        Are you sure you want to delete your account?
                    </Text>
                    <Pressable onPress={() => setDeleteModalVisible(false)}>
                        <Text style={styles.cancelButton}>Cancel</Text>
                    </Pressable>
                    <Pressable onPress={deleteAccountHandler}>
                        <Text style={styles.deleteButton}>Delete</Text>
                    </Pressable>
                </View>
            </Modal>
        </View>
    );
}

export default UserProfileScreen;
