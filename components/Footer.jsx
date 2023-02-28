import React from "react";
import "./Footer.css";

import pokemonLogo from "../src/assets/pokemon.png";
import pokeball from "../src/assets/pokeball.png";

const Footer = () => {
  return (
    <footer className="footer">
      <img className="footer__pokemon" src={pokemonLogo} alt="pokemon logo" />
      <div className="footer__pokeballs">
        <img className="footer__pokeball" src={pokeball} alt="pokeball" />
        <img className="footer__pokeball" src={pokeball} alt="pokeball" />
        <img className="footer__pokeball" src={pokeball} alt="pokeball" />
      </div>
      <span>
        Developed By{" "}
        <a href="https://henriquefelix.netlify.app" target="_blank">
          Henrique Félix
        </a>{" "}
        | &copy; All Rights Reserved
      </span>
    </footer>
  );
};

export default Footer;
