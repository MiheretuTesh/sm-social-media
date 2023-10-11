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
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import {CometChat} from '@cometchat/chat-sdk-react-native';
import {COMETCHAT_AUTHID, FIREBASE_WEB_CLIENTID} from '@env';
import {signUp} from '../../store/reducers/auth/authAction';
import {styles} from './style';

const SignUpScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loadingGoogle, setLoadingGoogle] = useState(false);

  const {user, isLoggedIn, error, loading} = useSelector(state => state.auth);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: FIREBASE_WEB_CLIENTID,
      accountName: '',
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
          <Icon name="arrow-back-ios" size={20} style={styles.backIcon} />
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
        <Text style={styles.helloText}>Hello!</Text>
        <Text style={styles.welcomeText}>Welcome</Text>
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
        <ActivityIndicator size="large" style={styles.loading} />
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
          <ActivityIndicator size="large" style={styles.loading} />
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
        <Text style={styles.bottomText}>Already a member?</Text>
        <TouchableOpacity onPress={() => navigation.push('Login')}>
          <Text style={styles.linkText}> Login Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUpScreen;
