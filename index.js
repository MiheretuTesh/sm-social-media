/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {CometChat} from '@cometchat-pro/react-native-chat';
import {name as appName} from './app.json';
import {COMETCHAT_APPID, COMETCHAT_REGION} from '@env';

let appSetting = new CometChat.AppSettingsBuilder()
  .subscribePresenceForAllUsers()
  .setRegion(COMETCHAT_REGION)
  .autoEstablishSocketConnection(true)
  .build();

CometChat.init(COMETCHAT_APPID, appSetting).then(
  () => {
    console.log('Initialization completed successfully');
  },
  error => {
    console.log('Initialization failed with error:', error);
  },
);

AppRegistry.registerComponent(appName, () => App);
