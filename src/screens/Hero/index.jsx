import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

const HeroScreen = React.memo(({navigation}) => {
  const {user, isLoggedIn, error, loading} = useSelector(state => state.auth);

  useEffect(() => {
    if (isLoggedIn === true) {
      console.log(isLoggedIn, "I'm True");
      navigation.replace('CometChatUI');
    }
  }, [isLoggedIn]);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {/* Place your image icon here */}
        <Image
          source={require('../../assets/icons/SM-logo-bg-removed.png')}
          style={styles.icon}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.push('LoginScreen')}>
          <Text style={styles.loginButtonText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.signUpButton}
          onPress={() => navigation.push('SignUpScreen')}>
          <Text style={styles.signUpButtonText}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  imageContainer: {
    flex: 1,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: '100%', // Adjust the width of your icon as needed
    height: 200, // Adjust the height of your icon as needed
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#333',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    width: '40%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpButton: {
    backgroundColor: '#E51D43',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    width: '40%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  loginButtonText: {
    color: '#E51D43',
    fontSize: 18,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  signUpButtonText: {
    color: '#333',
    fontSize: 18,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});

export default HeroScreen;
