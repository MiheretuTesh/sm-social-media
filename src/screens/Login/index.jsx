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

const windowWidth = Dimensions.get('window').width;

const LoginScreen = React.memo(({navigation}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleGoogleLogin = () => {
    // Implement your Google login logic here
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
          />
          {/* <TouchableOpacity
            style={styles.toggleButton}
            onPress={togglePasswordVisibility}>
            <Icon
              name={showPassword ? 'eye-slash' : 'eye'}
              size={20}
              color="black"
            />
          </TouchableOpacity> */}
        </View>
        <TouchableOpacity style={styles.forgotPasswordLink}>
          <Text style={styles.linkText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginButton} activeOpacity={0.7}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* <View style={styles.orContainer}>
        <View style={styles.horizontalLine} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.horizontalLine} />
      </View> */}

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
    // justifyContent: 'center',
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
  titleText: {
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'black',
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
});
