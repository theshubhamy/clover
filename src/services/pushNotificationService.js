import messaging from '@react-native-firebase/messaging';
import {Linking} from 'react-native';
import {firestore} from './firebase';
import auth from '@react-native-firebase/auth';

const NAVIGATION_IDS = [
  'Home',
  'Feed',
  'Likes',
  'Chat',
  'Preference',
  'Profile',
  'AddStory',
];

function buildDeepLinkFromNotificationData(data) {
  const navigationId = data?.navigationId;
  if (!NAVIGATION_IDS.includes(navigationId)) {
    console.log('Unverified navigationId', navigationId);
    return null;
  }
  switch (navigationId) {
    case 'Home':
      return 'clover://Home';
    case 'Feed':
      return 'clover://Feed';
    case 'Likes':
      return 'clover://Likes';
    case 'Profile':
      return 'clover://Profile';
    case 'Match':
      return 'clover://Match';
    case 'Preference':
      return 'clover://Preference';
    case 'AddStory':
      return 'clover://AddStory';
    default:
      return 'clover://'; // or provide a default deep link here
  }
}
const linking = {
  prefixes: ['clover://'],
  config: {
    initialRouteName: 'MyTabs',
    screens: {
      Home: 'Home',
      Feed: 'Feed',
      Likes: 'Likes',
      Chat: 'Chat',
      Preference: 'Preference',
      Profile: 'Profile',
      AddStory: 'AddStory',
    },
  },
  async getInitialURL() {
    // Check if the app was opened via a deep link
    const url = await Linking.getInitialURL();
    if (typeof url === 'string') {
      return url;
    }

    // Handle notification that opened the app from a quit state
    const message = await messaging().getInitialNotification();
    if (message?.data) {
      const deeplinkURL = buildDeepLinkFromNotificationData(message.data);
      if (typeof deeplinkURL === 'string') {
        return deeplinkURL;
      }
    }

    return null; // No deep link or notification data
  },
  subscribe(listener) {
    const onReceiveURL = ({url}) => listener(url);

    // Listen to incoming deep links
    const linkingSubscription = Linking.addEventListener('url', onReceiveURL);

    // Handle notification when the app is in the background
    const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
      if (remoteMessage?.data) {
        const url = buildDeepLinkFromNotificationData(remoteMessage.data);
        if (typeof url === 'string') {
          listener(url);
        }
      }
    });

    return () => {
      linkingSubscription.remove();
      unsubscribe();
    };
  },
};
async function saveTokenToDatabase(token) {
  const userId = auth().currentUser?.uid;

  if (userId) {
    await firestore()
      .collection('users')
      .doc(userId)
      .update({
        tokens: firestore.FieldValue.arrayUnion(token),
      });
  }
}
const getFCMToken = async () => {
  try {
    // Request permission to send notifications
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);

      const token = await messaging().getToken();
      console.log('FCM Token:', token);

      await saveTokenToDatabase(token);

      messaging().onTokenRefresh(newToken => {
        saveTokenToDatabase(newToken);
      });
    }
  } catch (error) {
    console.error('Error getting FCM token:', error);
  }
};

const sendPushNotification = async (recipientToken, title, body) => {
  try {
    await messaging().send({
      to: recipientToken,
      notification: {
        title,
        body,
      },
    });
    console.log('Push notification sent successfully');
  } catch (error) {
    console.error('Error sending push notification:', error);
    throw error;
  }
};

export {sendPushNotification, linking, saveTokenToDatabase, getFCMToken};
