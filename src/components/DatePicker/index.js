import React, {useState} from 'react';
import {View, Text, StyleSheet, Picker, TextInput} from 'react-native';

const MyDatePicker = props => {
  const [selectedDate, setSelectedDate] = useState(props.date);

  const handleDateChange = (value, type) => {
    const newDate = {...selectedDate};
    newDate[type] = value;
    setSelectedDate(newDate);
    props.onDateChange(newDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Date:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          style={styles.picker}
          selectedValue={selectedDate.day}
          onValueChange={itemValue => handleDateChange(itemValue, 'day')}>
          {Array.from({length: 31}, (_, i) => i + 1).map(day => (
            <Picker.Item key={day} label={day.toString()} value={day} />
          ))}
        </Picker>

        <Picker
          style={styles.picker}
          selectedValue={selectedDate.month}
          onValueChange={itemValue => handleDateChange(itemValue, 'month')}>
          {Array.from({length: 12}, (_, i) => i + 1).map(month => (
            <Picker.Item key={month} label={month.toString()} value={month} />
          ))}
        </Picker>

        <Picker
          style={styles.picker}
          selectedValue={selectedDate.year}
          onValueChange={itemValue => handleDateChange(itemValue, 'year')}>
          {Array.from({length: 100}, (_, i) => 2023 - i).map(year => (
            <Picker.Item key={year} label={year.toString()} value={year} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 10,
  },
  pickerContainer: {
    flexDirection: 'row',
  },
  picker: {
    flex: 1,
  },
});

export default MyDatePicker;
