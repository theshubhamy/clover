// context/LocationContext.js
import React, {createContext, useContext, useMemo} from 'react';
import usePermissions from '../hooks/usePermissions';
import Geolocation from 'react-native-geolocation-service';
import {showToast} from '../utils/Toast';

const LocationContext = createContext(null);

export const LocationProvider = ({children}) => {
  const {location: locationPermission} = usePermissions(); // Extract location permission
  const [location, setLocation] = React.useState(null);

  React.useEffect(() => {
    if (locationPermission) {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          setLocation({latitude, longitude});
        },
        error => {
          showToast('error', 'Location Error', error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        },
      );
    }
  }, [locationPermission]);

  const memoValue = useMemo(
    () => ({
      location,
    }),
    [location],
  );

  return (
    <LocationContext.Provider value={memoValue}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationCtx = () => useContext(LocationContext);
