import firebase from '@react-native-firebase/app';
import {setUser} from '../auth/authSlice';

export const getUserProfileData = async (userUID: string | undefined) => {
  try {
    const userDoc = await firebase
      .firestore()
      .collection('user-profiles')
      .doc(userUID)
      .get();
    if (userDoc.exists) {
      const userData = userDoc.data();
      setUser(userData);
      console.log('uerinFO', userData);
      return userData;
    } else {
      console.log('User profile not found.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user profile data:', error);
    return null;
  }
};
