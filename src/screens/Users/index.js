import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  CometChatUsersWithMessages,
  localize,
} from '@cometchat/chat-uikit-react-native';
import AdditionalInformationScreen from '../SignUp/AdditionalInformationScreen';
function UsersScreen({navigation}) {
  return (
    <View style={styles.container}>
      <AdditionalInformationScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    felx: 1,
    height: '100%',
  },
});

export default UsersScreen;
