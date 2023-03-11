import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPokemons,
  getTypes,
  orderPokemonsByName,
  getPokemonByType,
  getPokemonsCreated,
  orderPokemonByAttack,
  setLoadingTrue,
} from "../actions";
import NavHome from "./NavHome";
import Pagination, { pokemonIndex } from "./Pagination";
import PokemonCard from "./PokemonCard";
import styles from "../styles/Home.module.css";
import spinner from "../images/spinner.gif";
import loading from "../images/loading.gif";

const Home = () => {
  const [input, setInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const spinnerLoader = useSelector((state) => state.loadingSpinner);

  const pokemons = useSelector((state) => state.pokemons);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTypes());
    dispatch(getPokemons());
    dispatch(setLoadingTrue());
  }, [dispatch]);

  const handleOrderByName = (sortType) => {
    dispatch(orderPokemonsByName(sortType));
    setInput(sortType);
    setCurrentPage(1);
  };

  const handleGetByType = (type) => {
    dispatch(getPokemonByType(type));
    setInput(type);
    setCurrentPage(1);
  };

  const handleGetPokemonsCreated = (pokemon) => {
    dispatch(getPokemonsCreated(pokemon));
    setInput(pokemon);
    setCurrentPage(1);
  };

  const handlePokemonByAttack = (sortType) => {
    dispatch(orderPokemonByAttack(sortType));
    setInput(sortType);
    setCurrentPage(1);
  };

  const handlePages = (page) => {
    setCurrentPage(page);
  };

  const { lastPokemon, firstPokemon } = pokemonIndex(currentPage, 8);

  return (
    <div className={styles.background}>
      <div>
        <NavHome
          handleOrderByName={handleOrderByName}
          handlePokemonByAttack={handlePokemonByAttack}
          handleGetByType={handleGetByType}
          handleGetPokemonsCreated={handleGetPokemonsCreated}
        />
      </div>
      <div>
        {!spinnerLoader ? (
          <Pagination
            pokemons={pokemons}
            handlePages={handlePages}
            currentPage={currentPage}
          />
        ) : null}
      </div>
      {spinnerLoader ? (
        <div className={styles.spinnerloader}>
          <img src={spinner} alt="...spinner" />
          <img src={loading} alt="...loading" className={styles.loading} />
        </div>
      ) : (
        <div className={styles.pokemonCards}>
          <PokemonCard firstPokemon={firstPokemon} lastPokemon={lastPokemon} />
        </div>
      )}
    </div>
  );
};

export default Home;
