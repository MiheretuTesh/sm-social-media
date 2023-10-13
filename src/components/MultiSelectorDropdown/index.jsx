import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const MultiSelector = props => {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelect = item => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter(selected => selected !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const itemData = props.data.map(item => ({
    label: item,
    value: item,
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.label}</Text>
      <DropDownPicker
        items={itemData}
        multiple={true}
        multipleText="%d items have been selected"
        min={0}
        max={props.max || itemData.length}
        defaultValue={props.selectedItems}
        containerStyle={styles.dropdownContainer}
        style={styles.dropdown}
        dropDownStyle={styles.dropDown}
        itemStyle={styles.itemStyle}
        labelStyle={styles.labelStyle}
        onChangeItem={items =>
          props.setSelectedItems(items.map(item => item.value))
        }
      />
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
  },
  dropdownContainer: {
    height: 40,
    marginTop: 10,
  },
  dropdown: {
    borderColor: 'gray',
  },
  dropDown: {
    borderColor: 'gray',
  },
  itemStyle: {
    justifyContent: 'flex-start',
  },
  labelStyle: {
    fontSize: 16,
  },
});

export default MultiSelector;
