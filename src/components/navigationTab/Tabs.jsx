import React from "react";
import { NavLink } from "react-router-dom";
import "./tab.css";

const NavigationTabs = ({ open, setOpen }) => {
  const date = new Date();
  const currentDate = date.toUTCString().slice(0, -12);
  const currentTime = date.toLocaleTimeString([], { timeStyle: "short" });
  return (
    <>
      <div className="navigation-tab-main">
        <div
          onClick={() => setOpen(false)}
          className={open ? "navigation-tab mobile-menu" : "navigation-tab"}
        >
          <NavLink
            exact
            className="navigation-item"
            activeClassName="active-page"
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            exact
            className="navigation-item"
            activeClassName="active-page"
            to="/favourite"
          >
            FAVOURITE
          </NavLink>
          <NavLink
            exact
            className="navigation-item"
            activeClassName="active-page"
            to="/recent-search"
          >
            RECENT SEARCH
          </NavLink>
        </div>

        <div className="current-date-time">
          <p>
            {currentDate}
            <span className="time">{currentTime}</span>
          </p>
        </div>
      </div>
     <div className="line"/>
    </>
  );
};

export default NavigationTabs;
