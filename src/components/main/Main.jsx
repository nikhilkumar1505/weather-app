import React, { useState, useContext, useEffect } from "react";
import logo from "../../assets/logo_web.png";
import { WeatherContext } from "../../services/ContextApi";
import { newData } from "../../services/Utilis";
import Tabs from "../navigationTab/Tabs";
import Route from "../../route/Route";
import { AiOutlineSearch } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";

import "./main.css";
import ApiSearch from "../../services/ApiSearch";

const Main = () => {
  const [inputValue, setInputValue] = useState("");
  const [search, setSearch] = useState(false);
  const [open, setOpen] = useState(false);
  const { store, setStore } = useContext(WeatherContext);
  const { weatherData, unit, storedData, favIcon } = store;

  useEffect(() => {
    if (weatherData) {
      storedData && storedData.some((x) => x.cityId === weatherData.id)
        ? updateWeatherData(weatherData)
        : insertWeatherData(weatherData);
    }
  }, [weatherData, favIcon, unit]);

  const updateWeatherData = (data) => {
    const index = storedData.findIndex((x) => x.cityId === data.id);
    storedData[index] = newData(data, favIcon, unit);
    setStore({ ...store, ["storedData"]: storedData });
  };

  const insertWeatherData = (data) => {
    setStore({
      ...store,
      ["storedData"]: [...storedData, newData(data, favIcon, unit)],
    });
  };

  const handleSearch = () => {
    setSearch(true);
  };
  
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <div className="center-div">
        <div className="menu-img">
          <div
            className="menu-mobile-view"
            style={{ color: !open ? "white" : "black" }}
            onClick={() => setOpen(!open)}
          >
            <FiMenu fontSize='3rem' />
          </div>
          <img src={logo} alt="title_logo" />
        </div>
        <div className="searchBar-container">
          <input
            type="text"
            className="searchBar"
            placeholder="Search City"
            onKeyDown={handleEnter}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <div>
            <AiOutlineSearch
              className="search"
              onClick={() => handleSearch()}
            />
          </div>
        </div>
      </div>
      <Tabs open={open} setOpen={setOpen} />
      <Route />
      <ApiSearch
        input={inputValue}
        setInput={setInputValue}
        search={search}
        setSearch={setSearch}
      />
    </>
  );
};

export default Main;
