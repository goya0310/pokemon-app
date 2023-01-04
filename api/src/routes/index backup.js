const { Router } = require("express");
const axios = require("axios");
const { Pokemon, Type } = require("../db");
const { normalizeApiRes, normalizeDB, normalizeTypes } = require("./normalize");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// como el endpoint limita a 20, desde aqui podria cambiar la cantidad de pokemons que quiero cargue la app
const pokemonsLimit = 40;

// empezar con name por query porque sino va a listar todos los pokemons
// hacer ambas en el mismo get sino?
router.get("/pokemons", async (req, res) => {
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
});

router.get("/types", async (req, res) => {
  try {
    // obtengo los types de la api
    const typesApiRes = await axios.get("https://pokeapi.co/api/v2/type");

    // paso todos los nombres a miniscula
    const typesResultsMin = typesApiRes.data.results?.map((type) =>
      type.name.toLowerCase()
    );
    // hago una copia de los types en base de datos
    const typesToDb = await typesResultsMin?.map(async (type) => {
      return await Type.findOrCreate({
        where: { name: type },
      });
    });

    // comprueba si se crearon y traigo los types desde la base de datos
    const typesInDb = await Type.findAll();

    const typesNormalized = normalizeTypes(typesInDb);
    return res.status(200).json(typesNormalized);
  } catch (error) {
    return res.status(404).json(error);
  }
});

router.post("/pokemons", async (req, res) => {
  try {
    let { name, types, hp, attack, defense, speed, height, weight, imgUrl } =
      req.body;
    // si el usuario no pone nombre que arroje error
    if (!name) return res.status(404).send("Nombre requerido");

    const nameMin = name.trim().toLowerCase(); //trim por si hay espacios, minuscula xq' así estan en la API

    const pokemonCreate = await Pokemon.create({
      name: nameMin,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      imgUrl,
    });
    // array con los types en minuscula
    const typesMin = types?.map((type) => type.toLowerCase());
    // buscar si hay types con los nombres pasados por body en la base de datos
    const typesDB = await Type.findAll({
      where: { name: typesMin },
    });

    // mixin para agregar los types al pokemon creado
    await pokemonCreate.addType(typesDB);

    // traigo de la base de datos los datos completos del pokemon creado
    const newPokemon = await Pokemon.findOne({
      where: { name: nameMin },
      include: Type,
    });
    // normalizo la data para el response
    const newPokemonFinal = normalizeDB(newPokemon);
    return res.status(200).json(newPokemonFinal);
  } catch (e) {
    return res.status(404).json("Error ---> " + e);
  }
});

router.get("/pokemons/:idPokemon", async (req, res) => {
  const { idPokemon } = req.params;
  // el maximo de id es de 6 digitos, si es menor requiero a Api
  if (idPokemon.length < 6) {
    try {
      const resApi = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${idPokemon}`
      );
      const resApiNormalized = normalizeApiRes(resApi);
      return res.status(200).json(resApiNormalized);
    } catch (error) {
      res.status(404).json("No se encuentra el id: " + error);
    }
  }
  // si es mayor a 6 digitos, entonces es UUID
  try {
    const findPokemonDB = await Pokemon.findByPk(idPokemon, {
      include: Type,
    });
    return res.status(200).json(findPokemonDB);
  } catch (error) {
    res.status(404).json("No se encuentra el id: " + error);
  }
});

module.exports = router;
