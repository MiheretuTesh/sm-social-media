import React from 'react';

import {View} from 'react-native';
import Navigation from './src/navigation';
import {Provider} from 'react-redux/es/exports';
import store from './src/store/store';
function App(): JSX.Element {
  //login method

  // create user method
  // let uid = 'SUPERHERO1';
  // let name = 'Kevin';

  // let user = new CometChat.User(uid);

  // user.setName(name);

  // CometChat.createUser(user, COMETCHAT_AUTHID).then(
  //   user => {
  //     console.log('user created', user);+6+0
  //   },
  //   error => {
  //     console.log('error', error);
  //   },
  // );

  return (
    <Provider store={store}>
      <View style={{flex: 1}}>
        <Navigation />
      </View>
    </Provider>
  );
}

export default App;
