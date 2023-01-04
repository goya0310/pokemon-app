const { Pokemon, Type } = require("../db");
const axios = require("axios");
const { normalizeApiRes } = require("./normalize");

async function getPokemonById(req, res) {
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
}

module.exports = getPokemonById;
