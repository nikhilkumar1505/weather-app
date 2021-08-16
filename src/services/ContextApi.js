import React, { useState, createContext, useEffect } from "react";

export const WeatherContext = createContext();

export const Weatherprovider = ({ children }) => {
  const [store, setStore] = useState({
    weatherData: null,
    storedData: [],
    unit: "metric",
    locationCall: true,
    favIcon: false,
    cityId:0
  });
  const [favData, setFavData] = useState([]);
  const [recentData, setRecentData] = useState([]);

  //add only favrouite element to different array
  useEffect(() => {
    if (store.storedData.lenght !== 0) {
      const value = store["storedData"].filter((item) => item.fav !== false);
      setFavData(value);
      setRecentData(store.storedData);
    }
  }, [store]);

 

  return (
    <WeatherContext.Provider
      value={{
        store,
        setStore,
        favData,
        setFavData,
        recentData,
        setRecentData,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
