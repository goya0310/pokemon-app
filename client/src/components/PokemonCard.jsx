import React from "react";
import { useSelector } from "react-redux";
import { Pokemon } from "./Pokemon";
import styles from "../styles/PokemonCard.module.css"

const PokemonCard = ({ firstPokemon, lastPokemon }) => {
  const pokemons = useSelector((state) => state.pokemons);

  return (
    <div className={styles.pokemonCardGlobal}>
      {Array.isArray(pokemons) === false ? (
        <>
          <Pokemon key={pokemons.id} pokemons={pokemons} />
        </>
      ) : (
        // recorto el array de pokemons con el primero y el ultimo de paginado
        pokemons?.slice(firstPokemon, lastPokemon).map((pokemon) => {
          return (
            <>
              <Pokemon key={pokemon.id} pokemons={pokemon} />
            </>
          );
        })
      )}
    </div>
  );
};

export default PokemonCard;
