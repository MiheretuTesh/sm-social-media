import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import 'react-native-gesture-handler';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {CometChat} from '@cometchat-pro/react-native-chat';
import {COMETCHAT_AUTHID} from '@env';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const windowWidth = Dimensions.get('window').width;

const LoginScreen = React.memo(({navigation}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleLogin = async () => {
    try {
      // Sign in with Google
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      // Get user details from Google
      const {idToken, user} = userInfo;
      const {email, givenName, familyName} = user;

      // Sign in to Firebase with Google credentials
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);

      // Now, log in the user to CometChat
      const firebaseUID = auth().currentUser.uid;
      const cometChatUser = new CometChat.User(firebaseUID);
      cometChatUser.setName(`${givenName} ${familyName}`); // Set the name as needed

      // Log in the user to CometChat
      CometChat.login(cometChatUser, COMETCHAT_AUTHID).then(
        loggedInUser => {
          console.log('Logged in to CometChat:', loggedInUser);

          // You can navigate to the next screen or perform any other actions upon successful login.
        },
        error => {
          console.error('Error logging in to CometChat:', error);

          // Handle CometChat login errors appropriately
        },
      );
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // Handle the case where the user cancels the Google Sign-In process.
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // Handle the case where Google Sign-In is already in progress.
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // Handle the case where Play Services are not available on the device.
      } else {
        console.error('Google Sign-In error:', error);

        // Handle other Google Sign-In errors appropriately
      }
    }
  };

  const handleEmailLogin = () => {
    if (email && password) {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(userCredential => {
          // Signed in
          const user = userCredential.user;
          console.log('User signed in:', user.email);

          // Now, log in the user to CometChat
          const firebaseUID = user.uid;
          const cometChatUser = new CometChat.User(firebaseUID);
          cometChatUser.setName(user.displayName || ''); // Set the name as needed

          // Log in the user to CometChat
          CometChat.login(cometChatUser, COMETCHAT_AUTHID).then(
            loggedInUser => {
              console.log('Logged in to CometChat:', loggedInUser);

              // You can navigate to the next screen or perform any other actions upon successful login.
              // For example:
              // navigation.navigate('NextScreen');
            },
            error => {
              console.error('Error logging in to CometChat:', error);

              // Handle CometChat login errors appropriately
            },
          );
        })
        .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error('Email login error:', errorMessage);

          // Handle Firebase email login errors appropriately
        });
    } else {
      // Handle the case where email or password is missing.
      // You can display an error message to the user.
    }
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

      <TouchableOpacity
        style={styles.loginButton}
        activeOpacity={0.7}
        onPress={handleEmailLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.googleLoginButton}
        onPress={handleGoogleLogin}>
        <Image
          source={require('../../assets/icons/Google_Icons.webp')}
          style={{width: 30, height: 30}}
        />
        <Text style={styles.googleButtonText}>Continue with Google</Text>
      </TouchableOpacity>

      <View style={{flex: 1}} />
      <View style={styles.signUpLink}>
        <Text style={{fontSize: 12, color: '#969BA1'}}>Not a member?</Text>
        <TouchableOpacity onPress={() => navigation.push('SignUpScreen')}>
          <Text style={styles.linkText}> Register Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'black',
    paddingVertical: 50,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20,
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
  toggleButton: {
    padding: 10,
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
  signUpLink: {
    marginTop: 20,
    flexDirection: 'row',
  },
  linkText: {
    color: '#E51D43',
    fontSize: 12,
  },
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
});
