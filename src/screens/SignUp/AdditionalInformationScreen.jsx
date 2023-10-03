import React, {useState} from 'react';
import {
  View,
  ScrollView,
  TextInput,
  Button,
  Text,
  StyleSheet,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import {Dropdown} from 'react-native-element-dropdown';

function Section({sectionHeaderText, children}) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionHeaderText}>{sectionHeaderText}</Text>
      {children}
    </View>
  );
}

function DropDown({data, name, selectedValue, onValueChange}) {
  return (
    <Dropdown
      label={name}
      data={data}
      value={selectedValue}
      onChangeText={value => onValueChange(value)}
    />
  );
}

const AdditionalInformationScreen = ({route, navigation}) => {
  // Extract user information from props
  // const {fullName, email, birthDate, password, profilePicture} = route.params;

  // additional info
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [university, setUniversity] = useState('');
  const [degree, setDegree] = useState('');
  const [fieldOfStudy, setFieldOfStudy] = useState('');

  // work exprience
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobStartDate, setJobStartDate] = useState('');
  const [jobEndDate, setJobEndDate] = useState('');

  // Skills and Endorsments
  const [skills, setSkills] = useState('');
  const [addEndorsement, setAddEndorsement] = useState('');

  // language
  const [languages, setLanguages] = useState(['']);

  // about me
  const [aboutMe, setAboutMe] = useState('');

  //contatct info (phone. alt eamil)
  const [phoneNumber, setPhoneNumber] = useState('');
  const [additionalEmail, setAdditionalEmail] = useState('');

  // Religious background
  const [religionBackground, setReligionBackground] = useState('');
  //prayer frequency
  const [prayerFrequency, setPrayerFrequency] = useState('');
  // Dietary Preferences
  const [dietaryPreferences, setDietaryPreferences] = useState('');

  // Groups & Organizations
  const [organizations, setOrganizations] = useState('');
  //  Looking to?
  const [lookingTO, setLookingTo] = useState('');

  const handleSubmit = () => {
    // Handle form submission with updated data
    // You can send this data to your backend or save it locally
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}>Complete Your Profile</Text>
      <Section sectionHeaderText="Location">
        <DropDown
          name="City"
          data={[
            'New York',
            'London',
            'Dubai',
            'Istanbul',
            'Kuala Lumpur',
            'More cities...',
          ]}
          selectedValue={city}
          onValueChange={value => setCity(value)}
        />
        <DropDown
          name="Country"
          data={['USA', 'UK', 'UAE', 'Turkey', 'Malaysia', 'More countries...']}
          selectedValue={country}
          onValueChange={value => setCountry(value)}
        />
      </Section>
      <Section sectionHeaderText="Education">
        <DropDown
          name="University"
          data={[
            'Harvard University',
            'Oxford University',
            'University of Toronto',
            'Cairo University',
            'More universities...',
          ]}
          selectedValue={university}
          onValueChange={value => setUniversity(value)}
        />
        <DropDown
          name="Degree"
          data={["Bachelor's", "Master's", 'PhD', 'Diploma', "Associate's"]}
          selectedValue={degree}
          onValueChange={value => setDegree(value)}
        />
        <DropDown
          name="Field of Study"
          data={[
            'Computer Science',
            'Business Administration',
            'Medicine',
            'Islamic Studies',
            'Engineering',
            'More fields...',
          ]}
          selectedValue={fieldOfStudy}
          onValueChange={value => setFieldOfStudy(value)}
        />
      </Section>

      <Section sectionHeaderText="Work Experience">
        <TextInput
          placeholder="Job Title"
          value={jobTitle}
          onChangeText={text => setJobTitle(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Company Name"
          value={companyName}
          onChangeText={text => setCompanyName(text)}
          style={styles.input}
        />
        <Text>Start Date:</Text>
        <DatePicker
          date={jobStartDate}
          mode="date"
          format="YYYY-MM-DD"
          onDateChange={date => setJobStartDate(date)}
        />
        <Text>End Date:</Text>
        <DatePicker
          date={jobEndDate}
          mode="date"
          format="YYYY-MM-DD"
          onDateChange={date => setJobEndDate(date)}
        />
      </Section>

      <Section sectionHeaderText="Skills and Endorsements">
        <TextInput
          placeholder="Skills"
          value={skills}
          onChangeText={text => setSkills(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Add Endorsement"
          value={addEndorsement}
          onChangeText={text => setAddEndorsement(text)}
        />
      </Section>

      <Section sectionHeaderText="About Me">
        <TextInput
          placeholder="About Me"
          value={aboutMe}
          onChangeText={text => setAboutMe(text)}
          multiline={true}
          style={styles.input}
        />
      </Section>

      <Section sectionHeaderText="Contact Information">
        <TextInput
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={text => setPhoneNumber(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Additional Email"
          value={additionalEmail}
          onChangeText={text => setAdditionalEmail(text)}
          style={styles.input}
        />
      </Section>

      <Section sectionHeaderText="Groups & Organizations">
        <TextInput
          placeholder="Organizations"
          value={organizations}
          onChangeText={text => setOrganizations(text)}
          style={styles.input}
        />
      </Section>

      <Section sectionHeaderText="Religious Background">
        <DropDown
          name="Religion Background"
          data={['Sunni', 'Shia', 'Sufi', 'Other']}
          selectedValue={religionBackground}
          onValueChange={value => setReligionBackground(value)}
        />
        <DropDown
          name="Prayer Frequency"
          data={['Regularly', 'Occasionally', 'Rarely']}
          selectedValue={prayerFrequency}
          onValueChange={value => setPrayerFrequency(value)}
        />
        <DropDown
          name="Dietary Preferences"
          data={['Halal', 'Vegetarian', 'Vegan', 'Other']}
          selectedValue={dietaryPreferences}
          onValueChange={value => setDietaryPreferences(value)}
        />
      </Section>

      <Section sectionHeaderText="Languages Spoken">
        <DropDown
          name="Languages"
          data={[
            'English',
            'Arabic',
            'Urdu',
            'French',
            'Spanish',
            'More languages...',
          ]}
          selectedValue={languages}
          onValueChange={value => setLanguages(value)}
        />
      </Section>

      <Section>
        <DropDown
          name="Looking To"
          data={['Make Friends', 'Network', 'Find A Partner']}
          selectedValue={lookingTO}
          onValueChange={value => setLookingTo(value)}
        />
      </Section>

      <Button title="Submit" onPress={handleSubmit} />
      <Button
        title="Skip"
        onPress={() => {
          // Handle skip action
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#969BA1',
    padding: 10,
    marginBottom: 10,
    borderRadius: 12,
  },
});

export default AdditionalInformationScreen;
