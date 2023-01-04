import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getPokemons,
  getTypes,
  orderPokemonsByName,
  getPokemonByType,
  getPokemonsCreated,
  orderPokemonByAttack,
} from "../actions";
import NavHome from "./NavHome";
import PokemonCard from "./PokemonCard";

const Home = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTypes());
    dispatch(getPokemons());
  }, [dispatch]);

  const handleOrderByName = (sortType) => {
    dispatch(orderPokemonsByName(sortType));
    setInput(sortType);
  };

  const handleGetByType = (type) => {
    dispatch(getPokemonByType(type));
    setInput(type);
  };

  const handleGetPokemonsCreated = (pokemon) => {
    dispatch(getPokemonsCreated(pokemon));
    setInput(pokemon);
  };

  const handlePokemonByAttack = (sortType) => {
    dispatch(orderPokemonByAttack(sortType));
    setInput(sortType);
  };

  return (
    <div>
      <div>
        <NavHome
          handleOrderByName={handleOrderByName}
          handlePokemonByAttack={handlePokemonByAttack}
          handleGetByType={handleGetByType}
          handleGetPokemonsCreated={handleGetPokemonsCreated}
        />
      </div>
      <div>
        <PokemonCard />
      </div>
    </div>
  );
};

export default Home;
