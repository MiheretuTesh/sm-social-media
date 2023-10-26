import React, {useState} from 'react';
import {
  View,
  ScrollView,
  TextInput,
  Button,
  Text,
  ActivityIndicator,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Dropdown} from 'react-native-element-dropdown';
import MultiSelectComponent from '../../components/MultiSelectorDropdown/MultiSelect';
import firestore from '@react-native-firebase/firestore';
import {
  countriesList,
  CityList,
  religionBackgroundList,
  prayerFrequencyList,
  lookingForList,
  dietryPreferancesList,
  languagesList,
  universityList,
  degreesList,
  fieldOFstudyList,
  skillsList,
} from '../../constants/Constants';
import TextInputField from '../../components/TextInputField';
import {setLoading} from '../../store/reducers/auth/authSlice';
import {styles} from './style';

function Section({sectionHeaderText, children}) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionHeaderText}>{sectionHeaderText}</Text>
      {children}
    </View>
  );
}

function RNDropDown({data, name, selectedValue, onValueChange, title}) {
  return (
    <View style={styles.dropdownContainer}>
      <Text style={styles.dropdownTitle}>{name}</Text>
      <Dropdown
        style={styles.dropdown}
        label={name}
        data={data}
        value={selectedValue}
        search
        searchPlaceholder="search ..."
        labelField="label"
        valueField="value"
        onChange={value => onValueChange(value)}
        containerStyle={{backgroundColor: '#ECE9E9', color: 'black'}}
        placeholderStyle={{color: 'black'}}
        selectedTextStyle={{color: 'black'}}
        inputSearchStyle={{color: 'red', backgroundColor: 'white'}}
      />
    </View>
  );
}

