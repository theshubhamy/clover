import messaging from '@react-native-firebase/messaging';

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

export {sendPushNotification};
