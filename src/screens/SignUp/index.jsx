/* eslint-disable no-catch-shadow */
import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
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
import {signUp} from '../../store/reducers/auth/authAction';
import style from '@cometchat/chat-uikit-react-native/src/shared/views/CometChatReceipt/style';
import {Styles} from '@cometchat/chat-uikit-react-native/src/extensions/CollaborativeBubble/styles';

const SignUpScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  const {user, isLoggedIn, error, loading} = useSelector(state => state.auth);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: FIREBASE_WEB_CLIENTID,
    });
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUp = useCallback(async () => {
    dispatch(signUp(email, password));
  }, [dispatch, email, password]);

  const handleGoogleSignIn = async () => {
    try {
      setLoadingGoogle(true);
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      // Sign in to Firebase with Google credentials
      const googleCredential = auth.GoogleAuthProvider.credential(
        userInfo.idToken,
      );
      await auth().signInWithCredential(googleCredential);

      // Register the Firebase user with CometChat using their UID
      const firebaseUser = auth().currentUser;
      if (firebaseUser) {
        const cometChatUser = new CometChat.User(firebaseUser.uid);
        cometChatUser.setName(userInfo.user.name);

        CometChat.createUser(cometChatUser, COMETCHAT_AUTHID).then(
          createdUser => {
            // login user
            CometChat.login(createdUser.getUid(), COMETCHAT_AUTHID).then(
              user => {
                setLoadingGoogle(false);
                // Navigate to the CometChat UI
                navigation.replace('Home');
              },
            );
          },
          error => {
            setLoadingGoogle(false);
            console.error('Error creating CometChat user:', error);
            // Handle the error appropriately
          },
        );
      }
    } catch (error) {
      setLoadingGoogle(false);
      console.error('Google Sign-In Error:', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // User canceled the sign-in process
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // Sign-in is in progress
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // Play Services not available or outdated on the device
      } else {
        setLoadingGoogle(false);
        // Other error occurred
      }
    }
  };

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

      {loadingGoogle ? (
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
        disabled={loadingGoogle}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'black',
    paddingVertical: 50,
  },
  headerContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    paddingHorizontal: 30,
  },
  welcomeContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  text: {fontSize: 22, fontWeight: 'bold', color: 'white'},
  welcomeText: {fontSize: 16, fontWeight: '500', color: '#969BA1'},
  backArrow: {
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    width: 35,
    height: 35,
    borderRadius: 50,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  errorText: {
    paddingVertical: 20,
    color: '#E51D43',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 130,
    height: 70,
  },
  inputContainer: {
    width: '90%',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#969BA1',
    padding: 10,
    marginBottom: 10,
    color: 'white',
    borderRadius: 12,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#969BA1',
    borderRadius: 12,
  },
  passwordInput: {
    flex: 1,
    padding: 10,
    color: 'white',
  },
  borderActive: {
    borderColor: 'blue',
  },
  borderInactive: {
    borderColor: 'black',
  },
  loginButton: {
    backgroundColor: '#E51D43',
    padding: 10,
    borderRadius: 5,
    width: '90%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPasswordLink: {
    alignSelf: 'flex-end',
    marginTop: 10,
    color: '#E51D43',
  },
  // signUpLink: {
  //   marginTop: 20,
  //   flexDirection: 'row',
  // },
  // linkText: {
  //   color: '#E51D43',
  //   fontSize: 12,
  // },
  // buttonText: {
  //   color: '#333',
  //   fontSize: 18,
  //   fontWeight: '800',
  // },

  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    width: '80%',
  },
  horizontalLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'white',
  },
  orText: {
    paddingHorizontal: 10,
    color: 'white',
  },
  googleLoginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 12,
    width: '90%',
    marginTop: 10,
  },
  googleIcon: {
    marginRight: 10,
  },
  googleButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  signUpLink: {
    marginTop: 20,
    flexDirection: 'row',
  },
  linkText: {
    color: '#E51D43',
    fontSize: 12,
  },
});
