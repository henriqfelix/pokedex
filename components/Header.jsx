import React from "react";
import "./Header.css";
import pokemonLogo from "../src/assets/pokemon.png";

const Header = () => {
  return (
    <header className="header">
      <img src={pokemonLogo} alt="pokemon logo" className="header__pokemon" />
    </header>
  );
};

export default Header;
