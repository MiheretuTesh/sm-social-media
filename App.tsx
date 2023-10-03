import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import Navigation from './src/navigation';
import {Provider} from 'react-redux/es/exports';
import store from './src/store/store';
import {UserContextProvider} from './UserContext';
import {
  CometChatContextProvider,
  CometChatConversationsWithMessages,
} from '@cometchat/chat-uikit-react-native';
import {CometChatTheme} from '@cometchat/chat-uikit-react-native';
import {
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  StatusBar,
  Text,
} from 'react-native';
import {CometChatUIKit} from '@cometchat/chat-uikit-react-native';
import {CometChatIncomingCall} from '@cometchat/chat-uikit-react-native';
import {CometChatUIEventHandler} from '@cometchat/chat-uikit-react-native';
import {COMETCHAT_AUTHID, COMETCHAT_APPID, COMETCHAT_REGION} from '@env';
import {CometChat} from '@cometchat/chat-sdk-react-native';

var listnerID = 'UNIQUE_LISTENER_ID';

function App() {
  const getPermissions = () => {
    if (Platform.OS == 'android') {
      PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);
    }
  };

  const [callRecevied, setCallReceived] = useState(false);
  const incomingCall = useRef(null);

  useEffect(() => {
    getPermissions();
    CometChatUIKit.init({
      appId: COMETCHAT_APPID,
      authKey: COMETCHAT_AUTHID,
      region: COMETCHAT_REGION,
    })
      .then(() => {
        if (CometChat.setSource) {
          CometChat.setSource('ui-kit', Platform.OS, 'react-native');
        }
      })
      .catch(() => {
        return null;
      });

    CometChat.addCallListener(
      listnerID,
      new CometChat.CallListener({
        onIncomingCallReceived: (call: any) => {
          incomingCall.current = call;
          setCallReceived(true);
        },
        onOutgoingCallRejected: (call: any) => {
          incomingCall.current = null;
          setCallReceived(false);
        },
        onIncomingCallCancelled: (call: any) => {
          incomingCall.current = null;
          setCallReceived(false);
        },
      }),
    );

    CometChatUIEventHandler.addCallListener(listnerID, {
      ccCallEnded: () => {
        incomingCall.current = null;
        setCallReceived(false);
      },
    });

    return () => {
      CometChatUIEventHandler.removeCallListener(listnerID);
      CometChat.removeCallListener(listnerID);
    };
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
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
      )}
      <Provider store={store}>
        {/* <UserContextProvider> */}
        <CometChatContextProvider theme={new CometChatTheme({})}>
          <Navigation />
        </CometChatContextProvider>
        {/* </UserContextProvider> */}
      </Provider>
    </SafeAreaView>
  );
}

export default App;
