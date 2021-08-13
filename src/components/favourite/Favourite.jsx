import React, { useContext, useState, useEffect } from "react";
import DialogBox from "../../common/dialogBox/DialogBox";
import NotFound from "../../common/notFound/NotFound";
import WeatherList from "../../common/weatherList/WeatherList";
import { WeatherContext } from "../../services/ContextApi";
import "../../common/fav_recent.css";

const Favourite = () => {
  const { favData, setFavData } = useContext(WeatherContext);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setFavData((previousFavData) =>
      previousFavData && previousFavData.filter(
        (fav) => fav.fav !== (false || undefined)
      )
    );
  }, []);


  return (
    <>
      {favData.length === 0 ? (
        <NotFound Text={"No Favourites added"} />
      ) : (
        <>
          <div className="detail-header">
            <p>{favData.length} Cities added as favourite</p>
            <button onClick={() => setIsOpen(true)}>Remove All</button>
          </div>
          <WeatherList data={[...favData]}  />
          <DialogBox
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            text="Are you sure want to remove all the favourites?"
            clearFunction={() => setFavData("")}
          />
        </>
      )}
    </>
  );
};

export default Favourite;
