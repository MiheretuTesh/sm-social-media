import React, {useState, useEffect, useRef} from 'react';

import {View, StatusBar, SafeAreaView} from 'react-native';
import Navigation from './src/navigation';
import {
  CometChatContextProvider,
  CometChatConversationsWithMessages,
} from '@cometchat/chat-uikit-react-native';
import {CometChatTheme} from '@cometchat/chat-uikit-react-native';
import {CometChatUIKit} from '@cometchat/chat-uikit-react-native';
import {CometChat} from '@cometchat/chat-sdk-react-native';

import {Provider} from 'react-redux/es/exports';
import store from './src/store/store';

import {CometChatIncomingCall} from '@cometchat/chat-uikit-react-native';
import {CometChatUIEventHandler} from '@cometchat/chat-uikit-react-native';
import {UserContextProvider} from './ContextProvider';
var listnerID = 'UNIQUE_LISTENER_ID';

function App() {
  const [callRecevied, setCallReceived] = useState(false);
  const incomingCall = useRef(null);

  // useEffect(() => {
  //   CometChat.addCallListener(
  //     listnerID,
  //     new CometChat.CallListener({
  //       onIncomingCallReceived: call => {
  //         incomingCall.current = call;
  //         setCallReceived(true);
  //       },
  //       onOutgoingCallRejected: call => {
  //         incomingCall.current = null;
  //         setCallReceived(false);
  //       },
  //       onIncomingCallCancelled: call => {
  //         incomingCall.current = null;
  //         setCallReceived(false);
  //       },
  //     }),
  //   );

  //   CometChatUIEventHandler.addCallListener(listnerID, {
  //     ccCallEnded: () => {
  //       incomingCall.current = null;
  //       setCallReceived(false);
  //     },
  //   });

  //   return () => {
  //     CometChatUIEventHandler.removeCallListener(listnerID);
  //     CometChat.removeCallListener(listnerID);
  //   };
  // }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Provider store={store}>
        {/* <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
        {callRecevied && (
          <CometChatIncomingCall
            call={incomingCall.current}
            onDecline={call => {
              setCallReceived(false);
            }}
            incomingCallStyle={{
              backgroundColor: 'white',
              titleColor: 'black',
              subtitleColor: 'gray',
              titleFont: {
                fontSize: 20,
                fontWeight: 'bold',
              },
            }}
          />
        )} */}
        {/* <UserContextProvider>
          <CometChatContextProvider theme={new CometChatTheme({})}> */}
        <Navigation />
        {/* </CometChatContextProvider>
        </UserContextProvider> */}
      </Provider>
    </SafeAreaView>
  );
}
ht03xl;
export default App;
