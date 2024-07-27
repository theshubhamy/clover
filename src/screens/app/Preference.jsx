import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Switch} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import RangeSlider from '../../components/RangeSlider';
import CheckBoxGroup from '../../components/CheckBoxGroup';
const Preference = ({navigation}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const [range, setRange] = useState([0, 100]);
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
    <View className="flex-1 bg-white p-8 gap-8 ">
      <View className="flex-row justify-between items-center ">
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
          step={1}
          label={'years old'}
          onValueChange={handleValueChange}
        />
      </View>
      <View>
        <Text className="text-2xl font-bold mb-2">Height Range</Text>
        <RangeSlider
          min={100}
          max={250}
          step={1}
          label={'cm'}
          onValueChange={handleValueChange}
        />
      </View>
      <View className=" flex-row justify-between items-center ">
        <Text className="text-2xl font-semibold mb-2">Online Now</Text>
        <Switch
          trackColor={{false: '#2C272C', true: '#FF3A8E'}}
          thumbColor={isEnabled ? '#ffffff' : '#f0f0f0'}
          ios_backgroundColor="#2C272C"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <View className="flex-row justify-between items-center ">
        <TouchableOpacity className="px-4 py-3 border border-primary rounded-full w-2/5">
          <Text className="text-primary text-center text-lg font-medium">
            Reset
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="px-4 py-3 bg-primary rounded-full w-2/5">
          <Text className="text-white text-center text-lg font-medium">
            Apply
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Preference;
