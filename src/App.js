import React from "react";
import "./App.css";
import Main from "./components/main/Main";
import { Weatherprovider } from "./services/ContextApi";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="main">
      <BrowserRouter>
        <Weatherprovider>
          <Main />
        </Weatherprovider>
      </BrowserRouter>
    </div>
  );
}

export default App;
