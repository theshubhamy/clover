import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import RangeSlider from '../../components/RangeSlider';
import CheckBoxGroup from '../../components/CheckBoxGroup';
const Preference = () => {
  const [range, setRange] = useState([0, 100]);
  // const items = [{label: 'Men'}, {label: 'Women'}];
  const handleValueChange = newValue => {
    setRange(newValue);
    // Handle additional logic if needed
  };
  const [selectedItems, setSelectedItems] = useState([
    {label: 'Men', isChecked: false},
    {label: 'Women', isChecked: false},
  ]);

  const handleCheckboxChange = updatedItems => {
    setSelectedItems(updatedItems);
    console.log(updatedItems);
  };

  return (
    <View className="flex-1 bg-white p-8 gap-4 ">
      <View className="py-4">
        <Text className="text-4xl font-bold ">Preferences</Text>
      </View>
      <View className="mb-4">
        <Text className="text-2xl font-bold mb-2">I'd like to meet</Text>
        <CheckBoxGroup
          items={selectedItems}
          selectedItems={selectedItems}
          onChange={handleCheckboxChange}
          multiple={true}
        />
      </View>
      <View className="mb-4">
        <Text className="text-2xl font-bold mb-2">Age Range</Text>
        <RangeSlider
          min={18}
          max={60}
          step={1}
          label={'years old'}
          onValueChange={handleValueChange}
        />
      </View>
      <View className="mb-4">
        <Text className="text-2xl font-bold mb-2">Height Range</Text>
        <RangeSlider
          min={100}
          max={250}
          step={1}
          label={'cm'}
          onValueChange={handleValueChange}
        />
      </View>
    </View>
  );
};

export default Preference;
