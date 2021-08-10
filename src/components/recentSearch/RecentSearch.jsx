import React, { useContext, useState } from "react";
import NotFound from "../../common/notFound/NotFound";
import DialogBox from "../../common/dialogBox/DialogBox";
import WeatherList from "../../common/weatherList/WeatherList";
import { WeatherContext } from "../../services/ContextApi";
import "../../common/fav_recent.css";

const RecentSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { storedData, setStoredData } = useContext(WeatherContext);

  const closeFunctional = () => {
    setStoredData("");
  };

  return (
    <div>
      {storedData.length === 0 ? (
        <NotFound Text={"No Recent Search"} />
      ) : (
        <>
          <div className="detail-header">
            <p>You recently searched for</p>
            <button onClick={() => setIsOpen(true)}>Clear All</button>
          </div>
          <WeatherList data={[...storedData]} />
          <DialogBox
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            text="Are you sure want to clear recent Search?"
            clearFunction={closeFunctional}
          />
        </>
      )}
    </div>
  );
};

export default RecentSearch;
