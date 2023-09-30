import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the icons you want to use
import {
  CometChatMessages,
  CometChatConversation,
  CometChatUser,
  CometChatGroup,
} from '@cometchat/chat-uikit-react-native';
import UsersScreen from '../../screens/Users';
import ChatsScreen from '../../screens/Chats';

const Tab = createBottomTabNavigator();

function HomeScreen() {
  return (
    <Tab.Navigator>
      {/* <Tab.Screen
        name="Messages"
        component={CometChatMessages}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="envelope" color={color} size={size} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Users"
        component={UsersScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="user" color={color} size={size} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="GroupList"
        component={CometChatGroup}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="group" color={color} size={size} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Chats"
        component={ChatsScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="comments" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default HomeScreen;
