import {Text, View} from 'react-native';
import TouchableOpacity from 'react-native-gesture-handler';
import React, {useState, Component} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Title} from 'chart.js';
import {TextInput} from 'react-native-gesture-handler';

export function DatePicker({title, onDateChange}) {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    if (Platform.OS === 'android') {
      setShow(false);
    }
    if (event.type === 'dismissed') {
      Alert.alert(
        'picker was dismissed',
        undefined,
        [
          {
            text: 'great',
          },
        ],
        {cancelable: true},
      );
      return;
    }

    if (event.type === 'neutralButtonPressed') {
      setDate(new Date(0));
    } else {
      setDate(selectedDate);
      onDateChange(date);
    }
  };
  return (
    <View>
      <Text>{title}</Text>
      <TouchableOpacity onPress={setShow(true)}>
        {/* <TextInput placeholder={date.getFullYear} editable="false" /> */}
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={'date'}
            display={'spinner'}
            onChange={onChange}
          />
        )}
      </TouchableOpacity>
    </View>
  );
}

export default DatePicker;
