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
import {styles} from './style.jsx';

const SingInScreen = ({navigation}) => {
  const {theme} = useContext(CometChatContext);

  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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

  const handleGoogleLogin = async () => {
    dispatch(loginUsingGoogle());
  };

  const handleLogin = useCallback(async () => {
    dispatch(loginUser(email, password));
  }, [dispatch, email, password]);

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

  const handleFacebookLogin = () => {
    dispatch(loginUsingFacebook());
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          width: '100%',
          paddingHorizontal: 30,
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#333',
            justifyContent: 'center',
            alignItems: 'center',
            width: 35,
            height: 35,
            borderRadius: 50,
          }}
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

      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: 20,
        }}>
        <Text style={{fontSize: 22, fontWeight: 'bold', color: 'white'}}>
          Hello Again!
        </Text>
        <Text style={{fontSize: 16, fontWeight: '500', color: '#969BA1'}}>
          Welcome back you've
        </Text>
        <Text style={{fontSize: 16, fontWeight: '500', color: '#969BA1'}}>
          been missed!
        </Text>
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
        <ActivityIndicator size="large" color="#E51D43" />
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
          <ActivityIndicator size="large" color="#E51D43" />
        </View>
      ) : null}

      <TouchableOpacity
        style={styles.googleLoginButton}
        onPress={handleGoogleLogin}
        disabled={socialMediaLoading}>
        <Image
          source={require('../../assets/icons/Google_Icons.webp')}
          style={{width: 30, height: 30}}
        />
        <Text style={styles.googleButtonText}>Continue with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.googleLoginButton}
        onPress={handleFacebookLogin}
        disabled={socialMediaLoading}>
        <Image
          source={require('../../assets/icons/facebook-icon.png')}
          style={{width: 30, height: 30}}
        />
        <Text style={styles.googleButtonText}>Continue with Facebook</Text>
      </TouchableOpacity>

      {error && (
        <Text style={styles.errorText}>
          {error === 'No user found' ? '' : 'Email or Password not correct'}
        </Text>
      )}
      <View style={{flex: 1}} />
      <View style={styles.signUpLink}>
        <Text style={{fontSize: 12, color: '#969BA1'}}>Not a member?</Text>
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
