const { Pokemon, Type } = require("../db");
const axios = require("axios");
const { normalizeApiRes, normalizeDB } = require("./normalize");

// como el endpoint limita a 20, desde aqui podria cambiar la cantidad de pokemons que quiero cargue la app
const pokemonsLimit = 40;

async function getAllPokemons(req, res) {
  const { name } = req.query;
  // primero se busca si hay name por query
  try {
    if (name) {
      // empiezo por la db
      // busco con minuscula
      const nameMin = name.trim().toLowerCase();
      const dbName = await Pokemon.findOne({
        where: { name: nameMin },
        include: Type,
      });
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
    // consulta a la API
    const resApi = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${pokemonsLimit}`
    );

    const resApiTotal = resApi.data.results;

    // devuelve un array con objetos con la data normalizada
    const apiPokemons = resApiTotal?.map((pokemon) => {
      return axios
        .get(pokemon.url)
        .then((response) => {
          return { ...normalizeApiRes(response) };
        })
        .catch((error) => console.log(error));
    });

    const pokemonsApi = await Promise.all(apiPokemons);

    // creo una copia en la base de datos
    // pokemonsApi.forEach(async (e) => {
    //   await Pokemon.findOrCreate({
    //     where: { name: e.name },
    //     defaults: {
    //       id: e.id,
    //       types: e.types,
    //       hp: e.hp,
    //       attack: e.attack,
    //       defense: e.defense,
    //       speed: e.speed,
    //       height: e.height,
    //       weight: e.weight,
    //       imgUrl: e.imgUrl,
    //       createInDb: true,
    //     },
    //   });
    // });

    // Obtener todos los pokemons
    // consulta a la db
    const allPokemonsDB = await Pokemon.findAll({
      include: {
        // incluir modelo Type
        model: Type,
        // traigo solo el nombre
        attributes: ["name"],
        // de la tabla atributos
        through: {
          attributes: [],
        },
      },
    });
    // normalizo la data
    const pokemonsDb = allPokemonsDB?.map((pokemon) => {
      return normalizeDB(pokemon);
    });
    // total de pokemons entre db y Api
    const allPokemons = [...pokemonsApi, ...pokemonsDb];
    return res.status(200).json(allPokemons);
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: "Pokemon no existente." + error });
  }
}

module.exports = getAllPokemons;
