// context/AuthContext.js
import React, {createContext, useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
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

  const register = async (name, email, phone, password) => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      const currentUser = userCredential.user;
      await currentUser.updateProfile({displayName: name});
      await firestore().collection('users').doc(currentUser.uid).set({
        name,
        email,
        phone,
        uid: currentUser.uid,
      });
      setUser(currentUser);
    } catch (error) {
      console.error('Registration Error:', error);
    }
  };

  const login = async (emailOrPhone, password) => {
    try {
      // Assuming users can login with either email or phone
      const isEmail = emailOrPhone.includes('@');
      let email = emailOrPhone;
      if (!isEmail) {
        // Lookup email by phone number
        const userSnapshot = await firestore()
          .collection('users')
          .where('phone', '==', emailOrPhone)
          .get();
        if (!userSnapshot.empty) {
          email = userSnapshot.docs[0].data().email;
        } else {
          throw new Error('No user found with this phone number.');
        }
      }
      await auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error('Login Error:', error);
    }
  };

  const requestOtp = async email => {
    // Logic to send OTP to the email (you can use a third-party service like SendGrid, Twilio, etc.)
  };

  const verifyOtpAndSetPassword = async (email, otp, newPassword) => {
    // Logic to verify OTP and set the new password
  };

  const forgotPassword = async email => {
    try {
      await auth().sendPasswordResetEmail(email);
    } catch (error) {
      console.error('Forgot Password Error:', error);
    }
  };

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
    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        forgotPassword,
        signInWithGoogle,
        signOut,
        requestOtp,
        verifyOtpAndSetPassword,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
