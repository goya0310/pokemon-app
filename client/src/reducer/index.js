import Swal from "sweetalert2";
import pikachuError from "../images/pikachuError.jpg";

const initialState = {
  pokemons: [], // con datos solo que se van a filtrar
  pokemon: {}, // detalle de un pokemon
  allPokemons: [],
  filterPokemons: [],
  types: [],
  loadingSpinner: true,
};


let errorAlert = (message) => {
  Swal.fire({
    imageUrl: pikachuError,
    imageHeight: 200,
    title: "¡Error!",
    text: message,
    confirmButtonText: "OK",
  })
}

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "CREATE_POKEMON":
      return {
        ...state,
        pokemons: [...state.pokemons, action.payload],
      };
    case "GET_TYPES":
      return {
        ...state,
        types: action.payload,
        loadingSpinner: false,

      };
    case "GET_POKEMONS":
      return {
        ...state,
        pokemons: action.payload,
        filterPokemons: action.payload,
        allPokemons: action.payload,
        loadingSpinner: false,
      };
    case "SEARCH_POKEMON":
      return {
        ...state,
        pokemons: action.payload,
        loadingSpinner: false,
      };
    case "GET_POKEMON_BY_ID":
      return {
        ...state,
        pokemon: action.payload,
        loadingSpinner: false,
      };
    case "GET_POKEMONS_BY_TYPE": {
      if (action.payload === "xdefecto") {
        return {
          ...state,
          pokemons: state.allPokemons,
          filterPokemons: state.allPokemons,
        };
      } else {
        let pokemonsByType = state.allPokemons?.filter((p) => {
          return p.types.includes(action.payload);
        });
        if (pokemonsByType.length === 0) {
          errorAlert("No hay Pokemons de este Type");
          return {
            ...state,
          };
        }
        return {
          ...state,
          pokemons: pokemonsByType,
          filterPokemons: pokemonsByType,
        };
      }
    }
    case "GET_POKEMONS_CREATED": {
      if (action.payload === "db") {
        let pokemonsInDb = state.filterPokemons?.filter((p) => {
          return p.createInDb === true;
        });
        if (pokemonsInDb.length === 0) {
          errorAlert("No hay Pokemons creados por Usuarios");
          return{
            ...state
          }
        }
        return {
          ...state,
          pokemons: pokemonsInDb,
        };
      } else if (action.payload === "api") {
        return {
          ...state,
          pokemons: state.filterPokemons.filter((p) => {
            return p.createInDb === false;
          }),
        };
      } else {
        return {
          ...state,
          pokemons: state.filterPokemons,
        };
      }
    }

    case "ORDER_POKEMONS_BY_ATTACK": {
      if (action.payload === "az") {
        return {
          ...state,
          pokemons: state.filterPokemons?.slice().sort((a, b) => {
            return a.attack - b.attack;
          }),
        };
      } else if (action.payload === "za") {
        return {
          ...state,
          pokemons: state.filterPokemons?.slice().sort((a, b) => {
            return b.attack - a.attack;
          }),
        };
      } else {
        return {
          ...state,
          pokemons: state.filterPokemons,
        };
      }
    }

    case "ORDER_POKEMONS_BY_NAME": {
      if (action.payload === "az") {
        return {
          ...state,
          pokemons: state.filterPokemons?.slice().sort((a, b) => {
            if (a.name > b.name) {
              return 1;
            }
            if (a.name < b.name) {
              return -1;
            }
            return 0;
          }),
        };
      } else if (action.payload === "za") {
        return {
          ...state,
          pokemons: state.filterPokemons?.slice().sort((a, b) => {
            if (a.name > b.name) {
              return -1;
            }
            if (a.name < b.name) {
              return 1;
            }
            return 0;
          }),
        };
      } else {
        return {
          ...state,
          pokemons: state.filterPokemons,
        };
      }
    }
    case "LOADING_TRUE": {
      return {
        ...state,
        loadingSpinner: true,
      };
    }
    case "LOADING_FALSE": {
      return {
        ...state,
        loadingSpinner: false,
      };
    }
    default:
      return { ...state };
  }
}
