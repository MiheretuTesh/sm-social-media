import React from 'react';
import {
  CometChatDetails,
  CometChatUsers,
} from '@cometchat/chat-uikit-react-native';
import {CometChat} from '@cometchat/chat-sdk-react-native';
import {View, Text} from 'react-native';

export const Details = (props: any) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 20,
      }}>
      <Text
        style={{
          fontSize: 25,
          color: 'black',
          fontWeight: 'bold',
          paddingTop: 10,
          paddingBottom: 15,
        }}>
        User
      </Text>

      <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
        <View
          style={{
            width: 50,
            backgroundColor: 'white',
            height: 50,
            borderRadius: 50,
            borderColor: 'grey',
            borderWidth: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: 'black', fontSize: 20}}>U</Text>
        </View>
        <View>
          <Text style={{color: 'black', fontSize: 18, fontWeight: '600'}}>
            User One
          </Text>
          <Text style={{color: '#0294e3', fontSize: 14, fontWeight: '600'}}>
            Online
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          paddingTop: 30,
        }}>
        <View>
          <Text style={{color: 'black', fontSize: 18, fontWeight: '600'}}>
            Preferences
          </Text>
        </View>
      </View>
    </View>
  );
};
