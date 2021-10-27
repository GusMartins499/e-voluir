import { createContext, useState, useEffect, useContext } from "react";

type LocationContextData = {
  latitude: number;
  longitude: number;
};

type LocationProviderProps = {
  children: React.ReactNode;
};

export const LocationUserContext = createContext({} as LocationContextData);

function LocationUserProvider({ children }: LocationProviderProps) {
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0, 0,
  ]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setInitialPosition([latitude, longitude]);
    });
  }, []);

  return (
    <LocationUserContext.Provider
      value={{
        latitude: initialPosition[0],
        longitude: initialPosition[1],
      }}
    >
      {children}
    </LocationUserContext.Provider>
  );
}

function useLocationUser() {
  const context = useContext(LocationUserContext);

  return context;
}

export { LocationUserProvider, useLocationUser };
