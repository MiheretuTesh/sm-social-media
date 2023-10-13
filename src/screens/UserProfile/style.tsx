import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  headerText: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
    color: '#333',
  },
  container: {
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#969BA1',
    padding: 10,
    marginBottom: 10,
    borderRadius: 12,
    color: '#333',
  },
  skipText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  profilePictureContainer: {
    flexDirection: 'column-reverse',
  },
  profilePicture: {
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 10,
    width: 100,
    height: 100,
  },
  section: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  date: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#969BA1',
    padding: 10,
    marginBottom: 10,
    borderRadius: 12,
    color: 'white',
    fontWeight: 'bold',
  },
  uploadButton: {
    fontSize: 10,
    borderRadius: 8,
    marginBottom: 10,
    borderColor: '#E51D43',
  },
  uploadButtonTitle: {
    fontSize: 12,
    color: '#E51D43',
    borderColor: '#E51D43',
  },
  bottomContainer: {
    marginBottom: 10,
  },
  submitButton: {
    width: 175,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#E51D43',
    color: '#333',
  },
  uploadButtonContainer: {
    width: 150,
    marginHorizontal: 50,
    marginVertical: 10,
  },
  //   buttonContainer: {
  //     width: 175,
  //     marginHorizontal: 18,
  //     marginVertical: 10,
  //   },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
