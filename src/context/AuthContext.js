// context/AuthContext.js
import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useContext,
} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Toast from 'react-native-toast-message';

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

  const showToast = (type, text1, text2) => {
    Toast.show({
      type,
      text1,
      text2,
      position: 'top',
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 50,
    });
  };

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
        photoURL: currentUser?.photoURL,
        uid: currentUser.uid,
        lastSignIn: firestore.FieldValue.serverTimestamp(),
      });

      showToast(
        'success',
        'Registration Successful',
        'You have been registered successfully.',
      );
    } catch (error) {
      showToast('error', 'Registration Error', error.message);
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
          showToast(
            'error',
            'Login Error:',
            'No user found with this phone number.',
          );
        }
      }
      await auth().signInWithEmailAndPassword(email, password);
      showToast(
        'success',
        'Login Successful',
        'You have been logged in successfully.',
      );
    } catch (error) {
      showToast('error', 'Login Error', error.message);
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
      showToast(
        'success',
        'Password Reset',
        'Password reset email sent successfully.',
      );
    } catch (error) {
      showToast('error', 'Forgot Password Error', error.message);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userCredential = await auth().signInWithCredential(
        googleCredential,
      );
      const currentUser = userCredential.user;
      await firestore().collection('users').doc(currentUser.uid).set({
        displayName: currentUser.displayName,
        email: currentUser.email,
        phone: currentUser.phoneNumber,
        photoURL: currentUser.photoURL,
        uid: currentUser.uid,
        lastSignIn: firestore.FieldValue.serverTimestamp(),
      });

      showToast(
        'success',
        'Google Sign-In Successful',
        'You have been signed in with Google.',
      );
    } catch (error) {
      showToast('error', 'Google Sign-In Error', error.message);
    }
  };

  const signOut = async () => {
    try {
      await auth().signOut();
      await GoogleSignin.signOut();
      showToast(
        'success',
        'Sign Out Successful',
        'You have been signed out successfully.',
      );
    } catch (error) {
      showToast('error', 'Sign Out Error', error.message);
    }
  };

  const memoValue = useMemo(
    () => ({
      user,
      register,
      login,
      forgotPassword,
      signInWithGoogle,
      signOut,
      requestOtp,
      verifyOtpAndSetPassword,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user],
  );

  return (
    <AuthContext.Provider value={memoValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
