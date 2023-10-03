import React, {useState} from 'react';
import {
  View,
  ScrollView,
  TextInput,
  Button,
  Text,
  StyleSheet,
} from 'react-native';

const ProfileCompletionScreen = ({route, navigation}) => {
  // Extract user information from props
  const {fullName, email, birthDate, password, profilePicture} = route.params;

  const [updatedFullName, setUpdatedFullName] = useState(fullName || '');
  const [updatedEmail, setUpdatedEmail] = useState(email || '');
  const [updatedBirthDate, setUpdatedBirthDate] = useState(birthDate || '');

  const handleSubmit = () => {
    // Handle form submission with updated data
    // You can send this data to your backend or save it locally
  };

  return (
    <ScrollView>
      <Text style={styles.headerText}>Complete Your Profile</Text>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={updatedFullName}
          onChangeText={text => setUpdatedFullName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          value={updatedEmail}
          onChangeText={text => setUpdatedEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Date of Birth"
          value={updatedBirthDate}
          onChangeText={text => setUpdatedBirthDate(text)}
        />
        {/* Add input fields for other profile fields */}
        {/* Add an option to upload a profile picture */}
        <Button
          title="Upload Profile Picture"
          onPress={() => {
            /* Handle image upload */
          }}
        />
        <Button title="Submit" onPress={handleSubmit} />
      </View>
      <View style={styles.buttonContainer}>
        <Text style={styles.skipText}>Skip</Text>
        <Button
          title="Next"
          onPress={() => {
            /* Handle navigation to the next screen */
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerText: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
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
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  skipText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default ProfileCompletionScreen;
