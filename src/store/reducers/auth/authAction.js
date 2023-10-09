import {
  setLoading,
  authStart,
  authFail,
  authSuccess,
  logoutSuccess,
  authStartSocailLink,
} from './authSlice';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {CometChat} from '@cometchat/chat-sdk-react-native';
import {COMETCHAT_AUTHID, FIREBASE_WEB_CLIENTID} from '@env';
import {CometChatUIKit} from '@cometchat/chat-uikit-react-native';
import {AccessToken, LoginManager} from 'react-native-fbsdk-next';
import firestore from '@react-native-firebase/firestore';

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

export const loginUser = (email, password) => async dispatch => {
  try {
    dispatch(authStart());

    const userCredential = await auth().signInWithEmailAndPassword(
      email,
      password,
    );

    const firebaseUser = userCredential.user;
    const firebaseUID = firebaseUser.uid;

    CometChat.login(firebaseUID, COMETCHAT_AUTHID).then(
      loggedInUser => {
        console.log('Logged in to CometChat:', loggedInUser);
      },
      error => {
        console.error('Error logging in to CometChat:', error);
      },
    );

    // Loggin a CometChat user
    await CometChatUIKit.login(firebaseUID, COMETCHAT_AUTHID).then(
      user => {
        console.log('Login Successful:', {user});
      },
      error => {
        console.log('Login failed with exception:', {error});
      },
    );

    dispatch(authSuccess(firebaseUser));
  } catch (error) {
    console.error('Error signing up with Firebase:', error);
    dispatch(authFail('Error signing up with Firebase'));
  }
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
    const nameLst = userCredential.user.email.split('@');
    const name = nameLst[0];
    cometChatUser.setName(name || 'User One');

    const responseData = {
      name: name,
      email: userCredential.user.email,
      uid: firebaseUID,
    };

    const createdUser = await CometChat.createUser(
      cometChatUser,
      COMETCHAT_AUTHID,
    ).then(
      createdUser => {
        CometChat.login(createdUser.getUid(), COMETCHAT_AUTHID).then(user => {
          console.log('User Created Successfully', user);
          responseData.name = user.name;
          responseData.uid = user.uid;
          responseData.authToken = user.authToken;
          responseData.status = user.status;
        });

        // CometChatUIKit.getLoggedInUser()
        //   .then(user => {
        //     if (user != null) {
        //       // navigation.navigate('Home');
        //     }
        //   })
        //   .catch(e => console.log('Unable to get loggedInUser', e));
      },
      error => {
        console.log('User Creating Failed Failed', error);
      },
    );

    // Dispatch success action

    console.log(responseData, 'responseData responseData responseData');

    dispatch(authSuccess(responseData));
  } catch (error) {
    console.error('Error signing up with Firebase:', error);
    dispatch(authFail('Error signing up with Firebase'));
  }
};

const createUserInFirestore = async (userId, userData) => {
  try {
    // Reference to the Firestore collection for users
    const usersCollection = firestore().collection('users');

    // Add a new document with a generated ID
    await usersCollection.doc(userId).set(userData);

    console.log('User document created in Firestore');
  } catch (error) {
    console.error('Error creating user document:', error);
  }
};

//##TODO Social Media Sign-up and Login

export const signUpUsingGoogle = () => async dispatch => {
  try {
    dispatch(authStartSocailLink());

    GoogleSignin.configure({
      webClientId: FIREBASE_WEB_CLIENTID,
      prompt: 'select_account',
    });

    await GoogleSignin.hasPlayServices();

    const userInfo = await GoogleSignin.signIn();
    const {idToken} = userInfo;

    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    await auth().signInWithCredential(googleCredential);

    const firebaseUser = auth().currentUser;

    if (firebaseUser) {
      const cometChatUser = new CometChat.User(firebaseUser.uid);
      cometChatUser.setName(userInfo.user.name);

      await CometChat.createUser(cometChatUser, COMETCHAT_AUTHID).then(
        async createdUser => {
          CometChat.login(createdUser.getUid(), COMETCHAT_AUTHID).then(user => {
            // Navigate to the CometChat UI
          });

          await CometChatUIKit.login(firebaseUser.uid, COMETCHAT_AUTHID).then(
            user => {
              console.log('Login Successful:', {user});
            },
            error => {
              console.log('Login failed with exception:', {error});
            },
          );
        },
        error => {
          // setLoadingGoogle(false);
          dispatch(authFail());
          console.error('Error creating CometChat user:', error);
        },
      );
    } else {
      dispatch(authFail());
      console.error('Firebase user is null');
    }

    const responseData = {
      name: firebaseUser.displayName,
      email: firebaseUser.email,
      profile: firebaseUser.photoURL,
      uid: firebaseUser.uid,
    };
    //  await createUserInFirestore(firebaseUser.uid, responseData);

    dispatch(authSuccess(responseData));
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    } else if (error.code === statusCodes.IN_PROGRESS) {
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    } else {
      console.error('Google Sign-In error:', error);
    }
    dispatch(authFail('Error signing up with Firebase'));
  }
};

