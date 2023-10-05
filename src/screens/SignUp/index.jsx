/* eslint-disable no-catch-shadow */
import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {authSuccess, authFail} from '../../store/reducers/auth/authSlice';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import {CometChat} from '@cometchat/chat-sdk-react-native';
import {COMETCHAT_AUTHID, FIREBASE_WEB_CLIENTID} from '@env';
import {signUp, signUpUsingGoogle} from '../../store/reducers/auth/authAction';
import {styles} from './style';
import {
  CometChatContext,
  CometChatUIKit,
} from '@cometchat/chat-uikit-react-native';

const SignUpScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {user, isLoggedIn, error, loading, socialMediaLoading} = useSelector(
    state => state.auth,
  );

  useEffect(() => {
    CometChatUIKit.getLoggedInUser()
      .then(user => {
        if (user != null) navigation.replace('Home');
      })
      .catch(e => console.log('Unable to get loggedInUser', e));
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUp = useCallback(async () => {
    dispatch(signUp(email, password));
  }, [dispatch, email, password]);

  const handleGoogleSignIn = async () => {
    dispatch(signUpUsingGoogle());
  };

  useEffect(() => {
    if (isLoggedIn === true) {
      navigation.replace('Home');

      CometChatUIKit.getLoggedInUser()
        .then(user => {
          if (user != null) navigation.replace('Home');
        })
        .catch(e => console.log('Unable to get loggedInUser', e));
    }
  }, [isLoggedIn]);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backArrow}
          onPress={() => navigation.replace('HeroScreen')}>
          <Icon
            name="arrow-back-ios"
            size={20}
            color="#E51D43"
            style={{paddingLeft: 8}}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.titleContainer}>
        <Image
          source={require('../../assets/icons/SM-logo-bg-removed.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.welcomeContainer}>
        <Text style={styles.Text}>Hello!</Text>
        <Text style={styles.welcomeText}>Welcome</Text>
        {/* <Text style={{fontSize: 16, fontWeight: '500'}}>been missed!</Text> */}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#969BA1"
          onChangeText={text => setEmail(text)}
          value={email}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={[
              styles.passwordInput,
              showPassword ? styles.borderActive : styles.borderInactive,
            ]}
            placeholder="Password"
            placeholderTextColor="#969BA1"
            secureTextEntry={!showPassword}
            onChangeText={text => setPassword(text)}
            value={password}
          />
        </View>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#E51D43" />
      ) : (
        <TouchableOpacity
          style={styles.loginButton}
          activeOpacity={0.7}
          onPress={handleSignUp}
          disabled={!email || !password}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      )}

      {socialMediaLoading ? (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#E51D43" />
        </View>
      ) : null}

      {/* {error && (
        <Text style={styles.errorText}>
          {error === 'No user found' ? '' : 'User Exists'}
        </Text>
      )} */}

      <TouchableOpacity
        style={styles.googleLoginButton}
        disabled={socialMediaLoading}
        onPress={handleGoogleSignIn}>
        <Image
          source={require('../../assets/icons/Google_Icons.webp')}
          style={{width: 30, height: 30}}
        />
        <Text style={styles.googleButtonText}>Continue with Google</Text>
      </TouchableOpacity>

      <View style={{flex: 1}} />
      <View style={styles.signUpLink}>
        <Text style={{fontSize: 12, color: '#969BA1'}}>Already a member?</Text>
        <TouchableOpacity onPress={() => navigation.push('Login')}>
          <Text style={styles.linkText}> Login Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUpScreen;
