import React, {useEffect, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  CometChatContext,
  CometChatUIKit,
} from '@cometchat/chat-uikit-react-native';
import {styles} from './style.jsx';

const HeroScreen = React.memo(({navigation}) => {
  const {theme} = useContext(CometChatContext);

  const {user, isLoggedIn, error, loading} = useSelector(state => state.auth);

  useEffect(() => {
    if (isLoggedIn === true) {
      console.log(isLoggedIn, 'Logged In');
      navigation.replace('Home');
    }
  }, [isLoggedIn]);

  React.useEffect(() => {
    CometChatUIKit.getLoggedInUser()
      .then(user => {
        if (user != null) navigation.navigate('Home');
      })
      .catch(e => console.log('Unable to get loggedInUser', e));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/icons/SM-logo-bg-removed.png')}
          style={styles.icon}
          resizeMode="contain"
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.push('Login')}>
          <Text style={styles.loginButtonText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.signUpButton}
          onPress={() => navigation.push('SignUp')}>
          <Text style={styles.signUpButtonText}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});
export default HeroScreen;
