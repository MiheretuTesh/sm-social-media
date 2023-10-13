import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {MultiSelect} from 'react-native-element-dropdown';
import {styles} from './styles';

const MultiSelectComponent = props => {
  const {data, onChange, selected} = props;
  //const [selected, setSelected] = useState([]);

  return (
    <View style={styles.container}>
      <MultiSelect
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        search
        data={data}
        labelField="label"
        valueField="value"
        placeholder="Select item"
        searchPlaceholder="Search..."
        value={selected}
        onChange={onChange}
        selectedStyle={styles.selectedStyle}
      />
    </View>
  );
};

export default MultiSelectComponent;
