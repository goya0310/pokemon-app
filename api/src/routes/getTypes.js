const { Type } = require("../db");
const axios = require("axios");
const { normalizeTypes } = require("./normalize");

const loadTypes = async () => {
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
  return typesNormalized;
};

async function getTypes(req, res) {
  try {
    const allTypes = await loadTypes();
    return res.status(200).json(allTypes);
  } catch (error) {
    return res.status(404).json(error);
  }
}

module.exports = { getTypes, loadTypes };
