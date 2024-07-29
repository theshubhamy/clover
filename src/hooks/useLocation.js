// hooks/useLocation.js
import {useEffect, useState} from 'react';
import {Platform, PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {showToast} from '../utils/Toast';
const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        Geolocation.requestAuthorization('whenInUse'); // or 'always'
        setHasPermission(true); // iOS automatically grants permission
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Permission',
              message: 'This app needs access to your location.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            setHasPermission(true);
          } else {
            showToast(
              'error',
              'Permission Denied',
              'Location permission is required to use this app.',
            );
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };

    const getUserLocation = () => {
      if (!hasPermission) {
        return;
      }

      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          setLocation({latitude, longitude});
        },
        error => {
          showToast('error', 'Permission Denied', error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        },
      );
    };

    requestLocationPermission().then(() => {
      getUserLocation();
    });
  }, [hasPermission]);

  return location;
};

export default useLocation;
