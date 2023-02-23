import "./App.css";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import Card from "../components/Card";
import Header from "../components/Header";
// import { CgSearch } from 'react-icons/cg';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);

  const { data, isFetching, isError } = useQuery(
    "pokemons",
    async () => {
      let pokemonsDetails = [];

      for (let i = 1; i <= 1008; i++) {
        pokemonsDetails.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
      }

      const response = await axios.all(
        pokemonsDetails.map((pokemonDetails) => axios.get(pokemonDetails))
      );
      setPokemons(response);
      setFilteredPokemons(response);
    },
    {
      staleTime: 60000 * 60,
    }
  );

  const filterPokemon = (key) => {
    let filter = [];

    for (let i in pokemons) {
      if (pokemons[i].data.name.includes(key)) {
        filter.push(pokemons[i]);
      } else if (pokemons[i].data.id.toString().includes(key)) {
        filter.push(pokemons[i]);
      }
    }
    setFilteredPokemons(filter);
  };

  return (
    <div className="app">
      <Header />
      <div className="app_search-container"></div>
      {isFetching && <p>Loading...</p>}
      {isError && <p>Algo deu errado...</p>}

      {!isFetching && (
        <div>
          <h1 className="app__title">Search Pokémon</h1>
          <input
            className="app__search"
            type="text"
            onChange={(e) => filterPokemon(e.target.value)}
          />
        </div>
      )}
      <div className="app__card-container">
        {filteredPokemons.map((pokemon, index) => (
          <Card pokemon={pokemon} key={index} />
        ))}
      </div>
      {filteredPokemons.length < 1008 && (
        <button className="app__button">Load more</button>
      )}
    </div>
  );
}

export default App;
