import React from "react";
import "./Loader.css";
import pokeball from "../src/assets/pokeball.png";

const Loader = () => {
  return (
    <div className="loader__container">
      <img className="loader__pokeball" src={pokeball} alt="loader" />
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default Loader;
