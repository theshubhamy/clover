// context/LocationContext.js
import React, {createContext, useContext, useMemo} from 'react';
import useLocation from '../hooks/useLocation';

const LocationContext = createContext(null);

export const LocationProvider = ({children}) => {
  const location = useLocation();
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
