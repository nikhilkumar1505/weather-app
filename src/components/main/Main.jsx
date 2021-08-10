import React, { useState, useContext, useEffect } from "react";
import logo from "../../assets/logo_web.png";
import { WeatherContext } from "../../services/ContextApi";
import { newData } from "../../services/Utilis";
import Tabs from "../navigationTab/Tabs";
import Route from "../../route/Route";
import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@material-ui/icons/Menu";
import "./main.css";
import axios from "axios";

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?";

const Main = () => {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);
  const {
    weatherData,
    setWeatherData,
    setFavIcon,
    storedData,
    setStoredData,
    favIcon,
  } = useContext(WeatherContext);

  useEffect(() => {
    if (weatherData) {
      storedData && storedData.some((x) => x.cityId === weatherData.id)
        ? updateWeatherData(weatherData)
        : insertWeatherData(weatherData);
    }
  }, [weatherData, favIcon]);

  const updateWeatherData = (data) => {
    const index = storedData.findIndex((x) => x.cityId === data.id);
    storedData[index] = newData(data, favIcon);
    setStoredData(storedData);
  };

  const insertWeatherData = (data) => {
    setStoredData([...storedData, newData(data, favIcon)]);
  };

  const handleSearch = () => {
    inputApiSearch();
    setInputValue("");
  };

  const inputApiSearch = async () => {
    const response = await axios
      .get(
        BASE_URL +
          `q=${inputValue}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
      )
      .catch((err) => console.log(err));
    if (response) {
      setWeatherData(response.data);
      setFavIcon(false);
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
            <MenuIcon />
          </div>
          <img src={logo} alt="title_logo" />
        </div>
        <div className="searchBar-container">
          <input
            type="text"
            className="searchBar"
            placeholder="Search City"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <div>
            <SearchIcon className="search" onClick={() => handleSearch()} />
          </div>
        </div>
      </div>
      <Tabs open={open} />
      <Route />
    </>
  );
};

export default Main;
