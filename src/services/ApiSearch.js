import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { WeatherContext } from "./ContextApi";

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?";

const ApiSearch = ({ input, setInput, search, setSearch }) => {
  const { store, setStore } = useContext(WeatherContext);
  const { storedData, cityId, weatherData } = store;
  const history = useHistory();

  const getFavStatus = () => {
    if (storedData && cityId !== 0) {
      const status = storedData.filter((item) => {
        if (item.cityId === cityId || item.cityId === weatherData.id) {
          return item;
        }
      });
      return status[0].fav;
    } 
     
    else return false;
  };

  const inputApiSearch = async () => {
    const response = await axios
      .get(
        BASE_URL +
          `q=${input}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
      )
      .catch((err) => console.log(err));
    if (response) {
      setInput("");
      setSearch(false);
      setStore({
        ...store,
        ["cityId"]: 0,
        ["favIcon"]: getFavStatus(),
        ["weatherData"]: response.data,
        ["locationCall"]: false,
      });
      history.push("/");
    }
  };
  search && inputApiSearch();
  return <></>;
};

export default ApiSearch;
