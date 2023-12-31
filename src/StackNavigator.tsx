import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Home} from './components/home/Home';
import HeroScreen from './screens/Hero';
import SignUpScreen from './screens/SignUp';
import SingInScreen from './screens/Login';
import AdditionalInformationScreen from './screens/AdditionalInformation';
import ProfileCompletionScreen from './screens/UserProfile';
import UsersScreen from './screens/Users';
import EditProfileScreen from './screens/EditProfileScreen';
import EditInformationScreen from './screens/EditProfileInformationScreen';
import ChatDetailScreen from './screens/ChatDetail';
import LoadingScreen from './screens/LoadingScreen';
import {setUser} from './store/reducers/auth/authSlice';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import OutgoingCall from './components/calls/OutGoingCall';
import ChatUserDetailScreen from '../src/screens/ChatUserDetailScreen';
import InChatUserOptionsScreen from './screens/UserProfileFromChat/userProfileFromChat';
import firebase from '@react-native-firebase/app';
import {CometChatUIKit} from '@cometchat/chat-uikit-react-native';
import ConversationComponentList from "./components/conversation/ConversationComponentList";
import ProfileEditScreen from "./screens/v2/profile/profileEditScreen";
import AdditionalProfileEditScreen from "./screens/v2/profile/additionalProfileEditScreen";

function StackNavigator(props: any) {
    const [isLogedIn, setIsLogedIn] = useState(false);
    const dispatch = useDispatch();

    const {isAuthenticated, user} = useSelector(state => state.auth);

    const [initializing, setInitializing] = useState(true);
    const Stack = createStackNavigator();

    function onAuthStateChanged(user) {
        dispatch(setUser(user));
        if (initializing) {
            setInitializing(false);
        }
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    });

    if (initializing) {
        // Render a loading screen while initializing
        return <LoadingScreen/>;
    }

    const getUserProfileData = async (userUID: string | undefined) => {
        try {
            const userDoc = await firebase
                .firestore()
                .collection('user-profiles')
                .doc(userUID)
                .get();
            if (userDoc.exists) {
                const userData = userDoc.data();
                setUser(userData);
                console.log('uerinFO', userData);
                return userData;
            } else {
                console.log('User profile not found.');
                return null;
            }
        } catch (error) {
            console.error('Error fetching user profile data:', error);
            return null;
        }
    };
    // update user profile data from databse
    if (user) {
        let id = user?.uid?.toLowerCase();
        getUserProfileData(id);
    }

    return (
        <NavigationContainer>
            {user ? (
                <Stack.Navigator initialRouteName='Home'>
                    <Stack.Screen
                        name="Home"
                        component={Home}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen
                        name="ProfileEditScreen"
                        component={ProfileEditScreen}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen
                        name="AdditionalProfileEditScreen"
                        component={AdditionalProfileEditScreen}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen
                        name="ProfileCompletionScreen"
                        component={ProfileCompletionScreen}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen
                        name="AdditionalInformationScreen"
                        component={AdditionalInformationScreen}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen
                        name="EditProfileInformationScreen"
                        component={EditInformationScreen}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen
                        name="EditProfileScreen"
                        component={EditProfileScreen}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen name="user-profile-screen" component={UsersScreen}/>
                    <Stack.Screen
                        name="ConversationComponentList"
                        component={ConversationComponentList}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen
                        name="ChatDetailScreen"
                        component={ChatDetailScreen}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen
                        name="OutgoingCallScreen"
                        component={OutgoingCall}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen
                        name="ChatUserDetailScreen"
                        component={ChatUserDetailScreen}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen
                        name="InChatUserOptionsScreen"
                        component={InChatUserOptionsScreen}
                        options={{headerShown: false}}
                    />
                </Stack.Navigator>
            ) : (
                <>
                    <Stack.Navigator
                        initialRouteName={'HeroScreen'}
                        screenOptions={{headerShown: false}}>
                        <Stack.Screen
                            name="HeroScreen"
                            component={HeroScreen}
                            options={{headerShown: false}}
                        />
                        <Stack.Screen name="Login" component={SingInScreen}/>
                        <Stack.Screen name="SignIn" component={SingInScreen}/>
                        <Stack.Screen name="SignUp" component={SignUpScreen}/>
                    </Stack.Navigator>
                </>
            )}
        </NavigationContainer>
    );
}

export default StackNavigator;
