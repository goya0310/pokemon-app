// func p/normalizar response Api

const normalizeApiRes = (apiRes) => {
  const data = apiRes.data;
  // p/q la primera letra de type sea mayuscula, se hace un map al array porque tienen mas de un type
  const normalizedTypes = data.types?.map((e) => {
    return e.type.name.charAt(0).toUpperCase() + e.type.name.slice(1);
  });
  return {
    id: data.id,
    // p/q la primera letra de name sea mayuscula
    name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
    hp: data.stats.find((e) => e.stat.name === "hp").base_stat,
    attack: data.stats.find((e) => e.stat.name === "attack").base_stat,
    defense: data.stats.find((e) => e.stat.name === "defense").base_stat,
    speed: data.stats.find((e) => e.stat.name === "speed").base_stat,
    height: data.height,
    weight: data.weight,
    imgUrl: data.sprites.other["home"].front_default,
    types: normalizedTypes,
    createInDb: false,
  };
};

// func p/estandarizar la info que va a llegar a la DB

const normalizeDB = (db) => {
  const normalizeName = db.name.charAt(0).toUpperCase() + db.name.slice(1);
  const normalizedTypes = db.dataValues.types?.map(
    (type) => type.name.charAt(0).toUpperCase() + type.name.slice(1)
  );

  return {
    id: db.id,
    name: normalizeName,
    types: normalizedTypes,
    hp: db.hp,
    attack: db.attack,
    defense: db.defense,
    speed: db.speed,
    height: db.height,
    weight: db.weight,
    imgUrl: db.imgUrl,
    createInDb: db.createInDb,
  };
};

const normalizeTypes = (types) => {
  return types?.map((t) => {
    return {
      ...t.dataValues,
      name:
        t.dataValues.name.charAt(0).toUpperCase() + t.dataValues.name.slice(1),
    };
  });
};

module.exports = { normalizeApiRes, normalizeDB, normalizeTypes };
