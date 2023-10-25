import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles} from './index.style';

const InChatUserOptionsScreen = ({route, navigation}: any) => {
  const {user} = route.params;

  if (!user) {
    return <Text>Loading</Text>;
  }

  function calculateAgeFromDateString(dateString: string | number) {
    let birthDateObj: Date;

    if (typeof dateString === 'string') {
      birthDateObj = new Date(dateString);
    } else if (typeof dateString === 'number') {
      birthDateObj = new Date(dateString);
    } else {
      return 'Invalid Date';
    }

    if (isNaN(birthDateObj.getTime())) {
      return 'Invalid Date';
    }

    const currentDate = new Date();
    const age = currentDate.getFullYear() - birthDateObj.getFullYear();

    if (
      currentDate.getMonth() < birthDateObj.getMonth() ||
      (currentDate.getMonth() === birthDateObj.getMonth() &&
        currentDate.getDate() < birthDateObj.getDate())
    ) {
      return age - 1;
    }

    return age;
  }

  return (
    <ImageBackground
      source={{
        uri: user.profilePicture || user.imageUrl,
      }}
      style={styles.container}>
      <View style={styles.closeButtonContainer}>
        <Pressable
          style={styles.closeButton}
          onPress={() => navigation.goBack()}>
          <Ionicons
            name="close-circle"
            size={40}
            color={'rgba(150, 150, 150, 0.8)'}
          />
        </Pressable>
      </View>
      <View style={styles.wrapper}>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button}>
            <Ionicons name="chatbox-ellipses" size={30} color="#E51D43" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Ionicons name="call" size={30} color="#E51D43" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Ionicons name="videocam" size={30} color="#E51D43" />
          </TouchableOpacity>
        </View>
        <View style={styles.userInfoContainer}>
          <View style={styles.userInfo}>
            <Text style={styles.userNameText}>
              {user.fullName || user.displayName}
            </Text>
            <Text style={styles.userInfoText}>
              Age:{' '}
              {user.birthDate
                ? calculateAgeFromDateString(
                    user.birthDate.toDate('YYYY/MM/DD').toDateString(),
                  )
                : user?.personalInfo?.age}
            </Text>
            <Text style={styles.userInfoText}>
              {user.personalInformaition?.aboutMe ||
                user?.personalInfo?.ethnicBackground.label}
            </Text>
            <Text style={styles.userInfoText}>
              Marital Status:{' '}
              {user.maritalStatus ||
                user?.personalInfo?.relationshipStatus.label}
            </Text>
            <Text style={styles.userInfoText}>
              Looking for{' '}
              {user?.seeking || user?.personalInformaition.lookingTO}
            </Text>
            <Text style={styles.userInfoText}>
              Occupation:{' '}
              {user.occupation || user?.personalInfo?.occupation.label}
            </Text>
          </View>
        </View>
        <Pressable style={styles.blockUserButton}>
          <Text style={styles.blockUserText}>Block User</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
};

export default InChatUserOptionsScreen;
