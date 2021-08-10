import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../components/home/Home";
import Favourite from "../components/favourite/Favourite";
import RecentSearch from "../components/recentSearch/RecentSearch";

const Routing = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route  path="/favourite" component={Favourite} />
        <Route  path="/recent-search" component={RecentSearch} />
      </Switch>
    </>
  );
};

export default Routing;
