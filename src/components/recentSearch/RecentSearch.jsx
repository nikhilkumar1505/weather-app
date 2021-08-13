import React, { useContext, useState } from "react";
import NotFound from "../../common/notFound/NotFound";
import DialogBox from "../../common/dialogBox/DialogBox";
import WeatherList from "../../common/weatherList/WeatherList";
import { WeatherContext } from "../../services/ContextApi";
import "../../common/fav_recent.css";

const RecentSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { recentData, setRecentData } = useContext(WeatherContext);

  const closeFunctional = () => {
    setRecentData( "" );
  };

  return (
    <div>
      {recentData.length === 0 ? (
        <NotFound Text={"No Recent Search"} />
      ) : (
        <>
          <div className="detail-header">
            <p>You recently searched for</p>
            <button onClick={() => setIsOpen(true)}>Clear All</button>
          </div>
          <WeatherList data={[...recentData]} />
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
