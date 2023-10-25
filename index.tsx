import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {COMETCHAT_APPID, COMETCHAT_REGION, COMETCHAT_AUTHID} from '@env';
import {CometChatUIKit} from '@cometchat/chat-uikit-react-native';

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

AppRegistry.registerComponent(appName, () => App);
