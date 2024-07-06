import React, {useState} from 'react';
import {View, TextInput, Text, TouchableOpacity, Alert} from 'react-native';
import {useAuth} from '../../context/AuthContext';

const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  const {forgotPassword} = useAuth();

  const handleRequestOtp = () => {
    forgotPassword(email)
      .then(() => {
        navigation.navigate('OtpVerification', {email});
      })
      .catch(error => {
        Alert.alert('Error', error.message);
      });
  };

  return (
    <View className="flex-1 justify-center items-center p-5 bg-white">
      <Text className="text-3xl font-bold text-center mb-3 text-gray-800">
        Forgot Password
      </Text>
      <Text className="text-base text-center mb-6 text-gray-600">
        Please enter your email to receive an OTP
      </Text>
      <TextInput
        className="h-12 border border-gray-300 rounded-full mb-4 px-3 w-full bg-white"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity
        onPress={handleRequestOtp}
        className="bg-primary py-3 mb-4 w-full rounded-full">
        <Text className="text-white text-center text-lg">Request OTP</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="flex justify-center items-center flex-row gap-1"
        onPress={() => navigation.navigate('Register')}>
        <Text className="text-lg text-black">Don't have an account?</Text>
        <Text className="text-lg font-semibold text-primary">Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPassword;
