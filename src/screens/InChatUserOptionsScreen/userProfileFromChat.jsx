import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    Pressable,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles} from './index.style';
import firebase from "@react-native-firebase/app";

const InChatUserOptionsScreen = ({route, navigation}) => {
    const [user, setUser] = useState(null);
    const {_user} = route.params;

    useEffect(() => {
        getUserProfileData();
    }, [_user?.uid]);

    const getUserProfileData = async () => {
        try {
            const userUID = _user?.uid;
            const userDoc = await firebase
                .firestore()
                .collection('user-profiles')
                .doc(userUID)
                .get();
            if (userDoc.exists) {
                const userData = userDoc.data();
                console.log('userDataFromChatDetail', userData);
                setUser(userData);
            } else {
                console.log('User profile not found.');
            }
        } catch (error) {
            console.error('Error fetching user profile data:', error);
        }
    };

    const changeTimeStapToYear = timestamp => {
        const date = new Date(timestamp * 1000);
        const year = date.getFullYear();
        return year;
    };

    if (!user) {
        return <Text>Loading</Text>;
    }
    return <ImageBackground
        source={{
            uri: user?.profilePicture || user?.imageUrl,
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
            {/*<View style={styles.buttonsContainer}>*/}
            {/*    <TouchableOpacity*/}
            {/*        style={styles.button}*/}
            {/*        onPress={() => navigation.goBack()}>*/}
            {/*        <Ionicons name="chatbox-ellipses" size={30} color="#E51D43"/>*/}
            {/*    </TouchableOpacity>*/}
            {/*    <TouchableOpacity style={styles.button}>*/}
            {/*        <Ionicons name="call" size={30} color="#E51D43"/>*/}
            {/*    </TouchableOpacity>*/}
            {/*    <TouchableOpacity style={styles.button}>*/}
            {/*        <Ionicons name="videocam" size={30} color="#E51D43"/>*/}
            {/*    </TouchableOpacity>*/}
            {/*</View>*/}
            <View style={styles.userInfoContainer}>
                <View style={styles.userInfo}>
                    <Text style={styles.userNameText}>
                        {user?.fullName || user?.displayName}
                    </Text>
                    <Text style={styles.userInfoText}>
                        {user?.gender[0]?.toUpperCase() + user?.gender?.slice(1)}
                        {' - '}
                        {user?.birthDate
                            ? user?.birthDate.toDate().getFullYear()
                            : changeTimeStapToYear(user?.personalInfo?.age)}
                    </Text>
                    <Text style={styles.userInfoText}>Looking for {user?.seeking}</Text>
                    <Text style={styles.userInfoText}>
                        {user.personalInformaition?.aboutMe || user?.biographicalInfo}
                    </Text>
                    <Text style={styles.userInfoText}>
                        Marital Status:{' '}
                        {user.maritalStatus ||
                        user?.personalInfo?.relationshipStatus?.label}
                    </Text>

                    <Text style={styles.userInfoText}>
                        Occupation:{' '}
                        {user?.occupation || user?.personalInfo?.occupation?.label}
                    </Text>
                </View>
            </View>
            <Pressable style={styles.blockUserButton}>
                <Text style={styles.blockUserText}>Block User</Text>
            </Pressable>
        </View>
    </ImageBackground>
};

export default InChatUserOptionsScreen;
