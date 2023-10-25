/* eslint-disable no-undef */
import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  TextInput,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import {CometChat} from '@cometchat/chat-sdk-react-native';
import {Button} from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import {TouchableOpacity} from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import {launchImageLibrary} from 'react-native-image-picker';
import {firebase} from '@react-native-firebase/storage';
import {styles} from './style';
import TextInputField from '../../components/TextInputField';
import {setUser} from '../../store/reducers/auth/authSlice';

const ProfileCompletionScreen = ({route, navigation}) => {
  // Extract user information from props
  const {name, email, birthDate, password, profile} = route.params;
  const [uid, setUID] = useState(null);
  const [updatedFullName, setUpdatedFullName] = useState(name || '');
  const [updatedEmail, setUpdatedEmail] = useState(email || '');
  const [updatedBirthDate, setBirthDate] = useState(birthDate || new Date());
  const [updatedProfilePicture, setProfilePicture] = useState(profile);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [nameError, setNameError] = useState(null);
  // Add a state to store the selected profile image
  const [selectedProfileImage, setSelectedProfileImage] = useState(null);

  // Function to handle profile image selection from the gallery
  const handleSelectProfileImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        // User canceled the image picker
      } else if (response.error) {
        // Handle any errors here
        console.error(response.error);
      } else {
        // Set the selected image to the state
        setSelectedProfileImage(response.assets[0].uri);
      }
    });
  };

  useEffect(() => {
    // If there's a profile picture from route params, set it as the selected profile image
    // if (updatedProfilePicture) {
    //   setSelectedProfileImage(updatedProfilePicture);
    // }
    const getUser = async () => {
      await CometChat.getLoggedinUser().then(user => setUID(user.uid));
    };
    getUser();
  }, []);

  const handleBirthDateChange = (event, selectedDate) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (event.type === 'dismissed') {
      return;
    }

    if (event.type === 'neutralButtonPressed') {
      setBirthDate(new Date(0));
    } else {
      setBirthDate(selectedDate);
    }
  };

  const createUserInFirestore = async (userId, userData) => {
    try {
      // Reference to the Firestore collection for users
      const usersCollection = firestore().collection('user-profiles');

      // Add a new document with a generated ID
      await usersCollection.doc(userId).set(userData);

      console.log('User document created in Firestore');
    } catch (error) {
      console.error('Error creating user document:', error);
    }
  };

  const uploadProfilePictureToStorage = async (imageUri, userId) => {
    try {
      const storageRef = firebase.storage().ref();
      const profilePictureRef = storageRef.child(`profiles2/${userId}`);

      await profilePictureRef.putFile(imageUri);

      // Get the download URL for the uploaded image
      const downloadURL = await profilePictureRef.getDownloadURL();

      return downloadURL;
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      return null;
    }
  };

  // update comet chat user
  const updateCometUserProfile = async (userID, userData) => {
    let userId = userID;
    let updatedUserName = userData.fullName;
    let avatar = userData.profilePicture;

    let user = new CometChat.User(userId, updatedUserName);
    user.setAvatar(avatar);

    CometChatUIKit.update(user)
      .then(user => {
        console.log('User updated successfully');
      })
      .catch(error => {
        console.log('Updating  user failed with exception:', error);
      });
  };

  const handleSubmit = async () => {
    // const user = uid;
    let profilePictureUrl = updatedProfilePicture || ' ';

    // If a new profile picture is selected, upload it to Firebase Storage
    if (selectedProfileImage) {
      profilePictureUrl = await uploadProfilePictureToStorage(
        selectedProfileImage,
        uid,
      );
    }

    const userProfileData = {
      fullName: updatedFullName,
      email: updatedEmail,
      birthDate: updatedBirthDate,
      profilePicture: profilePictureUrl,
      isProfileCompleted: false,
    };

    await createUserInFirestore(uid, userProfileData);
    // update comet chat user profile
    await updateCometUserProfile(uid, userProfileData);
    navigation.navigate('AdditionalInformationScreen', {uid: uid});
  };

  // validate name and submit form
  const validateForm = () => {
    if (!updatedFullName) {
      setNameError('Name field is required !');
    } else {
      setNameError('');
      handleSubmit();
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}>Complete Your Profile</Text>
      <View style={styles.container}>
        <View styles={styles.section}>
          <View>
            {selectedProfileImage ? (
              <Image
                style={styles.profilePicture}
                source={{uri: selectedProfileImage}}
              />
            ) : (
              <Image
                style={styles.profilePicture}
                source={{uri: updatedProfilePicture}}
              />
            )}
          </View>
          <View style={styles.btnContainer}>
            <Button
              title="Change Profile Picture"
              type="outline"
              titleStyle={styles.uploadButtonTitle}
              buttonStyle={styles.uploadButton}
              containerStyle={styles.uploadButtonContainer}
              onPress={handleSelectProfileImage}
            />
          </View>
        </View>
        <TextInputField
          name={'Full Name'}
          placeholder={updatedFullName}
          value={updatedFullName}
          onChangeText={text => setUpdatedFullName(text)}
        />

        {nameError && (
          <Text style={styles.errorField}>{this.state.nameError}</Text>
        )}

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder={updatedEmail}
          value={updatedEmail}
          editable={false}
          // onChangeText={text => setUpdatedEmail(text)}
        />
        <View style={styles.datePickerContainer}>
          <View>
            <Text style={styles.label}>Birth Date</Text>
            <TouchableOpacity
              style={styles.date}
              onPress={() => setShowDatePicker(true)}>
              <Text>
                {updatedBirthDate.toLocaleDateString('en-US', {
                  year: '2-digit',
                  month: '2-digit',
                  day: '2-digit',
                })}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                textColor="#000000"
                testID="startDatePicker"
                value={updatedBirthDate}
                mode="date"
                display="spinner"
                onChange={handleBirthDateChange}
              />
            )}
          </View>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <Button
          buttonStyle={styles.submitButton}
          containerStyle={styles.buttonContainer}
          title="Next"
          onPress={validateForm}
          width={30}
        />
      </View>
    </ScrollView>
  );
};

export default ProfileCompletionScreen;
