import React, { useContext, useState } from "react";
import DialogBox from "../../common/dialogBox/DialogBox";
import NotFound from "../../common/notFound/NotFound";
import WeatherList from "../../common/weatherList/WeatherList";
import { WeatherContext } from "../../services/ContextApi";
import "../../common/fav_recent.css";

const Favourite = () => {
  const { favData, setFavData } = useContext(WeatherContext);
  const [isOpen, setIsOpen] = useState(false);
  const favourites = favData && favData.filter((data) => data.fav === true);

  const closeFunctional = () => {
    setFavData("");
  };

  return (
    <>
      {favourites.length === 0 ? (
        <NotFound Text={"No Favourites added"} />
      ) : (
        <>
          <div className="detail-header">
            <p>{favourites.length} City added as favourite</p>
            <button onClick={() => setIsOpen(true)}>Remove All</button>
          </div>
          <WeatherList data={[...favourites]} />
          <DialogBox
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            text="Are you sure want to remove all the favourites?"
            clearFunction={closeFunctional}
          />
        </>
      )}
    </>
  );
};

export default Favourite;
