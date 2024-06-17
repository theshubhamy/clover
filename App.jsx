import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, View, ActivityIndicator} from 'react-native';
import {useDispatch} from 'react-redux';
import {loadAuthState} from './src/store/authSlice';
import RootNavigator from './src/navigations';

const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAuthenticationState = async () => {
      try {
        await dispatch(loadAuthState());
      } finally {
        setLoading(false);
      }
    };
    loadAuthenticationState();
  }, [dispatch]);

  return (
    <SafeAreaView className="flex-1">
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <RootNavigator />
      )}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default App;
