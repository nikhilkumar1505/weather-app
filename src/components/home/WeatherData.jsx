import React from "react";

import temparature from "../../assets/temparature.png";
import preception from "../../assets/preception.png";
import humidity from "../../assets/humidity.png";
import wind from "../../assets/wind.png";
import visibility from "../../assets/visibility.png";
import { convertTempUnit } from "../../services/Utilis";
import "./weatherData.css";

const WeatherData = ({ climateDetails, unit }) => {
  const weatherData = [
    {
      name: "Min - Max",
      value: `${convertTempUnit(
        climateDetails.main.temp_min,
        unit
      )}°- ${convertTempUnit(climateDetails.main.temp_max, unit)}°`,
      image: temparature,
    },
    {
      name: "Preception",
      value: `${convertTempUnit(climateDetails.main.feels_like, unit)}°`,
      image: preception,
    },
    {
      name: "Humidity",
      value: `${parseInt(climateDetails.main.humidity)}%`,
      image: humidity,
    },
    {
      name: "Wind",
      value: `${parseInt(climateDetails.wind.speed * 2.237)}mph`,
      image: wind,
    },
    {
      name: "Visibility",
      value: `${climateDetails.visibility}`,
      image: visibility,
    },
  ];
  return (
    <div className="weather-data-main">
      {weatherData.map((item, index) => (
        <div className="weather-parent" key={index}>
          <img src={item.image} alt="weather-icon" />
          <div className="weather-child">
            <p className="weather-name">{item.name}</p>
            <p className="weather-value">{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeatherData;
