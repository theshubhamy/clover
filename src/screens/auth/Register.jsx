import React, {useState, useContext} from 'react';
import {View, TextInput, Text, TouchableOpacity} from 'react-native';
import {AuthContext} from '../../context/AuthContext';
import Icon from 'react-native-vector-icons/Ionicons';
const Register = ({navigation}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const {signInWithGoogle, signIn} = useContext(AuthContext);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const handleSignIn = () => {
    signIn(email, phone, password);
  };

  return (
    <View className="flex-1 justify-center items-center p-5 bg-white">
      <Text className="text-3xl font-bold text-center mb-3 text-gray-800">
        Create Account
      </Text>
      <Text className="text-base text-center mb-6 text-gray-600">
        Fill your information below or register with your social account.
      </Text>
      <TextInput
        className="h-12 border border-gray-300 rounded-full mb-4 px-3 w-full bg-white"
        placeholder="Name "
        value={name}
        onChangeText={setName}
        keyboardType="default"
        autoCapitalize="none"
      />
      <TextInput
        className="h-12 border border-gray-300 rounded-full mb-4 px-3 w-full bg-white"
        placeholder="Email "
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        className="h-12 border border-gray-300 rounded-full mb-4 px-3 w-full bg-white"
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="number-pad"
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
            color="primary"
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity className="self-start mb-4">
        <Text className="text-xs text-primary">
          By signing up, you agree to the Terms & Conditions
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleSignIn}
        className="bg-primary  py-3 mb-4 w-full rounded-full">
        <Text className="text-white text-center text-lg">Login</Text>
      </TouchableOpacity>
      <View className="flex-row items-center p-8 w-full">
        <View className="flex-1 h-px bg-gray-300" />
        <Text className="text-sm text-center text-gray-600 mx-4">
          Or continue with
        </Text>
        <View className="flex-1 h-px bg-gray-300" />
      </View>
      <TouchableOpacity
        onPress={signInWithGoogle}
        className="bg-secondary rounded-full py-3 mb-6 w-full">
        <Text className="text-primary text-center text-lg">
          Sign In with Google
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="flex justify-center items-center flex-row gap-1"
        onPress={() => navigation.navigate('Login')}>
        <Text className="text-lg text-black">Already have an Account? </Text>
        <Text className="text-lg font-semibold text-primary">Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Register;
