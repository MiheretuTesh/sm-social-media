import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import UsersScreen from '../../screens/Users';
import ChatsScreen from '../../screens/Chats';
import ChatDetailScreen from '../../screens/ChatDetail';

const Stack = createStackNavigator();

const ChatStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Chats"
        component={ChatsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChatDetail"
        component={ChatDetailScreen}
        options={{headerShown: false, tabBarVisible: false}}
      />
    </Stack.Navigator>
  );
};

export default ChatStackNavigator;
