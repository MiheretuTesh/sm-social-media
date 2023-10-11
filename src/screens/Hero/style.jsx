import {StyleSheet, Dimensions} from 'react-native';
import Metrics from '../../constants/Metrics';

const windowWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
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
    width: Metrics.measure(windowWidth * 0.8),
    height: undefined,
    aspectRatio: Metrics.measure(1),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Metrics.measure(20),
  },
  loginButton: {
    backgroundColor: '#333',
    paddingHorizontal: Metrics.measure(0.08 * windowWidth),
    paddingVertical: Metrics.measure(10),
    borderRadius: Metrics.measure(5),
    marginHorizontal: Metrics.measure(0.02 * windowWidth),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpButton: {
    backgroundColor: '#E51D43',
    paddingHorizontal: Metrics.measure(0.06 * windowWidth),
    paddingVertical: Metrics.measure(10),
    borderRadius: Metrics.measure(5),
    marginHorizontal: Metrics.measure(0.02 * windowWidth),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: Metrics.measure(18),
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  loginButtonText: {
    color: '#E51D43',
    fontSize: Metrics.measure(18),
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  signUpButtonText: {
    color: '#333',
    fontSize: Metrics.measure(18),
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});
