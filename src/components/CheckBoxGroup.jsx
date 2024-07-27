import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const CheckBoxGroup = ({items, onChange, multiple}) => {
  const toggleCheckbox = index => {
    const updatedItems = items.map((item, i) => {
      if (i === index) {
        return {...item, isChecked: !item.isChecked};
      } else if (!multiple && item.isChecked) {
        return {...item, isChecked: false};
      }
      return item;
    });

    onChange(updatedItems);
  };

  const renderItem = ({item, index}) => (
    <TouchableOpacity
      style={[
        styles.card,
        // eslint-disable-next-line react-native/no-inline-styles
        {backgroundColor: item.isChecked ? '#FF3A8E' : '#f0f0f0'},
      ]}
      onPress={() => toggleCheckbox(index)}>
      <Text style={styles.label}>{item.label}</Text>
      <CheckBox
        value={item.isChecked}
        onValueChange={() => toggleCheckbox(index)}
        boxType="square"
        style={styles.checkbox}
        tintColors={{true: '#FF3A8E', false: '#2C272C'}} // For iOS
        tintColor={item.isChecked ? '#FF3A8E' : '#2C272C'} // For Android
        onCheckColor={item.isChecked ? '#FF3A8E' : '#2C272C'}
        onTintColor={item.isChecked ? '#FF3A8E' : '#FFFDFF'}
        onFillColor={item.isChecked ? '#ffffff' : '#FFFDFF'}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        extraData={items}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
    width: '100%',
  },
  label: {
    flex: 1,
    fontSize: 16,
  },
  checkbox: {
    marginLeft: 16,
  },
});

export default CheckBoxGroup;
