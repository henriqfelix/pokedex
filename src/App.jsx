import "./App.css";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import Card from "../components/Card";
import Header from "../components/Header";
import Footer from "../components/Footer";
// import { CgSearch } from 'react-icons/cg';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [currentPokemons, setCurrentPokemons] = useState([]);

  const [page1, setPage1] = useState([]);
  const [page2, setPage2] = useState([]);
  const [page3, setPage3] = useState([]);
  const [page4, setPage4] = useState([]);

  const [isSearching, setIsSearching] = useState(false);

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

      let filterPage1 = [];
      let filterPage2 = [];
      let filterPage3 = [];
      let filterPage4 = [];
      response.map((pokemon) => {
        if (pokemon.data.id <= 252) {
          filterPage1.push(pokemon);
          setPage1(filterPage1);
          setCurrentPokemons(filterPage1);
        } else if (pokemon.data.id >= 253 && pokemon.data.id <= 504) {
          filterPage2.push(pokemon);
          setPage2(filterPage2);
        } else if (pokemon.data.id >= 505 && pokemon.data.id <= 756) {
          filterPage3.push(pokemon);
          setPage3(filterPage3);
        } else if (pokemon.data.id >= 757) {
          filterPage4.push(pokemon);
          setPage4(filterPage4);
        }
      });
    },
    {
      staleTime: 60000 * 60,
    }
  );

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      entries.map((entry) => {
        if (entry.target.id === "ward_top") {
          if (entry.isIntersecting) {
            setCurrentPokemons(page1);
          }
        }
        if (entry.target.id === "ward_bottom") {
          if (entry.isIntersecting) {
            if (currentPokemons.length === 252) {
              setCurrentPokemons((currentPokemonsInsideState) => [
                ...currentPokemonsInsideState.concat(page2),
              ]);
            }
            if (currentPokemons.length === 504) {
              setCurrentPokemons((currentPokemonsInsideState) => [
                ...currentPokemonsInsideState.concat(page3),
              ]);
            }
            if (currentPokemons.length === 756) {
              setCurrentPokemons((currentPokemonsInsideState) => [
                ...currentPokemonsInsideState.concat(page4),
              ]);
            }
          }
        }
      });
    });

    intersectionObserver.observe(document.querySelector("#ward_top"));
    intersectionObserver.observe(document.querySelector("#ward_bottom"));

    return () => intersectionObserver.disconnect();
  }, [currentPokemons]);

  const filterPokemon = (key) => {
    let filter = [];
    setIsSearching(true);

    for (let i in pokemons) {
      if (pokemons[i].data.name.includes(key)) {
        filter.push(pokemons[i]);
      } else if (pokemons[i].data.id.toString().includes(key)) {
        filter.push(pokemons[i]);
      }
    }
    setFilteredPokemons(filter);
    if (key === "") setIsSearching(false);
  };

  return (
    <div className="app">
      <Header />
      <li id="ward_top"></li>
      <div className="app_search-container">
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
      </div>
      <div className="app__card-container">
        {!isSearching
          ? currentPokemons.map((pokemon, index) => (
              <Card pokemon={pokemon} key={index} />
            ))
          : filteredPokemons.map((pokemon, index) => (
              <Card pokemon={pokemon} key={index} />
            ))}
      </div>

      <li id="ward_bottom"></li>
      <Footer />
    </div>
  );
}

export default App;
