import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import RootNavigator from './src/navigations';
const App = () => {
  return (
    <SafeAreaView className="flex-1">
      <RootNavigator />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default App;
