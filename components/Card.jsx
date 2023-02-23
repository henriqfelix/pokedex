import React from "react";

import "./Card.css";

import pokeball from "../src/assets/pokeball.png";
import logo from "../src/assets/logo.png";

const Card = ({ pokemon }) => {
  const name = pokemon.data.name;
  // const image = pokemon.data.sprites.front_default;
  const image = pokemon.data.sprites.other["official-artwork"].front_default;
  // const image = pokemon.data.sprites.other.home.front_default;
  const types = pokemon.data.types;
  let id = pokemon.data.id.toString();
  let type1 = types[0].type.name;
  let type2 = "";
  if (types[1]) {
    type2 = types[1].type.name;
  }

  if (id.length === 1) {
    id = `Nº000${id}`;
  } else if (id.length === 2) {
    id = `Nº00${id}`;
  } else if (id.length === 3) {
    id = `Nº0${id}`;
  } else {
    id = `Nº${id}`;
  }

  return (
    <div className="card">
      <div
        style={{
          background: `linear-gradient(to bottom, var(--${type1}-background), var(--container))`,
        }}
        className="card__background"
      >
        <img className="card__pokeball" src={pokeball} alt="pokeball" />
        <img className="card__logo" src={logo} alt="logo" />
        <img className="card__image" src={image} alt="pokemon image" />
        <h1 className="card__title">{name}</h1>
        <div className="card__types">
          <span
            style={{ background: `var(--${type1})` }}
            className="card__type card__type-1"
          >
            {type1}
          </span>
          {type2 !== "" && (
            <span
              style={{ background: `var(--${type2})` }}
              className="card__type card__type-2"
            >
              {type2}
            </span>
          )}
        </div>
        <span className="card__id">{id}</span>
      </div>
    </div>
  );
};

export default Card;
