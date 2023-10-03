import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {CometChatConversationsWithMessages} from '@cometchat/chat-uikit-react-native';

const BarOptions = () => {
  <View>
    <Text>menu</Text>
  </View>;
};

function ChatsScreen({navigation}) {
  let messagesConfiguration = {
    messageHeaderConfiguration: {
      AppBarOptions: BarOptions(),
    },
  };
  return (
    <View style={styles.container}>
      <CometChatConversationsWithMessages
      // messagesConfigurations={messagesConfiguration}
      // messageHeaderConfiguration={''}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    felx: 1,
    height: '100%',
  },
});

export default ChatsScreen;
