import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { BsHeartFill } from "react-icons/bs";
import { BsHeart } from "react-icons/bs";
import WeatherData from "./WeatherData";
import {  convertTempUnit, selectImage } from "../../services/Utilis";
import { WeatherContext } from "../../services/ContextApi";
import "./home.css";

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?";

const Home = () => {
  const date = new Date();
  const currentDate = date.toUTCString().slice(0, -12);
  const currentTime = date.toLocaleTimeString([], { timeStyle: "short" });
  const [location, setLocation] = useState({
    latitude: "",
    longitude: "",
  });
  const { store, setStore } = useContext(WeatherContext);
  const { weatherData, favIcon, unit, locationCall, storedData,cityId } = store;

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
    locationCall && InitialApiCall(location);
  }, [location.getLocation]);

  const InitialApiCall = async (location) => {
    const response = await axios
      .get(
        BASE_URL +
          `lat=${location.latitude}&lon=${location.longitude}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
      )
      .catch((err) => console.log(err));
    if (response) {
      setStore({ ...store, ["weatherData"]: response.data });
    } else setLocation({ ...location, getLocation: true });
  };

  const buttonStyles = {
    backgroundColor: "#ffff",
    color: " #E32843",
  };


  return (
    <div className="main-div">
      <div className="mobile-time-display">
        <p>
          {currentDate}
          <span className="time">{currentTime}</span>
        </p>
      </div>
      {weatherData && (
        <>
          <div className="add-to-fav">
            <h1>{`${weatherData.name}, ${weatherData.sys.country}`}</h1>
            <label>
              <input
                type="checkbox"
                value={favIcon}
                onClick={(e) =>
                  setStore({ ...store, ["favIcon"]: e.target.checked })
                }
              />
              {favIcon ? (
                <div className="added-to-fav">
                  <BsHeartFill className='like-icon' />
                  <p>Added to favourite</p>
                </div>
              ) : (
                <div className="not-a-fav">
                  <BsHeart className='like-icon' />
                  <p>Add to favourite</p>
                </div>
              )}
            </label>
          </div>
          <div className="display-info">
            <img
              src={`/assets/${selectImage(weatherData.weather[0].id)}.png`}
              alt="current-weather"
            />
            <div className="temperature">
              <p>{convertTempUnit(weatherData.main.temp, unit)}</p>
              <div className="temp-button">
                <button
                  style={unit === "metric" ? buttonStyles : null}
                  onClick={() => setStore({ ...store, ["unit"]: "metric" })}
                >
                  °C
                </button>
                <button
                  style={unit === "imperial" ? buttonStyles : null}
                  onClick={() => setStore({ ...store, ["unit"]: "imperial" })}
                >
                  °F
                </button>
              </div>
            </div>
            <p style={{ fontSize: "2rem" }}>
              {weatherData.weather[0].description}
            </p>
          </div>
          <WeatherData climateDetails={weatherData} />
        </>
      )}
    </div>
  );
};

export default Home;
