import React, {useState, useEffect} from 'react';
import {View, ScrollView, Text, Image, ActivityIndicator} from 'react-native';
import {Button} from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import {TouchableOpacity} from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import {launchImageLibrary} from 'react-native-image-picker';
import {firebase} from '@react-native-firebase/storage';
import {styles} from './styles';
import {NameIsRequiredFilled} from '../../utils/ErrorMessages';
import TextInputField from '../../components/TextInputField';
import auth from '@react-native-firebase/auth';

const EditProfileScreen = ({route, navigation}: any) => {
  const [uid, setUid] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [updatedFullName, setUpdatedFullName] = useState<string>('');
  const [updatedEmail, setUpdatedEmail] = useState<string>('');
  const [updatedBirthDate, setUpdatedBirthDate] = useState<Date>(new Date());
  const [updatedProfilePicture, setProfilePicture] = useState<string | null>(
    null,
  );
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [nameError, setNameError] = useState<string | null>(null);
  const [selectedProfileImage, setSelectedProfileImage] = useState<
    string | null
  >(null);

  // const user = auth().currentUser;
  const getCurrentUserId = () => {
    const user = auth().currentUser;

    if (user) {
      const userId = user.uid;
      console.log('User ID:', userId);
      return userId;
    } else {
      console.log('No user is currently logged in.');
      return null; // Or handle the case where there's no logged-in user
    }
  };

  useEffect(() => {
    //setUid(getCurrentUserId());
    const id = getCurrentUserId();
    setUid(id);
    fetchUserData(id);
  }, [route.params]);

  const fetchUserData = async (userId: string | any) => {
    setIsLoading(true);
    try {
      // Fetch user data from Firestore based on the UID
      const userDoc = await firestore()
        .collection('user-profiles')
        .doc(userId)
        .get();

      if (userDoc.exists) {
        // Extract user data
        const userData = userDoc.data();

        // Convert Firestore timestamp to a JavaScript Date object
        const birthDateTimestamp = userData.birthDate;
        const birthDate = birthDateTimestamp
          ? birthDateTimestamp.toDate()
          : new Date();

        // Set the user data in the state
        setUpdatedFullName(userData.fullName || '');
        setUpdatedEmail(userData.email || '');
        setUpdatedBirthDate(birthDate);
        console.log('just fetched bdate', updatedBirthDate);

        setProfilePicture(userData.profilePicture);

        // Set the user data in the form fields
        setSelectedProfileImage(userData.profilePicture || null);

        setIsLoading(false);
      } else {
        console.warn('User data not found for UID:', userId);
        // Handle the case where user data is not found.
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setIsLoading(false);
      // Handle the error here.
    }
  };

  // Function to handle profile image selection from the gallery
  const handleSelectProfileImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
        console.error(response.error);
      } else {
        setSelectedProfileImage(response.assets[0].uri);
      }
    });
  };

  const handleBirthDateChange = (event, selectedDate) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (event.type === 'dismissed') {
      return;
    }

    if (event.type === 'neutralButtonPressed') {
      setUpdatedBirthDate(new Date(0));
    } else {
      setUpdatedBirthDate(selectedDate);
    }
  };

  const updateUserInFirestore = async (userId, userData) => {
    try {
      // Reference to the Firestore collection for users
      const usersCollection = firestore().collection('user-profiles');

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

  const handleSubmit = async () => {
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

    await updateUserInFirestore(uid, userProfileData);
    //navigation.navigate('AdditionalInformationScreen', {uid: uid});
  };

  // validate name and submit form
  const validateForm = () => {
    setIsLoading(true);
    if (!updatedFullName) {
      setNameError(NameIsRequiredFilled);
      setIsLoading(false);
    } else {
      setNameError(null);
      handleSubmit;
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}>Update Profile</Text>
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size={'large'} color="#E51D43" />
        ) : (
          <>
            <View>
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
              <View style={styles.buttonContainer}>
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
              onChangeText={event => setUpdatedFullName(event)}
            />
            {nameError && <Text style={{color: 'red'}}>{nameError}</Text>}

            <TextInputField
              name={'Email'}
              placeholder={updatedEmail}
              value={updatedEmail}
            />

            <View>
              <Text style={{color: '#333'}}>Birth Date</Text>
              <TouchableOpacity
                style={styles.date}
                onPress={() => setShowDatePicker(true)}>
                <Text>
                  {' '}
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
            <View style={styles.bottomContainer}>
              <Button
                buttonStyle={styles.submitButton}
                containerStyle={styles.buttonContainer}
                title="Save"
                onPress={validateForm}
              />
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default EditProfileScreen;
