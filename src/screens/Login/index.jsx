import React, {useState, useCallback, useEffect, useContext} from 'react';
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

import {
  loginUser,
  loginUsingGoogle,
  loginUsingFacebook,
} from '../../store/reducers/auth/authAction';
import {
  CometChatContext,
  CometChatUIKit,
} from '@cometchat/chat-uikit-react-native';
// import {CometChat} from '@cometchat/chat-sdk-react-native';
import {styles} from './style.jsx';
import {FACEBOOKICON, GOOGLEICON, SMLOGO} from '../../assets/icons';

const SingInScreen = ({navigation}) => {
  const {theme} = useContext(CometChatContext);

  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const {
    user,
    isAuthenticated,
    isLoggedIn,
    error,
    loading,
    socialMediaLoading,
  } = useSelector(state => state.auth);

  const handleGoogleLogin = async () => {
    dispatch(loginUsingGoogle());
  };

  const handleLogin = useCallback(async () => {
    dispatch(loginUser(email, password));
  }, [dispatch, email, password]);

  // useEffect(() => {
  //   CometChatUIKit.getLoggedInUser()
  //     .then(user => {
  //       console.log('CometChatUIKit Logged In Successfully');
  //     })
  //     .catch(e => console.log('Unable to get loggedInUser', e));
  // }, [isLoggedIn, user, loading, socialMediaLoading]);

  const handleFacebookLogin = () => {
    dispatch(loginUsingFacebook());
  };

  return (
    <View style={styles.loginContainer}>
      <View style={styles.topContainer}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.replace('HeroScreen')}>
          <Icon name="arrow-back-ios" size={20} style={styles.backIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.logoContainer}>
        <Image source={SMLOGO} style={styles.image} resizeMode="contain" />
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.firstText}>Hello Again!</Text>
        <Text style={styles.secondText}>Welcome back you've</Text>
        <Text style={styles.thirdText}>been missed!</Text>
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

          <TouchableOpacity
            style={styles.toggleButton}
            onPress={togglePasswordVisibility}>
            <Icon
              name={showPassword ? 'visibility' : 'visibility-off'}
              size={20}
              color="black"
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.forgotPasswordLink}>
          <Text style={styles.linkText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" style={styles.loading} />
      ) : (
        <TouchableOpacity
          style={styles.loginButton}
          activeOpacity={0.7}
          disabled={!email || !password}
          onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      )}

      {socialMediaLoading ? (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" style={styles.loading} />
        </View>
      ) : null}

      <TouchableOpacity
        style={styles.googleLoginButton}
        onPress={handleGoogleLogin}
        disabled={socialMediaLoading}>
        <Image source={GOOGLEICON} style={{width: 30, height: 30}} />
        <Text style={styles.googleButtonText}>Continue with Google</Text>
      </TouchableOpacity>
      {/*
      <TouchableOpacity
        style={styles.googleLoginButton}
        onPress={handleFacebookLogin}
        disabled={socialMediaLoading}>
        <Image source={FACEBOOKICON} style={{width: 30, height: 30}} />
        <Text style={styles.googleButtonText}>Continue with Facebook</Text>
      </TouchableOpacity> */}

      {error && (
        <Text style={styles.errorText}>
          {error === 'No user found' ? '' : 'Email or Password not correct'}
        </Text>
      )}
      <View style={styles.bottomSeparator} />
      <View style={styles.signUpLink}>
        <Text style={styles.notMemberTxt}>Not a member?</Text>
        <TouchableOpacity onPress={() => navigation.push('SignUp')}>
          <Text style={styles.linkText}> Register Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SingInScreen;

const dataFromEmail = {
  displayName: null,
  email: 'miheretutd@gmail.com',
  emailVerified: false,
  isAnonymous: false,
  metadata: {creationTime: 1696281416406, lastSignInTime: 1696481398269},
  multiFactor: {enrolledFactors: [Array]},
  phoneNumber: null,
  photoURL: null,
  providerData: [[Object]],
  providerId: 'firebase',
  tenantId: null,
  uid: 'OBtBUINubcbI5YLJah4LIosLrpM2',
};

const dataFromGmail = {
  displayName: 'Miheretu Degebassa',
  email: 'se.miheretu.degebassa@gmail.com',
  emailVerified: true,
  isAnonymous: false,
  metadata: {creationTime: 1695647914939, lastSignInTime: 1696453207305},
  multiFactor: {enrolledFactors: [Array]},
  phoneNumber: null,
  photoURL:
    'https://lh3.googleusercontent.com/a/ACg8ocJN7RIL1QAAfknH71EpX07lIbBreQ2WebPuq3x2cuTf=s96-c',
  providerData: [[Object]],
  providerId: 'firebase',
  tenantId: null,
  uid: 'vsBfWJn4otU7BG7iCNDf6XiSRGa2',
};

const facebookData = {
  additionalUserInfo: {
    isNewUser: false,
    profile: {
      email: 'mihiretutd@gmail.com',
      first_name: 'Mihiretu',
      id: '2890730231069010',
      last_name: 'Teshale',
      name: 'Mihiretu Teshale',
      picture: [Object],
    },
    providerId: 'facebook.com',
  },
  user: {
    displayName: 'Mihiretu Teshale',
    email: 'mihiretutd@gmail.com',
    emailVerified: false,
    isAnonymous: false,
    metadata: [Object],
    multiFactor: [Object],
    phoneNumber: null,
    photoURL: 'https://graph.facebook.com/2890730231069010/picture',
    providerData: [Array],
    providerId: 'firebase',
    tenantId: null,
    uid: 'AzQ8hLFGdugiq6PjIDr0nZXqpGu2',
  },
};
