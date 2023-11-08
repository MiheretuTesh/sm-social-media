import React, {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, Alert, Image, Platform, ScrollView, Text, TextInput, View} from 'react-native';
import {CometChat} from '@cometchat/chat-sdk-react-native';
import {Button} from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {launchImageLibrary} from 'react-native-image-picker';
import {firebase} from '@react-native-firebase/storage';
import Icon from "react-native-vector-icons/MaterialIcons";
import {COMETCHAT_AUTHID} from '@env';
import DateTimePicker from "@react-native-community/datetimepicker";

const ProfileEditScreen = ({route, navigation}) => {
    const fromProfileEdit = route?.params?.fromProfileEdit;
    const isAndroid = Platform.OS === 'android'
    const calenderRef = useRef()

    const [uid, setUID] = useState(null);
    const [gender, setGender] = useState(null);
    const [displayName, setDisplayName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthDate, setBirthDate] = useState(null);
    const [seeking, setSeeking] = useState('');
    const [aboutMe, setAboutMe] = useState('');
    const [selectedProfileImage, setSelectedProfileImage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [calenderVisible, setCalenderVisible] = useState(false);

    useEffect(() => {
        getUser()
    }, []);

    const getUser = async () => {
        await CometChat.getLoggedinUser()
            .then(async user => {
                console.log('userrrrrr', user);
                const usersCollection = firestore().collection('user-profiles');
                // Fetch the user data from the "users" and "user-profiles" collections
                const _userData = await usersCollection.doc(user?.getUid()).get();
                const userData = _userData.data();
                console.log('userDataaaaaaa', userData)
                if (userData) {
                    setGender(userData?.gender)
                    setDisplayName(userData?.displayName)
                    setFirstName(userData?.firstName)
                    setLastName(userData?.lastName)
                    setSeeking(userData?.seeking)
                    setAboutMe(userData?.aboutMe)
                    setBirthDate(new Date(userData?.birthDate))
                    setSelectedProfileImage(userData?.profilePicture)
                }
                setTimeout(() => {
                    setIsLoading(false)
                }, 500)

                //await usersCollection.doc(userId).set(userData);
                setUID(user.uid)
            });
    };

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

    const uploadProfilePictureToStorage = async (imageUri: string) => {
        try {
            const storageRef = firebase.storage().ref();
            const profilePictureRef = storageRef.child(`profiles2/${uid}`);

            await profilePictureRef.putFile(imageUri);

            // Get the download URL for the uploaded image
            return await profilePictureRef.getDownloadURL();
        } catch (error) {
            console.log('Error uploading profile picture:', error);
            return selectedProfileImage;
        }
    };

    // update comet chat user
    const updateCometUserProfile = async (userData: any) => {
        let updatedUserName = userData.displayName;
        let avatar = userData.profilePicture;

        let user = new CometChat.User(uid, updatedUserName);
        user.setAvatar(avatar);

        CometChat.updateUser(user, COMETCHAT_AUTHID)
            .then(user => {
                console.log('User updated successfully:', user);
                if (fromProfileEdit)
                    navigation.goBack()
                else
                    navigation.navigate('AdditionalProfileEditScreen', {uid: uid});
            })
            .catch(error => {
                console.log('Updating  user failed with exception:', error);
            });
    };

    const handleSubmit = async () => {
        const profilePictureUrl = await uploadProfilePictureToStorage(selectedProfileImage);
        const timeStamp = new Date(birthDate.getTime())
        console.log('TTTTTTTT', timeStamp)
        const userData = {
            displayName: displayName,
            firstName: firstName,
            lastName: lastName,
            seeking: seeking,
            aboutMe: aboutMe,
            profilePicture: profilePictureUrl,
            isProfileCompleted: false,
            gender: gender,
            birthDate: birthDate.toString(),
        };

        await createUserInFirestore(userData);
        // update comet chat user profile
        await updateCometUserProfile(userData);
        //navigation.navigate('AdditionalInformationScreen', {uid: uid});
    };

    const validateForm = () => {
        if (displayName === '' || firstName === '' || lastName === '' || seeking === '' || aboutMe === '' || !selectedProfileImage || !gender || !birthDate) {
            Alert.alert('Please fill all fields')
        } else {
            handleSubmit()
        }
    }

    const createUserInFirestore = async (userData: any) => {
        try {
            // Reference to the Firestore collection for users
            const usersCollection = firestore().collection('user-profiles');
            // Add a new document with a generated ID
            await usersCollection.doc(uid).set(userData);
            console.log('User document created in Firestore');
        } catch (error) {
            console.error('Error creating user document:', error);
        }
    };

    const renderDatePicker = () => {
        const dayToFormat = new Date(birthDate);
        const yyyy = dayToFormat.getFullYear();
        let mm = dayToFormat.getMonth() + 1; // Months start at 0!
        let dd = dayToFormat.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        const formattedToday = dd + '/' + mm + '/' + yyyy;

        if (isAndroid)
            return <TouchableOpacity style={{zIndex: 10}} onPress={() => {
                setCalenderVisible(true)
                setTimeout(() => {
                    calenderRef?.current?.open()
                }, 250)
            }}>
                <Text style={{
                    width: '100%',
                    borderRadius: 8,
                    borderColor: grey,
                    borderWidth: 2,
                    padding: 8,
                    paddingVertical: 12,
                    fontSize: 16,
                    zIndex: 1,
                    color: 'black'
                }}>
                    {formattedToday}
                </Text>
            </TouchableOpacity>

        return <View style={{
            width: '100%',
            borderRadius: 8,
            borderColor: grey,
            borderWidth: 2,
            padding: 8,
            alignItems: 'flex-start'
        }}>
            <DateTimePicker value={birthDate} style={{marginLeft: -6, width: 126}} maximumDate={new Date()}
                            onChange={(val, date) => setBirthDate(date)}
            />
        </View>
    }

    const grey = 'rgba(121,113,113,0.2)'
    const InnerPadding = 12
    const marginBetweenElements = 10
    const red = 'rgba(162,21,21,0.81)'

    if (isLoading)
        return <View style={{flex: 1, backgroundColor: 'white', padding: 16}}>
            <ActivityIndicator size='large' color={grey}/>
        </View>

    return <View style={{flex: 1, backgroundColor: 'white', padding: 16}}>
        <ScrollView style={{height: '85%'}} automaticallyAdjustKeyboardInsets={true}
                    showsVerticalScrollIndicator={false}>
            <View style={{
                flexDirection: 'row',
                justifyContent: fromProfileEdit ? 'space-between' : 'center',
                alignItems: 'center'
            }}>
                {fromProfileEdit && <TouchableOpacity onPress={() => navigation.goBack()}
                                                      style={{
                                                          backgroundColor: grey,
                                                          width: 36,
                                                          height: 36,
                                                          borderRadius: 36,
                                                          alignItems: 'center',
                                                          justifyContent: 'center',
                                                      }}>
                    <Icon name="arrow-back-ios" size={26} color='rgba(162,21,21,0.81)'
                          style={{position: 'absolute', left: 10}}/>
                </TouchableOpacity>}
                <Text style={{color: red, fontSize: 24, fontWeight: 'bold'}}>Profile Info</Text>
                <View style={{width: 40}}/>
            </View>
            <View style={{marginTop: 16, alignItems: 'center', paddingHorizontal: 16}}>
                <TouchableOpacity onPress={handleSelectProfileImage}>
                    {selectedProfileImage ? <Image source={{uri: selectedProfileImage}} style={{
                            width: 120,
                            height: 120,
                            borderRadius: 120,
                        }}/> :
                        <Icon name={'camera-alt'} size={54}/>
                    }
                </TouchableOpacity>
                <View style={{
                    marginTop: marginBetweenElements,
                    flexDirection: 'row',
                    backgroundColor: 'rgba(160,145,227,0.07)',
                    padding: InnerPadding,
                    borderRadius: 8
                }}>
                    <Icon name={'info'} style={{marginTop: -2, marginRight: 4}} size={24}/>
                    <Text style={{fontSize: 15}}>Your data is protected as per the European GDPR Privacy
                        legislations</Text>
                </View>
                <View style={{
                    marginTop: marginBetweenElements,
                    flexDirection: 'row',
                    width: '110%',
                    borderRadius: 8,
                    justifyContent: 'space-between',
                    backgroundColor: grey,
                    paddingHorizontal: 1.6,
                    paddingVertical: 2
                }}>
                    <TouchableOpacity onPress={() => setGender('female')} style={{
                        backgroundColor: gender === 'female' ? 'white' : 'transparent',
                        width: 180,
                        borderRadius: 8,
                        height: 25,
                        justifyContent: 'center'
                    }}>
                        <Text style={{
                            textAlign: 'center',
                            color: gender === 'female' ? red : 'black',
                            fontSize: 16
                        }}>Female</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setGender('male')}
                                      style={{
                                          backgroundColor: gender === 'male' ? 'white' : 'transparent',
                                          width: 180,
                                          borderRadius: 8,
                                          height: 25,
                                          justifyContent: 'center',
                                          marginLeft: -16
                                      }}>
                        <Text style={{
                            textAlign: 'center',
                            color: gender === 'male' ? red : 'black',
                            fontSize: 16
                        }}>Male</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{marginTop: marginBetweenElements}}>
                <TextInput placeholder={'Display Name'} returnKeyLabel={'done'}
                           value={displayName}
                           onChangeText={setDisplayName}
                           style={{
                               width: '100%',
                               borderRadius: 8,
                               borderColor: grey,
                               borderWidth: 2,
                               padding: 8,
                               paddingVertical: 12,
                               fontSize: 16
                           }}/>
            </View>
            <View style={{marginTop: marginBetweenElements}}>
                <TextInput placeholder={'First Name'}
                           value={firstName}
                           onChangeText={setFirstName}
                           style={{
                               width: '100%',
                               borderRadius: 8,
                               borderColor: grey,
                               borderWidth: 2,
                               padding: 8,
                               paddingVertical: 12,
                               fontSize: 16
                           }}/>
            </View>
            <View style={{marginTop: marginBetweenElements}}>
                <TextInput placeholder={'Last Name'}
                           value={lastName}
                           onChangeText={setLastName}
                           style={{
                               width: '100%',
                               borderRadius: 8,
                               borderColor: grey,
                               borderWidth: 2,
                               padding: 8,
                               paddingVertical: 12,
                               fontSize: 16
                           }}/>
            </View>
            <View style={{marginTop: marginBetweenElements}}>
                {!birthDate ? <TouchableOpacity onPress={() => {
                    console.log('pressed')
                    setCalenderVisible(true)
                    setBirthDate(new Date())
                    setTimeout(() => {
                        calenderRef?.current?.open()
                    }, 250)
                }}>
                    <TextInput placeholder={'Birthdate'} editable={false}
                               value={birthDate}
                               style={{
                                   width: '100%',
                                   borderRadius: 8,
                                   borderColor: grey,
                                   borderWidth: 2,
                                   padding: 8,
                                   paddingVertical: 12,
                                   fontSize: 16
                               }}/>
                </TouchableOpacity> : renderDatePicker()}
            </View>
            <View style={{marginTop: marginBetweenElements}}>
                <TextInput placeholder={'Seeking'}
                           value={seeking}
                           onChangeText={setSeeking}
                           style={{
                               width: '100%',
                               borderRadius: 8,
                               borderColor: grey,
                               borderWidth: 2,
                               padding: 8,
                               paddingVertical: 12,
                               fontSize: 16
                           }}/>
            </View>
            <View style={{marginTop: marginBetweenElements}}>
                <TextInput placeholder={'About me'} multiline={true}
                           value={aboutMe}
                           onChangeText={setAboutMe}
                           style={{
                               width: '100%',
                               borderRadius: 8,
                               borderColor: grey,
                               borderWidth: 2,
                               padding: 8,
                               paddingVertical: 56,
                               fontSize: 16
                           }}/>
            </View>
        </ScrollView>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <Button onPress={validateForm} buttonStyle={{backgroundColor: red, borderRadius: 8, padding: 12}}
                    title={'Looks Great! 👍🏻'}/>
        </View>
        {calenderVisible && isAndroid &&
        <DateTimePicker ref={calenderRef} value={birthDate} style={{marginLeft: -6, width: 126}}
                        maximumDate={new Date()}
                        onChange={(val, date) => {
                            calenderRef.current?.close()
                            setCalenderVisible(false)
                            setBirthDate(date)
                        }}/>
        }
    </View>
};

export default ProfileEditScreen;
