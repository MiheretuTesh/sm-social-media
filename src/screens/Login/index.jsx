import React, {useState, useCallback, useEffect} from 'react';
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
import {CometChat} from '@cometchat-pro/react-native-chat';
import {COMETCHAT_AUTHID} from '@env';
import {loginUser} from '../../store/reducers/auth/authAction';

const SignUpScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const {user, isLoggedIn, error, loading} = useSelector(state => state.auth);

  useEffect(() => {
    console.log(user, 'user');
    console.log(error, 'error');
  }, [user, error]);

  const handleGoogleLogin = () => {
    // Implement your Google login logic here
  };

  const handleLogin = useCallback(async () => {
    // setError(null);
    // setLoading(true);
    // try {
    //   const userCredential = await auth().signInWithEmailAndPassword(
    //     email,
    //     password,
    //   );
    //   const firebaseUser = userCredential.user;
    //   const firebaseUID = firebaseUser.uid;
    //   console.log(firebaseUser, firebaseUID, 'Firebase Hello');
    // } catch (error) {
    //   console.log(error);
    //   if (error.message) setError('Email or Password is incorrect');
    // } finally {
    //   setLoading(false);
    // }
    dispatch(loginUser(email, password));
  }, [dispatch, email, password]);

  useEffect(() => {
    if (isLoggedIn === true) {
      navigation.replace('CometChatUI');
    }
  }, [isLoggedIn]);

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
          Hello Again!
        </Text>
        <Text style={{fontSize: 16, fontWeight: '500'}}>
          Welcome back you've
        </Text>
        <Text style={{fontSize: 16, fontWeight: '500'}}>been missed!</Text>
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
          onPress={handleLogin}
          disabled={!email || !password}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={styles.googleLoginButton}
        onPress={handleGoogleLogin}>
        <Image
          source={require('../../assets/icons/Google_Icons.webp')} // Replace with your Google icon image
          style={{width: 30, height: 30}}
        />
        <Text style={styles.googleButtonText}>Continue with Google</Text>
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <View style={{flex: 1}} />
      <View style={styles.signUpLink}>
        <Text style={{fontSize: 12}}>Not a member?</Text>
        <TouchableOpacity onPress={() => navigation.push('SignUpScreen')}>
          <Text style={styles.linkText}> Register Now</Text>
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
  forgotPasswordLink: {
    alignSelf: 'flex-end',
    marginTop: 10,
    color: '#E51D43',
  },
  borderActive: {
    borderColor: 'blue',
  },
  borderInactive: {
    borderColor: 'black',
  },
  errorText: {
    paddingVertical: 20,
    color: '#E51D43',
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
