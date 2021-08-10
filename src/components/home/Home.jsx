import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import WeatherData from "./WeatherData";
import { newData, convertTempUnit, selectImage } from "../../services/Utilis";
import { WeatherContext } from "../../services/ContextApi";
import "./home.css";

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?";

const Home = () => {
  const [unit, setUnit] = useState("metric");
  const [location, setLocation] = useState({
    latitude: "",
    longitude: "",
  });
  const {
    weatherData,
    setWeatherData,
    favData,
    setFavData,
    setFavIcon,
    favIcon,
  } = useContext(WeatherContext);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) =>
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        getLocation: false,
      })
    );
  }, []);

  useEffect(() => {
    InitialApiCall(location);
  }, [location.getLocation]);

  useEffect(() => {
    if (weatherData && favIcon) {
      favData && favData.some((x) => x.cityId === weatherData.id)
        ? updateWeatherData(weatherData)
        : insertWeatherData(weatherData);
    }
  }, [favIcon]);

  const updateWeatherData = (data) => {
    const index = favData.findIndex((x) => x.cityId === data.id);
    favData[index] = newData(data, favIcon);
    setFavData(favData);
  };

  const insertWeatherData = (data) => {
    setFavData([...favData, newData(data, favIcon)]);
  };

  const InitialApiCall = async (location) => {
    const response = await axios
      .get(
        BASE_URL +
          `lat=${location.latitude}&lon=${location.longitude}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
      )
      .catch((err) => console.log(err));
    if (response) {
      setWeatherData(response.data);
    } else setLocation({ ...location, getLocation: true });
  };

  const buttonStyles = {
    backgroundColor: "#ffff",
    color: " #E32843",
  };

  return (
    <div className="main-div">
      {weatherData && (
        <>
          <div className="add-to-fav">
            <h1>{`${weatherData.name}, ${weatherData.sys.country}`}</h1>
            <label>
              <input
                type="checkbox"
                value={favIcon}
                onClick={(e) => setFavIcon(e.target.checked)}
              />
              <div className={!favIcon ? "not-a-fav" : "added-to-fav"}>
                <FaHeart fontSize="1.1rem" />
                <p>{favIcon ? "Added to favourite" : "Add to favourite"}</p>
              </div>
            </label>
          </div>
          <div className="display-info">
            <img
              src={`/assets/${selectImage(weatherData.weather[0].id)}.png`}
              alt="current-weather"
            />
            <div className="temperature">
              <p>{convertTempUnit(weatherData.main.temp, unit)}</p>
              <button
                style={unit === "metric" ? buttonStyles : null}
                onClick={() => setUnit("metric")}
              >
                °C
              </button>
              <button
                style={unit === "imperial" ? buttonStyles : null}
                onClick={() => setUnit("imperial")}
              >
                °F
              </button>
            </div>
            <p style={{ fontSize: "1.25rem" }}>
              {weatherData.weather[0].description}
            </p>
          </div>
          <WeatherData climateDetails={weatherData} unit={unit} />
        </>
      )}
    </div>
  );
};

export default Home;
