const { Router } = require("express");
const axios = require("axios");
const { Pokemon, Type } = require("../db");
const { normalizeApiRes, normalizeDB, normalizeTypes } = require("./normalize");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// empezar con name por query porque sino va a listar todos los pokemons
router.get("/pokemons", async (req, res) => {
  const { name } = req.query;
  // primero se busca en la db
  try {
    if (name) {
      // busco con minuscula
      const nameMin = name.toLowerCase();
      const dbName = await Pokemon.findOne({
        where: { name: nameMin },
        include: Type,
      });
      // console.log(dbName);
      // si se encuentra el name en la db se hace el response
      if (dbName !== null) {
        return res.status(200).json(normalizeDB(dbName));
      }
      // sino se busca en la API
      else {
        const apiRes = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${nameMin}`
        );
        const apiName = normalizeApiRes(apiRes);
        return res.status(200).json(apiName);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: "Pokemon no existente." + error });
  }
});

// como el endpoint limita a 20, desde aqui podria cambiar la cantidad de pokemons que quiero cargue la app
const pokemonsLimit = 100;

// ruta que trae todos los pokemons, los de Api y los de db
router.get("/pokemons", async (req, res) => {
  try {
    // consulta a la db
    const allPokemonsDB = await Pokemon.findAll({
      include: {
        model: Type,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    // normalizo la data
    const dbNormalize = allPokemonsDB?.map((pokemon) => {
      return normalizeDB(pokemon);
    });
    // consulta a la API
    const resApi = await Promise.all([
      axios.get(
        `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${pokemonsLimit}`
      ),
    ]);
    const apiResults = resApi[0].data.results;
    // devuelve un array con objetos con la data normalizada
    const apiPokemons = apiResults?.map((pokemon) => {
      return axios
        .get(pokemon.url)
        .then((response) => {
          return { ...normalizeApiRes(response) };
        })
        .catch((error) => console.log(error));
    });

    const pokemonApiPromises = await Promise.all(apiPokemons);

    // total de pokemons entre db y Api
    const pokemons = [...pokemonApiPromises, ...dbNormalize];
    return res.status(200).json(pokemons);
  } catch (error) {
    res.status(404).json({ msg: error });
  }
});

module.exports = router;
