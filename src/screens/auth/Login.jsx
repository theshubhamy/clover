import React, {useState} from 'react';
import {View, TextInput, Text, TouchableOpacity, Image} from 'react-native';
import {useAuth} from '../../context/AuthContext';
import Icon from 'react-native-vector-icons/Ionicons';
const Login = ({navigation}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const {signInWithGoogle, login} = useAuth();
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const handleSignIn = () => {
    login(emailOrPhone, password);
  };

  return (
    <View className="flex-1 justify-center items-center p-5 bg-white">
      <Text className="text-3xl font-bold text-center mb-3 text-gray-800">
        Sign In
      </Text>
      <Text className="text-base text-center mb-6 text-gray-600">
        Hi! Welcome Back, You've been missed
      </Text>
      <TextInput
        className="h-12 border border-gray-300 rounded-full mb-4 px-3 w-full bg-white"
        placeholder="Email or Phone"
        value={emailOrPhone}
        onChangeText={setEmailOrPhone}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <View className="h-12 border border-gray-300 rounded-full mb-4 px-3 w-full bg-white flex-row items-center">
        <TextInput
          className="flex-1"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible}
        />
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Icon
            name={isPasswordVisible ? 'eye-off' : 'eye'}
            size={20}
            color={isPasswordVisible ? '#A1B0CC' : '#FF3A8E'}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        className="self-end mb-4"
        onPress={() => navigation.navigate('ForgotPassword')}>
        <Text className="text-sm text-primary">Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleSignIn}
        className="bg-primary  py-3 mb-4 w-full rounded-full">
        <Text className="text-white text-center text-lg">Login</Text>
      </TouchableOpacity>
      <View className="flex-row items-center p-8 w-full">
        <View className="flex-1 h-px bg-gray-300" />
        <Text className="text-sm text-center text-gray-600 mx-4">
          Or Sign in with
        </Text>
        <View className="flex-1 h-px bg-gray-300" />
      </View>
      <TouchableOpacity
        onPress={signInWithGoogle}
        className="bg-secondary rounded-full py-3 mb-6 w-full gap-2 flex flex-row justify-center items-center">
        <Image
          source={require('../../assets/logo_google.png')}
          className="w-10 h-10"
        />
        <Text className="text-primary text-center text-lg">
          Sign In with Google
        </Text>
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

export default Login;