export const loginUsingGoogle = () => async dispatch => {
  try {
    dispatch(authStartSocailLink());

    GoogleSignin.configure({
      webClientId: FIREBASE_WEB_CLIENTID,
      prompt: 'select_account',
    });

    await GoogleSignin.hasPlayServices();

    const userInfo = await GoogleSignin.signIn();
    const {idToken} = userInfo;

    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    await auth().signInWithCredential(googleCredential);

    const firebaseUser = auth().currentUser;

    if (firebaseUser) {
      const firebaseUID = firebaseUser.uid;

      CometChat.login(firebaseUID, COMETCHAT_AUTHID).then(
        loggedInUser => {
          CometChatUIKit.login(loggedInUser.authToken)
            .then(user => {
              console.log(user, 'UI Kit setuped');
              CometChatUIKit.getLoggedInUser()
                .then(user => {
                  console.log(user, 'comet chat UI Logged In');
                })
                .catch(e => console.log('Unable to get loggedInUser', e));
              navigation.navigate('Home');
            })
            .catch(err => {
              console.log('Error while login:', err);
            });
        },
        error => {
          console.error('Error logging in to CometChat:', error);
        },
      );
    } else {
      console.error('Firebase user is null');
    }

    const responseData = {
      name: firebaseUser.displayName,
      email: firebaseUser.email,
      profile: firebaseUser.photoURL,
      uid: firebaseUser.uid,
    };

    dispatch(authSuccess(responseData));
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    } else if (error.code === statusCodes.IN_PROGRESS) {
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    } else {
      // setLoadingGoogle(false);
      dispatch(authFail());
      console.error('Google Sign-In error:', error);
    }
    dispatch(authFail('Error signing up with Firebase'));
  }
};

async function onFacebookButtonPress() {
  const result = await LoginManager.logInWithPermissions([
    'public_profile',
    'email',
  ]);

  if (result.isCancelled) {
    throw 'User cancelled the login process';
  }

  const data = await AccessToken.getCurrentAccessToken();

  if (!data) {
    throw 'Something went wrong obtaining access token';
  }

  const facebookCredential = auth.FacebookAuthProvider.credential(
    data.accessToken,
  );

  return auth().signInWithCredential(facebookCredential);
}

export const loginUsingFacebook = () => async dispatch => {
  try {
    dispatch(authStartSocailLink());

    onFacebookButtonPress().then(value => {
      if (value?.additionalUserInfo.isNewUser === true) {
        const firebaseUid = value?.user.uid;
        const userName = value.user.displayName;
        const cometChatUser = new CometChat.User(firebaseUid);
        cometChatUser.setName(userName);

        console.log(value, 'facebook');

        CometChat.createUser(cometChatUser, COMETCHAT_AUTHID).then(
          createdUser => {
            CometChat.login(createdUser.getUid(), COMETCHAT_AUTHID).then(
              user => {
                console.log('User Created CometChat in Gmail Auth', user);
              },
            );

            CometChatUIKit.getLoggedInUser()
              .then(user => {
                if (user != null) {
                  //  navigation.navigate('Home');
                }
              })
              .catch(e => console.log('Unable to get loggedInUser', e));
          },
          error => {
            console.log('Comet Chat Error', error);
          },
        );

        // CometChatUIKit.getLoggedInUser()
        //   .then(user => {
        //     if (user != null) {
        //       //navigation.navigate('Home');
        //     }
        //   })
        //   .catch(e => console.log('Unable to get loggedInUser', e));

        dispatch(authSuccess(value));
      } else {
        const firebaseUid = value?.user.uid;

        CometChat.login(firebaseUid, COMETCHAT_AUTHID).then(
          loggedInUser => {
            console.log('Logged in to CometChat:', loggedInUser);
          },
          error => {
            console.error('Error logging in to CometChat:', error);
          },
        );

        CometChatUIKit.getLoggedInUser()
          .then(user => {
            if (user != null) {
              // navigation.navigate('Home');
            }
          })
          .catch(e => console.log('Unable to get loggedInUser', e));

        const responseData = {
          name: value?.user.displayName,
          email: value?.user.email,
          uid: value?.user.uid,
          profile: value?.additionalUserInfo.profile.picture.data.url,
        };

        dispatch(authSuccess(responseData));
      }
    });
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    } else if (error.code === statusCodes.IN_PROGRESS) {
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    } else {
      // setLoadingGoogle(false);

      console.error('Google Sign-In error:', error);
    }
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
