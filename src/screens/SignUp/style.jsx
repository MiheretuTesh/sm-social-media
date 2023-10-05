import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
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