function AdditionalInformationScreen({route, navigation}) {
  // Extract user information from props
  const {uid} = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  // const {fullName, email, birthDate, password, profilePicture} = route.params;
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  // additional info
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [university, setUniversity] = useState('');
  const [degree, setDegree] = useState('');
  const [fieldOfStudy, setFieldOfStudy] = useState('');

  // work exprience
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobStartDate, setJobStartDate] = useState(new Date());
  const [jobEndDate, setJobEndDate] = useState(new Date());

  const [skills, setSkills] = useState([]);
  const [addEndorsement, setAddEndorsement] = useState([]);
  const [languages, setLanguages] = useState([]);

  // about me
  const [aboutMe, setAboutMe] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [additionalEmail, setAdditionalEmail] = useState('');

  // Religious background
  const [religionBackground, setReligionBackground] = useState('');
  const [prayerFrequency, setPrayerFrequency] = useState('');
  const [dietaryPreferences, setDietaryPreferences] = useState('');

  // Groups & Organizations
  const [organizations, setOrganizations] = useState('');
  const [seeking, setLookingTo] = useState('');

  const handleStartDateChange = (event, selectedDate) => {
    if (Platform.OS === 'android') {
      setShowStartDatePicker(false);
    }
    if (event.type === 'dismissed') {
      // Handle dismissal if needed
      return;
    }

    if (event.type === 'neutralButtonPressed') {
      setJobStartDate(new Date(0));
    } else {
      setJobStartDate(selectedDate);
    }
  };

  const handleEndDateChange = (event, selectedDate) => {
    if (Platform.OS === 'android') {
      setShowEndDatePicker(false);
    }
    if (event.type === 'dismissed') {
      // Handle dismissal if needed
      return;
    }

    if (event.type === 'neutralButtonPressed') {
      setJobEndDate(new Date(0));
    } else {
      setJobEndDate(selectedDate);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const userId = uid;
      console.log('userid', userId);
      const userProfileData = {
        isProfileCompleted: true,
        personalInformaition: {
          city,
          country,
          university,
          degree,
          fieldOfStudy,
          workHistory: {jobTitle, companyName, jobStartDate, jobEndDate},
          skills,
          addEndorsement,
          languages,
          aboutMe,
          phoneNumber,
          additionalEmail,
          organizations,
          religionBackground,
          prayerFrequency,
          dietaryPreferences,
          seeking,
        },
      };
      console.log(userProfileData);

      // Reference to the Firestore collection for user profiles
      const userProfilesCollection = firestore().collection('user-profiles');

      // Add or update the user profile document in Firestore
      await userProfilesCollection
        .doc(userId)
        .set(userProfileData, {merge: true})
        .then(() => {
          console.log('User profile data saved in Firestore');
        })
        .catch(error => {
          console.error('Error saving user profile data:', error);
        });

      // Navigate to the next screen or perform any other action
      setLoading(false);
      navigation.navigate('Home');
    } catch (error) {
      setLoading(false);
      console.error('Error saving user profile data:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {isLoading && <ActivityIndicator size={'large'} color="#E51D43" />}
      <Text style={styles.headerText}>Complete Your Profile</Text>
      <Section sectionHeaderText="Location">
        <RNDropDown
          name="City"
          data={CityList}
          selectedValue={city}
          onValueChange={event => setCity(event.value)}
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
        />
        <RNDropDown
          name="Country"
          data={countriesList}
          selectedValue={country}
          onValueChange={event => setCountry(event.value)}
        />
      </Section>
      <Section sectionHeaderText="Education">
        <RNDropDown
          name="University"
          data={universityList}
          selectedValue={university}
          onValueChange={event => setUniversity(event.value)}
        />
        <RNDropDown
          name="Degree"
          data={degreesList}
          selectedValue={degree}
          onValueChange={event => setDegree(event.value)}
        />
        <RNDropDown
          name="Field of Study"
          data={fieldOFstudyList}
          selectedValue={fieldOfStudy}
          onValueChange={event => setFieldOfStudy(event.value)}
        />
      </Section>

      <Section sectionHeaderText="Work Experience">
        <TextInputField
          name="Job Title"
          placeholder={jobTitle}
          value={jobTitle}
          onChangeText={text => setJobTitle(text)}
        />

        <TextInputField
          name="Company name"
          placeholder="Company Name"
          value={companyName}
          onChangeText={text => setCompanyName(text)}
        />

        <View style={styles.datePickerContainer}>
          <View>
            <Text style={{color: '#333'}}>Start Date: </Text>
            <TouchableOpacity
              style={styles.date}
              onPress={() => setShowStartDatePicker(true)}>
              <Text>
                {jobStartDate.toLocaleDateString('en-US', {
                  year: '2-digit',
                  month: '2-digit',
                  day: '2-digit',
                })}
              </Text>
            </TouchableOpacity>
            {showStartDatePicker && (
              <DateTimePicker
                testID="startDatePicker"
                value={jobStartDate}
                mode="date"
                display="spinner"
                onChange={handleStartDateChange}
              />
            )}
          </View>
          <View>
            <Text style={{color: '#333'}}>End Date: </Text>
            <TouchableOpacity
              style={styles.date}
              onPress={() => setShowEndDatePicker(true)}>
              <Text>
                {jobEndDate.toLocaleDateString('en-US', {
                  year: '2-digit',
                  month: '2-digit',
                  day: '2-digit',
                })}
              </Text>
            </TouchableOpacity>
            {showEndDatePicker && (
              <DateTimePicker
                testID="endDatePicker"
                value={jobEndDate}
                mode="date"
                display="spinner"
                onChange={handleEndDateChange}
              />
            )}
          </View>
        </View>
      </Section>

      <Section sectionHeaderText="Skills and Endorsements">
        <MultiSelectComponent
          data={skillsList}
          onChange={item => setSkills(item)}
          selected={skills}
        />

        <TextInput
          placeholder="Add Endorsement"
          value={addEndorsement}
          onChangeText={text => setAddEndorsement(text)}
          placeholderTextColor="#333"
        />
      </Section>

      <Section>
        <TextInputField
          name="Biography"
          placeholder="I am .."
          value={aboutMe}
          onChangeText={text => setAboutMe(text)}
          multiline={true}
        />
      </Section>

      <Section sectionHeaderText="Contact Information">
        <TextInputField
          name={'Phone Number'}
          placeholder="+1 234 ..."
          value={phoneNumber}
          onChangeText={text => setPhoneNumber(text)}
        />
        <TextInputField
          name="Email"
          placeholder="Email"
          value={additionalEmail}
          onChangeText={text => setAdditionalEmail(text)}
        />
        <TextInput
          placeholder="Additional Email"
          value={additionalEmail}
          onChangeText={text => setAdditionalEmail(text)}
          style={styles.input}
          placeholderTextColor="#333"
        />
      </Section>

      <Section sectionHeaderText="Groups & Organizations">
        <TextInput
          placeholder="Organizations"
          value={organizations}
          onChangeText={text => setOrganizations(text)}
          style={styles.input}
          placeholderTextColor="#333"
        />
      </Section>

      <Section sectionHeaderText="Religious Background">
        <RNDropDown
          name="Religion Background"
          data={religionBackgroundList}
          selectedValue={religionBackground}
          onValueChange={event => setReligionBackground(event.value)}
        />
        <RNDropDown
          name="Prayer Frequency"
          data={prayerFrequencyList}
          selectedValue={prayerFrequency}
          onValueChange={event => setPrayerFrequency(event.value)}
        />
        <RNDropDown
          name="Dietary Preferences"
          data={dietryPreferancesList}
          selectedValue={dietaryPreferences}
          onValueChange={event => setDietaryPreferences(event.value)}
        />
      </Section>

      <Section sectionHeaderText="Languages Spoken">
        <MultiSelectComponent
          data={languagesList}
          onChange={item => setLanguages(item)}
          selected={languages}
        />
      </Section>

      <Section>
        <RNDropDown
          name="Looking To"
          data={lookingForList}
          selectedValue={seeking}
          onValueChange={event => setLookingTo(event.value)}
        />
      </Section>
      <View style={styles.buttonsContainer}>
        <Button
          // style={styles.button}
          title="Submit"
          onPress={handleSubmit}
          color="#E51D43"
        />
        <Button
          style={styles.button}
          title="Skip"
          color="#E51D43"
          onPress={() => {
            navigation.navigate('Home');
          }}
        />
      </View>
    </ScrollView>
  );
}

export default AdditionalInformationScreen;
