import {CometChat} from '@cometchat/chat-sdk-react-native';
import React, {useContext, useEffect} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import {AppStyle} from '../../AppStyle';
import {Logout} from '../../resources';
import {UserContext} from '../../../UserContext';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {CometChatUsersWithMessages} from '@cometchat/chat-uikit-react-native';
import {CometChatConversationsWithMessages} from '@cometchat/chat-uikit-react-native';
import {ConversationComponentList} from '../conversation';
import {CometChatUsersList} from '../User';
import {CometChatGroupsWithMessages} from '@cometchat/chat-uikit-react-native';
import UserProfileScreen from '../../screens/Setting';
import {useSelector} from 'react-redux';
import {CometChatUIKit} from '@cometchat/chat-uikit-react-native';

export const Home = ({navigation}: any) => {
  const Tab = createBottomTabNavigator();

  const {setGroup, setUser, setCall} = useContext(UserContext);

  // useEffect(() => {
  //   let userRequest = new CometChat.UsersRequestBuilder().setLimit(1).build();
  //   let groupRequest = new CometChat.GroupsRequestBuilder().setLimit(1).build();
  //   let callRequest = new CometChat.MessagesRequestBuilder()
  //     .setCategories([CometChat.CATEGORY_CALL, CometChat.CATEGORY_CUSTOM])
  //     .setTypes([
  //       CometChat.MESSAGE_TYPE.AUDIO,
  //       CometChat.MESSAGE_TYPE.VIDEO,
  //       'meeting',
  //     ])
  //     .setLimit(1)
  //     .build();

  //   callRequest.fetchPrevious().then(calls => {
  //     if (calls.length > 0) {
  //       setCall?.(calls[0]);
  //     }
  //   });

  //   userRequest
  //     .fetchNext()
  //     .then(res => {
  //       console.log('setting user', res[0].uid);
  //       if (res.length > 0) {
  //         setUser?.(res[0]);
  //       }
  //     })
  //     .catch(rej => {
  //       console.log('no user found');
  //     });
  //   groupRequest
  //     .fetchNext()
  //     .then(res => {
  //       console.log('setting group', res[0].guid);
  //       if (res.length > 0) {
  //         setGroup?.(res[0]);
  //       }
  //     })
  //     .catch(rej => {
  //       console.log('no group found');
  //     });
  // }, []);

  useEffect(() => {
    CometChatUIKit.getLoggedInUser()
      .then(user => {
        // if (user != null) {
        //   // navigation.replace('Home');
        // }
      })
      .catch(e => console.log('Unable to get loggedInUser', e));
  }, []);

  return (
    <View style={AppStyle.container}>
      <Tab.Navigator
        screenOptions={{headerShown: false}}
        tabBarOptions={{
          keyboardHidesTabBar: true,
          tabBarActiveTintColor: '#E51D43',
          tabBarInactiveTintColor: 'gray',
        }}>
        <Tab.Screen
          name="Chats"
          component={CometChatConversationsWithMessages}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="comments" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Users"
          component={CometChatUsersWithMessages}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="user" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Groups"
          component={CometChatGroupsWithMessages}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="group" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={UserProfileScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <Feather name="more-horizontal" color={color} size={40} />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
};
