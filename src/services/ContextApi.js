import React,{useState,createContext} from 'react'

export const WeatherContext=createContext();

export const Weatherprovider = ({ children }) => {
  const [weatherData, setWeatherData] = useState();
  const [storedData, setStoredData] = useState([]);
  const [favData,setFavData]=useState([])
  const [favIcon,setFavIcon]=useState(false)



  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        setWeatherData,
        storedData,
        setStoredData,
        favData,
        setFavData,
        favIcon,
        setFavIcon,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};