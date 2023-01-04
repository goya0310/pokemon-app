import React from "react";
import { useSelector } from "react-redux";
import { Pokemon } from "./Pokemon";

const PokemonCard = () => {
  const pokemons = useSelector((state) => state.pokemons);

  return (
    <div>
      {Array.isArray(pokemons) === false ? (
        <div>
          <Pokemon key={pokemons.id} pokemons={pokemons} />
        </div>
      ) : (
        pokemons?.map((pokemon) => {
          return (
            <div>
              <Pokemon key={pokemon.id} pokemons={pokemon} />
            </div>
          );
        })
      )}
    </div>
  );
};

export default PokemonCard;
