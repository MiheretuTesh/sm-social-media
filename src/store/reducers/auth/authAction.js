import {
  setLoading,
  authStart,
  authFail,
  authSuccess,
  logoutSuccess,
} from './authSlice';
import auth from '@react-native-firebase/auth';
import {CometChat} from '@cometchat-pro/react-native-chat';
import {COMETCHAT_AUTHID} from '@env';

export const authCheckState = () => {
  return async dispatch => {
    try {
      const loggedInUser = await CometChat.getLoggedinUser();
      if (loggedInUser) {
        dispatch(authSuccess(loggedInUser));
      } else {
        dispatch(authFail('No user found'));
      }
    } catch (error) {
      console.error('Error checking CometChat user state:', error);
      dispatch(authFail('Error checking CometChat user state'));
    }
  };
};
export const signUp = (email, password) => async dispatch => {
  try {
    dispatch(authStart());

    //Create a Firebase user
    const userCredential = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    const firebaseUser = userCredential.user;
    const firebaseUID = firebaseUser.uid;

    // Create a CometChat user
    const cometChatUser = new CometChat.User(firebaseUID);
    cometChatUser.setName(firebaseUser.displayName || '');

    // Create the CometChat user using Promises
    const createdUser = await CometChat.createUser(
      cometChatUser,
      COMETCHAT_AUTHID,
    );

    // Dispatch success action
    dispatch(authSuccess(firebaseUser));
  } catch (error) {
    console.error('Error signing up with Firebase:', error);
    dispatch(authFail('Error signing up with Firebase'));
  }
};

export const logout = () => {
  return dispatch => {
    CometChat.logout().then(() => {
      dispatch(logoutSuccess());
    });
  };
};
