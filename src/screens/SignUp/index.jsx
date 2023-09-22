import React, {useState, useCallback} from 'react';
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
import {useDispatch} from 'react-redux';
import {authSuccess, authFail} from '../../store/reducers/auth/authSlice';
import auth from '@react-native-firebase/auth';
import {CometChat} from '@cometchat-pro/react-native-chat';
import {COMETCHAT_AUTHID} from '@env';

const SignUpScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUp = useCallback(async () => {
    setError(null);
    setLoading(true);

    try {
      // Create a Firebase user

      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      // .then(user => {

      //   console.log('User account created & signed in!');
      // })
      // .catch(error => {
      //   if (error.code === 'auth/email-already-in-use') {
      //     console.log('That email address is already in use!');
      //   }

      //   if (error.code === 'auth/invalid-email') {
      //     console.log('That email address is invalid!');
      //   }

      //   console.error(error);
      // });

      const firebaseUser = userCredential.user;
      const firebaseUID = firebaseUser.uid;

      // Create a CometChat user
      const cometChatUser = new CometChat.User(firebaseUID);
      cometChatUser.setName(firebaseUser.displayName || '--');

      // Create the CometChat user using Promises
      await CometChat.createUser(cometChatUser, COMETCHAT_AUTHID).then(
        user => {
          console.log('user created', user);
        },
        error => {
          console.log('error', error);
        },
      );

      // Dispatch success action or navigate to another screen
      dispatch(authSuccess(firebaseUser));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [dispatch, email, password]);

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
          Hello!
        </Text>
        <Text style={{fontSize: 16, fontWeight: '500'}}>Welcome</Text>
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

      {error && <Text style={styles.errorText}>{error}</Text>}

      <View style={{flex: 1}} />
      <View style={styles.signUpLink}>
        <Text style={{fontSize: 12}}>Already a member?</Text>
        <TouchableOpacity onPress={() => navigation.push('LoginScreen')}>
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
