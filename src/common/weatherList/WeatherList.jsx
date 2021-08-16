import React, { useContext, useState } from "react";
import { BsHeartFill } from "react-icons/bs";
import { BsHeart } from "react-icons/bs";
import {  selectImage } from "../../services/Utilis";
import { convertTempUnit } from "../../services/Utilis";
import { WeatherContext } from "../../services/ContextApi";
import "./weatherList.css";
import ApiSearch from "../../services/ApiSearch";

const WeatherList = ({ data }) => {
  const [input, setInput] = useState("");
  const [search, setSearch] = useState(false);
  const { store, setStore } = useContext(WeatherContext);
  const { storedData } = store;

  const removeFav = (cityId, favState) => {
    const value = storedData.filter((stored) => {
      if (stored.cityId === cityId) {
        stored["fav"] = !favState;
      }
      return stored;
    });
    setStore({ ...store, ["storedData"]: value });
  };

  const handelClick = (cityname,cityId) => {
    setInput(cityname);
    setSearch(true);
    setStore({ ...store, ["cityId"]: cityId });
  };
  return (
    <>
      {data &&
        data.map((item) => (
          <div className="weather-list-main" key={item.cityId}>
            <div className="weather-list-child">
              <div className="weather-list-child-col1">
                <p
                  className="city-name"
                  onClick={() => handelClick(item.cityname,item.cityId)}
                >
                  {item.cityname}
                </p>
                <div className="weather-list-mobile-view">
                  <img
                    src={`/assets/${selectImage(item.iconId)}.png`}
                    alt="weather-icon"
                  />
                  <p>
                    <span className="weather-temp-value-mobile-view">
                      {convertTempUnit(item.temp, item.tempUnit)}
                    </span>
                    {item.tempUnit !== "metric" ? " ⁰F" : " ⁰C"}
                  </p>
                  <p>{item.description}</p>
                </div>
              </div>
              <div className="weather-center-details">
                <img
                  src={`/assets/${selectImage(item.iconId)}.png`}
                  alt="weather-icon"
                />
                <p className="weather-temp">
                  <span className="weather-temp-value">
                    {convertTempUnit(item.temp, item.tempUnit)}
                  </span>
                  {item.tempUnit !== "metric" ? " ⁰F" : " ⁰C"}
                </p>
                <p className="weather-type">{item.description}</p>
              </div>
              <div
                className="fav-icon"
                onClick={() => removeFav(item.cityId, item.fav)}
              >
                {item.fav ? <BsHeartFill color="#FAD05B" /> : <BsHeart />}
              </div>
            </div>
          </div>
        ))}
      <ApiSearch
        input={input}
        setInput={setInput}
        search={search}
        setSearch={setSearch}
      />
    </>
  );
};

export default WeatherList;
