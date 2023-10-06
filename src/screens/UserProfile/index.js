import React from 'react';
import {View, Text, Button} from 'react-native';
import {useDispatch} from 'react-redux';
import {CometChatUsers} from '@cometchat/chat-uikit-react-native';
import AdditionalInformationScreen from '../SignUp/AdditionalInformationScreen';
import {logout} from '../../store/reducers/auth/authAction';
function UserProfileScreen({navigation}) {
  const dispatch = useDispatch();
  return (
    <View>
      <Button onPress={() => dispatch(logout())} />
    </View>
  );
}

export default UserProfileScreen;
