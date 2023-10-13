import {View, Text, TextInput} from 'react-native';
import React from 'react';
import {styles} from './styles';

export default function TextInputField(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{props.name}</Text>
      <TextInput
        style={styles.input}
        placeholder={props.placeholder}
        onChangeText={props.onChangeText}
        value={props.value}
        multiline={props.multiline}
      />
    </View>
  );
}
