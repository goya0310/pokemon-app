const { Pokemon, Type } = require("../db");
const { loadTypes } = require("./getTypes");
const { normalizeDB } = require("./normalize");

async function createNewPokemon(req, res) {
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

    await loadTypes();

    // array con los types en minuscula
    const typesMin = types?.map((type) => type.toLowerCase());
    // buscar si hay types con los nombres pasados por body en la base de datos
    const typesDB = await Type.findAll({
      where: { name: typesMin },
    });

    const typeId = typesDB?.map((t) => t.dataValues.id)

    // mixin para agregar los types al pokemon creado
    await pokemonCreate.addType(typeId);

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
}

module.exports = createNewPokemon;
