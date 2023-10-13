import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  TextInput,
  Button,
  Text,
  ActivityIndicator,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import TextInputField from '../../components/TextInputField';
import MultiSelectComponent from '../../components/MultiSelectorDropdown/MultiSelect';
import {useDispatch} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Dropdown} from 'react-native-element-dropdown';
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
import {styles} from './style';

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

function Section({sectionHeaderText, children}) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionHeaderText}>{sectionHeaderText}</Text>
      {children}
    </View>
  );
}

function EditInformationScreen({route, navigation}) {
  const {uid} = route.params;
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true); // Initially, set to true to show loading indicator
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
  const [lookingTO, setLookingTo] = useState('');

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
  useEffect(() => {
    // Fetch user's data from Firestore
    const userProfilesCollection = firestore().collection('user-profiles');
    userProfilesCollection
      .doc(uid)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          const userData = documentSnapshot.data().personalInformaition;

          // Set the state variables based on fetched data
          setCity(userData.city);
          setCountry(userData.country);
          setUniversity(userData.university);
          setDegree(userData.degree);
          setFieldOfStudy(userData.fieldOfStudy);

          setJobTitle(userData.workHistory.jobTitle);
          setCompanyName(userData.workHistory.companyName);
          setJobStartDate(userData.workHistory.jobStartDate);
          setJobEndDate(userData.workHistory.jobEndDate);

          setSkills(userData.skills);
          setAddEndorsement(userData.addEndorsement);
          setLanguages(userData.languages);

          setAboutMe(userData.aboutMe);
          setPhoneNumber(userData.phoneNumber);
          setAdditionalEmail(userData.additionalEmail);

          setReligionBackground(userData.religionBackground);
          setPrayerFrequency(userData.prayerFrequency);
          setDietaryPreferences(userData.dietaryPreferences);

          setOrganizations(userData.organizations);
          setLookingTo(userData.lookingTO);

          setIsLoading(false); // Data has been fetched, loading is complete
        }
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        setIsLoading(false);
      });
  }, [uid]);

  const handleUpdate = async () => {
    // Implement the logic to update the user's information and save it to Firestore
  };

  return (
    <ScrollView style={styles.container}>
      {isLoading && <ActivityIndicator size={'large'} color="#E51D43" />}
      <Text style={styles.headerText}>Update Your Information</Text>
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
        {/* <TextInput
          placeholder="Job Title"
          value={jobTitle}
          onChangeText={text => setJobTitle(text)}
          style={styles.input}
          placeholderTextColor="#333"
        /> */}
        <TextInputField
          name="Company name"
          placeholder="Company Name"
          value={companyName}
          onChangeText={text => setCompanyName(text)}
        />
        {/* <TextInput
          placeholder="Company Name"
          value={companyName}
          onChangeText={text => setCompanyName(text)}
          style={styles.input}
          placeholderTextColor="#333"
        /> */}
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
        {
          // replace with multi selectors
        }
        <MultiSelectComponent
          data={skillsList}
          onChange={item => setSkills(item.value)}
          selected={skills}
        />
        {/* <MultiSelector
          label="Skills"
          data={skillsList}
          max={5}
          selectedItems={skills}
          setSelectedItems={setSkills}
        /> */}
        {/* <TextInput
          placeholder="Skills"
          value={skills}
          onChangeText={text => setSkills(text)}
          style={styles.input}
          placeholderTextColor="#333"
        /> */}
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
        {/* <TextInput
          placeholder="About Me"
          value={aboutMe}
          onChangeText={text => setAboutMe(text)}
          multiline={true}
          style={styles.input}
          placeholderTextColor="#333"
        /> */}
      </Section>

      <Section sectionHeaderText="Contact Information">
        <TextInputField
          name={'Phone Number'}
          placeholder="+1 234 ..."
          value={phoneNumber}
          onChangeText={text => setPhoneNumber(text)}
        />
        {/* <TextInput
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={text => setPhoneNumber(text)}
          style={styles.input}
          placeholderTextColor="#333"
        /> */}
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
        {
          //  change with multiselector
        }
        <RNDropDown
          name="Languages"
          data={languagesList}
          selectedValue={languages}
          onValueChange={event => setLanguages(event.value)}
        />
      </Section>

      <Section>
        <RNDropDown
          name="Looking To"
          data={lookingForList}
          selectedValue={lookingTO}
          onValueChange={event => setLookingTo(event.value)}
        />
      </Section>
      <View style={styles.buttonsContainer}>
        <Button
          // style={styles.button}
          title="Submit"
          onPress={handleUpdate}
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

export default EditInformationScreen;
