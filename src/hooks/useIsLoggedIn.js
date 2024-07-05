import auth from '@react-native-firebase/auth';
import {useEffect, useState} from 'react';

const useIsLoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState();

  useEffect(() => {
    auth().onAuthStateChanged(auth, user => {
      setIsLoggedIn(!!user);
    });
  }, []);

  return {isLoggedIn};
};

export default useIsLoggedIn;
