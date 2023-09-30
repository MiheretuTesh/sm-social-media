import {AppRegistry} from 'react-native';
import App from './App';
import {CometChat} from '@cometchat-pro/react-native-chat';
import {name as appName} from './app.json';
import {COMETCHAT_APPID, COMETCHAT_REGION, COMETCHAT_AUTHID} from '@env';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {CometChatUIKit} from '@cometchat/chat-uikit-react-native';

// GoogleSignin.configure({
//   // Put your webClientId here (Android and iOS)
//   webClientId: FIREBASE_WEB_CLIENTID,
// });

let uikitSettings = {
  appId: COMETCHAT_APPID,
  authKey: COMETCHAT_AUTHID,
  region: COMETCHAT_REGION,
};

CometChatUIKit.init(uikitSettings)
  .then(() => {
    console.log('CometChatUiKit successfully initialized');
  })
  .catch(error => {
    console.log('Initialization failed with exception:', error);
  });

// let appSetting = new CometChat.AppSettingsBuilder()
//   .subscribePresenceForAllUsers()
//   .setRegion(COMETCHAT_REGION)
//   .autoEstablishSocketConnection(true)
//   .build();

// CometChat.init(COMETCHAT_APPID, appSetting).then(
//   () => {
//     console.log('Initialization completed successfully');
//   },
//   error => {
//     console.log('Initialization failed with error:', error);
//   },
// );

AppRegistry.registerComponent(appName, () => App);
