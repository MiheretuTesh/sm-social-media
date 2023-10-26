import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
    paddingHorizontal: 20,
    flexDirection: 'column',
  },
  wrapper: {
    flex: 1,
    // paddingHorizontal: 20,
    flexDirection: 'column',
    marginBottom: 20,
    justifyContent: 'flex-end',
  },
  closeButtonContainer: {
    alignSelf: 'flex-end',
    marginTop: 20,
  },
  closeButton: {
    borderRadius: 20,
    padding: 10,
  },

  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    paddingTop: 20,
    marginBottom: 20,
  },
  button: {
    borderRadius: 50,
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: 'rgba(150, 150, 150, 0.8)',
  },
  userInfoContainer: {
    height: 'auto',
    backgroundColor: 'rgba(150, 150, 150, 0.8)',
    borderRadius: 20,
    marginBottom: 20,
  },
  userInfo: {
    padding: 20,
  },
  userInfoText: {
    color: 'white',
    fontSize: 14,
    marginBottom: 5,
  },
  userNameText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  blockUserButton: {
    alignSelf: 'center',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'rgba(150, 150, 150, 0.8)',
  },
  blockUserText: {
    color: '#E51D43',
    fontSize: 18,
  },
});
