import React, {useState, useContext} from 'react';
import {View, TextInput, Text, TouchableOpacity} from 'react-native';
import {AuthContext} from '../../context/AuthContext';

const Register = () => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const {signInWithGoogle, signIn} = useContext(AuthContext);

  const handleSignIn = () => {
    signIn(emailOrPhone, password);
  };

  return (
    <View className="flex justify-center items-center h-screen p-5">
      <Text className="text-2xl font-bold text-center mb-5">
        Create Account
      </Text>
      <Text className="text-sm font-normal text-center mb-5">
        Fill your information below or register with your social account.
      </Text>
      <TextInput
        className="h-10 border border-gray-300 rounded mb-3 px-3 w-full"
        placeholder="Email or Phone"
        value={emailOrPhone}
        onChangeText={setEmailOrPhone}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        className="h-10 border border-gray-300 rounded mb-3 px-3 w-full"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Text className="text-sm font-normal text-left my-2">
        Agree with Terms & Conditions
      </Text>
      <TouchableOpacity
        onPress={handleSignIn}
        className="bg-blue-500 rounded p-2 mb-3 w-full">
        <Text className="text-white text-center">Login</Text>
      </TouchableOpacity>
      <Text className="text-sm font-normal text-right my-2">
        Or continue with
      </Text>
      <TouchableOpacity
        onPress={signInWithGoogle}
        className="bg-red-500 rounded p-2 w-full">
        <Text className="text-white text-center">Sign In with Google</Text>
      </TouchableOpacity>
      <Text className="text-sm font-normal text-right my-2">
        Already have an Account? Sign In
      </Text>
    </View>
  );
};

export default Register;
