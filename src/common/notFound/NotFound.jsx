import React from "react";
import Nothing from "../../assets/nothing.png";
import './notFound.css'

const NotFound = ({Text}) => {
  return (
    <div className="parent-div">
      <div className='child-div'>
        <img src={Nothing} alt="Not-found" />
        <p style={{fontWeight:550}}>{Text}</p>
      </div>
    </div>
  );
};

export default NotFound;
