// App.js
import 'react-native-get-random-values';
import React, {useContext} from 'react';
import {SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import {LocationProvider} from './src/context/LocationContext';
import AppStack from './src/navigations/AppStack';
import AuthStack from './src/navigations/AuthStack';
import {AuthContext} from './src/context/AuthContext';
import useLocation from './src/hooks/useLocation';

const App = () => {
  const {user} = useContext(AuthContext);
  const queryClient = new QueryClient();

  // Use custom hook to manage location
  useLocation();

  return (
    <SafeAreaView className="flex-1">
      <LocationProvider>
        <NavigationContainer>
          <QueryClientProvider client={queryClient}>
            {user ? <AppStack /> : <AuthStack />}
          </QueryClientProvider>
        </NavigationContainer>
        <Toast />
      </LocationProvider>
    </SafeAreaView>
  );
};

export default App;
