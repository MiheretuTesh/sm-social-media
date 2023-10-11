import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  profileSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
  },
  nameContainer: {
    marginLeft: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    color: 'green',
  },
  preferencesSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
  },
  preferencesHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: 'black',
  },
  preferenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingVertical: 4,
    borderTopWidth: 1,
    // borderTopColor:
  },
  preferenceIcon: {
    marginRight: 8,
    fontSize: 24,
    color: 'gray',
  },
  preferenceText: {
    fontSize: 16,
    color: 'black',
  },
  btnContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {color: '#333'},
  errorField: {color: 'red'},
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
  buttonContainer: {
    width: 175,
    marginHorizontal: 18,
    marginVertical: 10,
  },
});
