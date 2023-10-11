import {StyleSheet} from 'react-native';
import Metrics from '../../constants/Metrics';

export const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'black',
    paddingVertical: Metrics.measure(50),
  },
  topContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    paddingHorizontal: Metrics.measure(30),
  },
  backBtn: {
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    width: Metrics.measure(35),
    height: Metrics.measure(35),
    borderRadius: Metrics.measure(50),
  },
  backIcon: {
    paddingLeft: Metrics.measure(8),
    color: '#E51D43',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: Metrics.measure(20),
  },
  titleContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: Metrics.measure(20),
  },
  firstText: {
    fontSize: Metrics.measure(22),
    fontWeight: 'bold',
    color: 'white',
  },
  secondText: {
    fontSize: Metrics.measure(16),
    fontWeight: '500',
    color: '#969BA1',
  },
  thirdText: {
    fontSize: Metrics.measure(16),
    fontWeight: '500',
    color: '#969BA1',
  },
  loading: {color: '#E51D43'},
  image: {
    width: Metrics.measure(130),
    height: Metrics.measure(70),
  },
  inputContainer: {
    width: '90%',
    marginBottom: Metrics.measure(20),
  },
  loadingOverlay: {
    position: 'absolute',
    top: Metrics.measure(0),
    left: Metrics.measure(0),
    right: Metrics.measure(0),
    bottom: Metrics.measure(0),
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: Metrics.measure(1),
    borderColor: '#969BA1',
    padding: Metrics.measure(10),
    marginBottom: Metrics.measure(10),
    color: 'white',
    borderRadius: Metrics.measure(12),
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: Metrics.measure(1),
    borderColor: '#969BA1',
    borderRadius: Metrics.measure(12),
  },
  passwordInput: {
    flex: 1,
    padding: Metrics.measure(10),
    color: 'white',
  },
  forgotPasswordLink: {
    alignSelf: 'flex-end',
    marginTop: Metrics.measure(10),
    color: '#E51D43',
  },
  borderActive: {
    borderColor: 'blue',
  },
  borderInactive: {
    borderColor: 'black',
  },
  errorText: {
    paddingVertical: Metrics.measure(20),
    color: '#E51D43',
  },
  loginButton: {
    backgroundColor: '#E51D43',
    padding: Metrics.measure(10),
    borderRadius: Metrics.measure(5),
    width: '90%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: Metrics.measure(18),
    fontWeight: 'bold',
  },

  forgotPasswordLink: {
    alignSelf: 'flex-end',
    marginTop: Metrics.measure(10),
    color: '#E51D43',
  },
  signUpLink: {
    marginTop: Metrics.measure(20),
    flexDirection: 'row',
  },
  linkText: {
    color: '#E51D43',
    fontSize: Metrics.measure(12),
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Metrics.measure(20),
    width: '80%',
  },
  horizontalLine: {
    flex: 1,
    height: Metrics.measure(1),
    backgroundColor: 'white',
  },
  orText: {
    paddingHorizontal: Metrics.measure(10),
    color: 'white',
  },
  googleLoginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333',
    padding: Metrics.measure(10),
    borderRadius: Metrics.measure(12),
    width: '90%',
    marginTop: Metrics.measure(10),
    gap: Metrics.measure(10),
  },
  googleIcon: {
    marginRight: Metrics.measure(10),
  },
  googleButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  signUpLink: {
    marginTop: Metrics.measure(20),
    flexDirection: 'row',
  },
  notMemberTxt: {fontSize: Metrics.measure(12), color: '#969BA1'},
  linkText: {
    color: '#E51D43',
    fontSize: Metrics.measure(12),
  },

  bottomSeparator: {flex: 1},
});
