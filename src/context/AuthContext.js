// context/AuthContext.js
import React, {createContext, useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    GoogleSignin.configure({
      offlineAccess: true,
      webClientId:
        '540627303350-bj5aq4d4644h6bnr6kj6mjpp6p9bn338.apps.googleusercontent.com',
      iosClientId:
        '540627303350-c19ogrcbc0qc1smeijlo3bheug11q3eo.apps.googleusercontent.com',
    });

    const unsubscribe = auth().onAuthStateChanged(authUser => {
      setUser(authUser);
    });

    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    }
  };

  const signOut = async () => {
    try {
      await auth().signOut();
      await GoogleSignin.signOut();
    } catch (error) {
      console.error('Sign Out Error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{user, signInWithGoogle, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};
