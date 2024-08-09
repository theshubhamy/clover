import {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import {
  checkMultiple,
  requestMultiple,
  RESULTS,
  PERMISSIONS,
} from 'react-native-permissions';
import {showToast} from '../utils/Toast';

const usePermissions = () => {
  const [permissionsGranted, setPermissionsGranted] = useState({
    location: false,
    camera: false,
    storage: false,
    notifications: false,
  });

  useEffect(() => {
    const requestPermissions = async () => {
      try {
        if (Platform.OS === 'ios') {
          const statuses = await checkMultiple([
            PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
            PERMISSIONS.IOS.CAMERA,
            PERMISSIONS.IOS.PHOTO_LIBRARY,
            PERMISSIONS.IOS.NOTIFICATIONS,
          ]);

          const locationGranted =
            statuses[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] === RESULTS.GRANTED;
          const cameraGranted =
            statuses[PERMISSIONS.IOS.CAMERA] === RESULTS.GRANTED;
          const storageGranted =
            statuses[PERMISSIONS.IOS.PHOTO_LIBRARY] === RESULTS.GRANTED;
          const notificationsGranted =
            statuses[PERMISSIONS.IOS.NOTIFICATIONS] === RESULTS.GRANTED;

          if (
            !locationGranted ||
            !cameraGranted ||
            !storageGranted ||
            !notificationsGranted
          ) {
            const newStatuses = await requestMultiple([
              PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
              PERMISSIONS.IOS.CAMERA,
              PERMISSIONS.IOS.PHOTO_LIBRARY,
              PERMISSIONS.IOS.NOTIFICATIONS,
            ]);

            setPermissionsGranted({
              location:
                newStatuses[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] ===
                RESULTS.GRANTED,
              camera: newStatuses[PERMISSIONS.IOS.CAMERA] === RESULTS.GRANTED,
              storage:
                newStatuses[PERMISSIONS.IOS.PHOTO_LIBRARY] === RESULTS.GRANTED,
              notifications:
                newStatuses[PERMISSIONS.IOS.NOTIFICATIONS] === RESULTS.GRANTED,
            });
          } else {
            setPermissionsGranted({
              location: locationGranted,
              camera: cameraGranted,
              storage: storageGranted,
              notifications: notificationsGranted,
            });
          }
        } else {
          const statuses = await checkMultiple([
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
            PERMISSIONS.ANDROID.CAMERA,
            PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
            PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
            PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
          ]);

          const locationGranted =
            statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] ===
            RESULTS.GRANTED;
          const cameraGranted =
            statuses[PERMISSIONS.ANDROID.CAMERA] === RESULTS.GRANTED;
          const storageGranted =
            statuses[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] ===
              RESULTS.GRANTED &&
            statuses[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] ===
              RESULTS.GRANTED;
          const notificationsGranted =
            statuses[PERMISSIONS.ANDROID.POST_NOTIFICATIONS] ===
            RESULTS.GRANTED;

          if (
            !locationGranted ||
            !cameraGranted ||
            !storageGranted ||
            !notificationsGranted
          ) {
            const newStatuses = await requestMultiple([
              PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
              PERMISSIONS.ANDROID.CAMERA,
              PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
              PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
              PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
            ]);

            setPermissionsGranted({
              location:
                newStatuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] ===
                RESULTS.GRANTED,
              camera:
                newStatuses[PERMISSIONS.ANDROID.CAMERA] === RESULTS.GRANTED,
              storage:
                newStatuses[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] ===
                  RESULTS.GRANTED &&
                newStatuses[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] ===
                  RESULTS.GRANTED,
              notifications:
                newStatuses[PERMISSIONS.ANDROID.POST_NOTIFICATIONS] ===
                RESULTS.GRANTED,
            });
          } else {
            setPermissionsGranted({
              location: locationGranted,
              camera: cameraGranted,
              storage: storageGranted,
              notifications: notificationsGranted,
            });
          }
        }
      } catch (err) {
        console.warn(err);
        showToast(
          'error',
          'Permission Error',
          'Failed to check or request permissions.',
        );
      }
    };

    requestPermissions();
  }, []);

  return permissionsGranted;
};

export default usePermissions;
