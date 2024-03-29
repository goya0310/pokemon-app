import axios from "axios";
import Swal from "sweetalert2";
import pikachuError from "../images/pikachuError.jpg";


export const CREATE_POKEMON = "CREATE_POKEMON";
export const GET_TYPES = "GET_TYPES";
export const GET_POKEMONS = "GET_POKEMONS";
export const GET_POKEMON_BY_ID = "GET_POKEMON_BY_ID";
export const GET_POKEMONS_BY_TYPE = "GET_POKEMONS_BY_TYPE";
export const GET_POKEMONS_CREATED = "GET_POKEMONS_CREATED";
export const SEARCH_POKEMON = "SEARCH_POKEMON";
export const ORDER_POKEMONS_BY_ATTACK = "ORDER_POKEMONS_BY_ATTACK";
export const ORDER_POKEMONS_BY_NAME = "ORDER_POKEMONS_BY_NAME";
export const LOADING_TRUE = "LOADING_TRUE";
export const LOADING_FALSE = "LOADING_FALSE"

let errorAlert = (message) => {
  Swal.fire({
    imageUrl: pikachuError,
    imageHeight: 200,
    title: "¡Error!",
    text: message,
    confirmButtonText: "OK",
  })
}


export function createPokemon(pokemon) {
  return async (dispatch) => {
    try {
      await axios.post("/pokemons/", pokemon);
      dispatch({ type: CREATE_POKEMON, payload: pokemon });
    } catch (error) {
      errorAlert("Pokemon no creado, intenta con otro nombre");
    }
  };
}

export function getTypes() {
  return async (dispatch) => {
    try {
      const allTypes = await axios.get("/types");
      dispatch({ type: GET_TYPES, payload: allTypes.data });
    } catch (error) {
      errorAlert("Algo salió mal");
    }
  };
}

export function getPokemons() {
  return async (dispatch) => {
    try {
      const allPokemons = await axios.get("/pokemons");
      dispatch({ type: GET_POKEMONS, payload: allPokemons.data });
    } catch (error) {
      errorAlert("Algo salió mal");
      console.log(error);
    }
  };
}

export function getPokemonById(id) {
  return async (dispatch) => {
    try {
      const pokemonById = await axios.get(
        `/pokemons/${id}`
      );
      dispatch({ type: GET_POKEMON_BY_ID, payload: pokemonById.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function searchPokemon(name) {
  return async (dispatch) => {
    try {
      const findPokemon = await axios.get(
        `/pokemons?name=${name}`
      );
      dispatch({ type: SEARCH_POKEMON, payload: findPokemon.data });
    } catch (error) {
      console.log(error);
      errorAlert("No se encontraron resultados para tu búsqueda");
      return;
    }
  };
}

export function getPokemonByType(type) {
  return {
    type: GET_POKEMONS_BY_TYPE,
    payload: type,
  };
}

export function orderPokemonByAttack(sortType) {
  return {
    type: ORDER_POKEMONS_BY_ATTACK,
    payload: sortType,
  };
}

export function orderPokemonsByName(sortType) {
  return {
    type: ORDER_POKEMONS_BY_NAME,
    payload: sortType,
  };
}

export function getPokemonsCreated(pokemon) {
  return {
    type: GET_POKEMONS_CREATED,
    payload: pokemon,
  };
}

export function setLoadingTrue (){
  return{
    type: LOADING_TRUE,
  }
}

export function setLoadingFalse (){
  return{
    type: LOADING_FALSE,
  }
}