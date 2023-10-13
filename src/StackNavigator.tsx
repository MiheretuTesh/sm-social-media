import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Home} from './components/home/Home';
import {useDispatch, useSelector} from 'react-redux';
import {ConversationComponentList} from './components/conversation';
import {
  CometChatConversationsWithMessages,
  CometChatConversations,
  CometChatUsersWithMessages,
  CometChatUsers,
} from '@cometchat/chat-uikit-react-native';
import {
  Messages,
  MessageComposer,
  MessageHeader,
  MessageList,
  MessageModuleList,
} from './components/messages';
import {UserModuleList} from './components/users/UserModuleList';
import {Details} from './components/users/Details';
import {
  JoinGroup,
  AddMember,
  BannedMembers,
  CreateGroup,
  GroupDetails,
  GroupMember,
  GroupModuleList,
  Groups,
  GroupsWithMessages,
  TransferOwnership,
} from './components/groups';
import {
  AudioBubble,
  Avatar,
  BadgeCount,
  FileBubble,
  ImageBubble,
  ListItem,
  Localize,
  MessageReceipt,
  SharedModuleList,
  SoundManager,
  StatusIndicator,
  TextBubble,
  Theme,
  VideoBubble,
} from './components/shared';
import {CallButton, CallFeatureList} from './components/calls';
import {CallBubble} from './components/calls/CallBubble';
import {IncomingCall} from './components/calls/IncomingCall';
import {OutgoingCall} from './components/calls/OutgoingCall';
import Contacts from './components/conversation/Contacts';
import MessageInformation from './components/messages/MessageInformation';
import MediaRecorder from './components/shared/MediaRecorder';
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

function StackNavigator(props: any) {
  const [isLogedIn, setIsLogedIn] = useState(false);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const [initializing, setInitializing] = useState(true);
  const Stack = createStackNavigator();

  useEffect(() => {
    const initalizeApp = async () => {
      await CometChatUIKit.getLoggedInUser()
        .then(user => {
          if (user != null) {
            console.log(user);
            setIsLogedIn(true);
          }
          setInitializing(false);
        })
        .catch(e => console.log('please loggedIn', e));
    };
    initalizeApp();
  });

  if (initializing) {
    // Render a loading screen while initializing
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      {isLogedIn ? (
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
            name="ConversationsModule"
            component={ConversationComponentList}
          />
          <Stack.Screen name="MessagesModule" component={MessageModuleList} />
          <Stack.Screen name="CallsModule" component={CallFeatureList} />
          <Stack.Screen name="CallButton" component={CallButton} />
          <Stack.Screen
            name="IncomingCall"
            component={IncomingCall}
            options={{gestureEnabled: false}}
          />
          <Stack.Screen name="OutgoingCall" component={OutgoingCall} />
          <Stack.Screen name="CallBubble" component={CallBubble} />
          <Stack.Screen name="Contacts" component={Contacts} />
          <Stack.Screen name="SharedModule" component={SharedModuleList} />
          <Stack.Screen name="UsersModule" component={UserModuleList} />
          <Stack.Screen name="GroupsModule" component={GroupModuleList} />
          <Stack.Screen
            name="ConversationsWithMessages"
            component={CometChatConversationsWithMessages}
          />
          <Stack.Screen
            name="Conversations"
            component={CometChatConversations}
          />
          <Stack.Screen name="Messages" component={Messages} />
          <Stack.Screen name="MessageHeader" component={MessageHeader} />
          <Stack.Screen name="MessageList" component={MessageList} />
          <Stack.Screen name="MessageComposer" component={MessageComposer} />
          <Stack.Screen
            name="MessageInformation"
            component={MessageInformation}
          />
          <Stack.Screen
            name="UsersWithMessages"
            component={CometChatUsersWithMessages}
          />
          <Stack.Screen name="Users" component={CometChatUsers} />
          <Stack.Screen name="Details" component={Details} />
          <Stack.Screen
            name="GroupsWithMessages"
            component={GroupsWithMessages}
          />
          <Stack.Screen name="Groups" component={Groups} />
          <Stack.Screen name="CreateGroup" component={CreateGroup} />
          <Stack.Screen name="JoinGroup" component={JoinGroup} />
          <Stack.Screen name="GroupMember" component={GroupMember} />
          <Stack.Screen name="AddMember" component={AddMember} />
          <Stack.Screen
            name="TransferOwnership"
            component={TransferOwnership}
          />
          <Stack.Screen name="BannedMembers" component={BannedMembers} />
          <Stack.Screen name="GroupDetails" component={GroupDetails} />
          <Stack.Screen name="AudioBubble" component={AudioBubble} />
          <Stack.Screen name="Avatar" component={Avatar} />
          <Stack.Screen name="BadgeCount" component={BadgeCount} />
          <Stack.Screen name="FileBubble" component={FileBubble} />
          <Stack.Screen name="ImageBubble" component={ImageBubble} />
          <Stack.Screen name="ListItem" component={ListItem} />
          <Stack.Screen name="Localize" component={Localize} />
          <Stack.Screen name="MessageReceipt" component={MessageReceipt} />
          <Stack.Screen name="SoundManager" component={SoundManager} />
          <Stack.Screen name="StatusIndicator" component={StatusIndicator} />
          <Stack.Screen name="TextBubble" component={TextBubble} />
          <Stack.Screen name="Theme" component={Theme} />
          <Stack.Screen name="VideoBubble" component={VideoBubble} />
          <Stack.Screen name="MediaRecorder" component={MediaRecorder} />
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
