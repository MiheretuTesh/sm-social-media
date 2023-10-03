import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import UsersScreen from '../../screens/Users';
import GroupScreen from '../../screens/Groups';
import ChatsScreen from '../../screens/Chats';
import {MessageHeader} from '../../components/CometChatMessageHeader';
const Tab = createBottomTabNavigator();

function HomeScreen() {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      tabBarOptions={{
        keyboardHidesTabBar: true,
      }}>
      <Tab.Screen
        name="Chats"
        component={ChatsScreen}
        options={({route}) => ({
          tabBarIcon: ({color, size}) => (
            <Icon name="comments" color={color} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name="Users"
        component={UsersScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="user" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Groups"
        component={GroupScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="group" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="header"
        component={MessageHeader}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="group" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default HomeScreen;
