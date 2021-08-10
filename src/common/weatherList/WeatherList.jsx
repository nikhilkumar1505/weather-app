import React from "react";
import { FaHeart } from "react-icons/fa";
import { selectImage } from "../../services/Utilis";
import "./weatherList.css";

const WeatherList = ({ data }) => {
  return (
    <>
      {data &&
        data.map((item) => (
          <div className="weather-list-main" key={item.cityId}>
            <div className="weather-list-child">
              <div className='weather-list-child-col1'>
                <p className="city-name">{item.cityname}</p>
                <div className="weather-list-mobile-view">
                  <img
                    src={`/assets/${selectImage(item.iconId)}.png`}
                    alt="weather-icon"
                  />
                  <p >
                    <span className="weather-temp-value-mobile-view">{item.temp}</span> ⁰C
                  </p>
                  <p >{item.description}</p>
                </div>
              </div>
              <div className="weather-center-details">
                <img
                  src={`/assets/${selectImage(item.iconId)}.png`}
                  alt="weather-icon"
                />
                <p className="weather-temp">
                  <span className="weather-temp-value">{item.temp}</span> ⁰C
                </p>
                <p className="weather-type">{item.description}</p>
              </div>
              <div className="fav-icon">
                <FaHeart color={item.fav ? "#FAD05B" : "transaparent"} />
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default WeatherList;
