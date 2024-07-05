import {SafeAreaView, StatusBar} from 'react-native';
import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppStack from './src/navigations/AppStack';
import AuthStack from './src/navigations/AuthStack';
import {AuthContext} from './src/context/AuthContext';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
const App = () => {
  const {user} = useContext(AuthContext);
  const queryClient = new QueryClient();

  return (
    <SafeAreaView className="flex-1">
      <NavigationContainer>
        <QueryClientProvider client={queryClient}>
          {user ? <AppStack /> : <AuthStack />}
        </QueryClientProvider>
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default App;
