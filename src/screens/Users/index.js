import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {CometChatUsers} from '@cometchat/chat-uikit-react-native';
import {logout} from '../../store/reducers/auth/authAction';
function UsersScreen({navigation}) {
  const dispatch = useDispatch();
  return (
    <View>
      <Button onPress={() => dispatch(logout())} />
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
