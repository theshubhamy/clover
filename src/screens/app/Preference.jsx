import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Switch, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import RangeSlider from '../../components/RangeSlider';
import CheckBoxGroup from '../../components/CheckBoxGroup';

const Preference = ({navigation}) => {
  const [isOnline, setIsOnline] = useState(false);
  const [ageRange, setAgeRange] = useState([18, 60]); // Default age range
  const [heightRange, setHeightRange] = useState([100, 250]); // Default height range

  const [selectedItems, setSelectedItems] = useState([
    {label: 'Men', isChecked: false},
    {label: 'Women', isChecked: false},
  ]);

  const toggleSwitch = () => setIsOnline(previousState => !previousState);

  const handleValueChange = (newValue, type) => {
    if (type === 'age') {
      setAgeRange(newValue);
    } else if (type === 'height') {
      setHeightRange(newValue);
    }
  };

  const handleCheckboxChange = updatedItems => {
    setSelectedItems(updatedItems);
  };

  const handleReset = () => {
    setIsOnline(false);
    setAgeRange([18, 60]);
    setHeightRange([100, 250]);

    setSelectedItems([
      {label: 'Men', isChecked: false},
      {label: 'Women', isChecked: false},
    ]);
  };

  const handleApply = async () => {
    try {
      console.log({
        isOnline,
        ageRange,
        heightRange,
        selectedItems,
      });
      // Handle success response
      Alert.alert('Success', 'Preferences saved successfully!');
    } catch (error) {
      // Handle error response
      Alert.alert('Error', 'Failed to save preferences.');
      console.error(error);
    }
  };

  return (
    <View className="flex-1 bg-white p-8 gap-8">
      <View className="flex-row justify-between items-center">
        <Text className="text-4xl font-semibold">Preferences</Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-2 bg-gray rounded-md">
          <Icon name="close" size={24} color={'#2C272C'} />
        </TouchableOpacity>
      </View>
      <View>
        <Text className="text-2xl font-bold mb-2">I'd like to meet</Text>
        <CheckBoxGroup
          items={selectedItems}
          selectedItems={selectedItems}
          onChange={handleCheckboxChange}
          multiple={true}
        />
      </View>
      <View>
        <Text className="text-2xl font-bold mb-2">Age Range</Text>
        <RangeSlider
          min={18}
          max={60}
          label={'years old'}
          minValue={ageRange[0]}
          maxValue={ageRange[1]}
          onValueChange={newValue => handleValueChange(newValue, 'age')}
        />
      </View>
      <View>
        <Text className="text-2xl font-bold mb-2">Height Range</Text>
        <RangeSlider
          min={100}
          max={250}
          minValue={heightRange[0]}
          maxValue={heightRange[1]}
          label={'cm'}
          onValueChange={newValue => handleValueChange(newValue, 'height')}
        />
      </View>
      <View className="flex-row justify-between items-center">
        <Text className="text-2xl font-semibold mb-2">Online Now</Text>
        <Switch
          trackColor={{false: '#2C272C', true: '#FF3A8E'}}
          thumbColor={isOnline ? '#ffffff' : '#f0f0f0'}
          ios_backgroundColor="#2C272C"
          onValueChange={toggleSwitch}
          value={isOnline}
        />
      </View>
      <View className="flex-1 justify-end">
        <View className="flex-row justify-between items-center">
          <TouchableOpacity
            onPress={handleReset}
            className="px-4 py-3 border border-primary rounded-full w-2/5">
            <Text className="text-primary text-center text-lg font-medium">
              Reset
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleApply}
            className="px-4 py-3 bg-primary rounded-full w-2/5">
            <Text className="text-white text-center text-lg font-medium">
              Apply
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Preference;
