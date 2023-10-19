import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Home} from './components/home/Home';
import {ConversationComponentList} from './components/conversation';
import HeroScreen from './screens/Hero';
import SignUpScreen from './screens/SignUp';
import SingInScreen from './screens/Login';
import {CometChatUIKit} from '@cometchat/chat-uikit-react-native';
import AdditionalInformationScreen from './screens/AdditionalInformation';
import ProfileCompletionScreen from './screens/UserProfile';
import UsersScreen from './screens/Users';
import EditProfileScreen from './screens/EditProfileScreen';
import EditInformationScreen from './screens/EditProfileInformationScreen';
import LoadingScreen from './screens/LoadingScreen';
import {setUser} from './store/reducers/auth/authSlice';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';

function StackNavigator(props: any) {
  const [isLogedIn, setIsLogedIn] = useState(false);
  // const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  // const [isLogedIn, setIsLogedIn] = useState(false);
  const {isAuthenticated, user} = useSelector(state => state.auth);

  const [initializing, setInitializing] = useState(true);
  const Stack = createStackNavigator();

  // Handle user state changes
  function onAuthStateChanged(user) {
    dispatch(setUser(user));
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    // const initalizeApp = async () => {
    //   await CometChatUIKit.getLoggedInUser()
    //     .then(user => {
    //       if (user != null) {
    //         console.log(user);
    //         setIsLogedIn(true);
    //       }
    //       setInitializing(false);
    //     })
    //     .catch(e => console.log('please loggedIn', e));
    // };
    // initalizeApp();
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  });

  if (initializing) {
    // Render a loading screen while initializing
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      {user ? (
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
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
          <Stack.Screen name="user-profile-screen" component={UsersScreen} />
          <Stack.Screen
            name="ConversationComponentList"
            component={ConversationComponentList}
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
            <Stack.Screen name="Login" component={SingInScreen} />
            <Stack.Screen name="SignIn" component={SingInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </Stack.Navigator>
        </>
      )}
    </NavigationContainer>
  );
}

export default StackNavigator;
