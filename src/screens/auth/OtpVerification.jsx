import React, {useState} from 'react';
import {View, TextInput, Text, TouchableOpacity, Alert} from 'react-native';
import {useAuth} from '../../context/AuthContext';
import Icon from 'react-native-vector-icons/Ionicons';
const OtpVerification = ({route, navigation}) => {
  const {email} = route.params;
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const {verifyOtpAndSetPassword} = useAuth();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSetNewPassword = () => {
    verifyOtpAndSetPassword(email, otp, newPassword)
      .then(() => {
        Alert.alert('Success', 'Password reset successful');
        navigation.navigate('Login');
      })
      .catch(error => {
        Alert.alert('Error', error.message);
      });
  };

  return (
    <View className="flex-1 justify-center items-center p-5 bg-white">
      <Text className="text-3xl font-bold text-center mb-3 text-gray-800">
        Verify OTP
      </Text>
      <Text className="text-base text-center mb-6 text-gray-600">
        Please enter the OTP sent to your email and set a new password
      </Text>
      <TextInput
        className="h-12 border border-gray-300 rounded-full mb-4 px-3 w-full bg-white"
        placeholder="OTP"
        value={otp}
        onChangeText={setOtp}
        keyboardType="numeric"
        autoCapitalize="none"
      />
      <View className="h-12 border border-gray-300 rounded-full mb-4 px-3 w-full bg-white flex-row items-center">
        <TextInput
          className="flex-1"
          placeholder="New Password"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry={!isPasswordVisible}
        />
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Icon
            name={isPasswordVisible ? 'eye-off' : 'eye'}
            size={20}
            color="primary"
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={handleSetNewPassword}
        className="bg-primary py-3 mb-4 w-full rounded-full">
        <Text className="text-white text-center text-lg">Set New Password</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OtpVerification;
