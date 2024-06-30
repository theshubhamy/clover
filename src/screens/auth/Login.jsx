// screens/LoginScreen.js
import React, {useContext} from 'react';
import {View, Button} from 'react-native';
import {AuthContext} from '../../context/AuthContext';

const LoginScreen = () => {
  const {signInWithGoogle} = useContext(AuthContext);

  return (
    <View className="flex justify-center items-center h-screen">
      <Button title="Sign In with Google" onPress={signInWithGoogle} />
    </View>
  );
};

export default LoginScreen;
